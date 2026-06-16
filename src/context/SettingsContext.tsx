import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { PALETTES, type Settings } from '../lib/types'

type SettingsContextType = {
  settings: Settings | null
  loading: boolean
  refresh: () => Promise<void>
  updateSettings: (patch: Partial<Settings>) => Promise<{ error: string | null }>
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

function applyPalette(paletteName: string) {
  const palette = PALETTES[paletteName as keyof typeof PALETTES] ?? PALETTES.cosmic
  Object.entries(palette).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    const { data, error } = await supabase.from('settings').select('*').eq('id', 1).single()
    if (!error && data) {
      setSettings(data as Settings)
      applyPalette(data.palette)
    }
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  const updateSettings = async (patch: Partial<Settings>) => {
    const { data, error } = await supabase
      .from('settings')
      .update(patch)
      .eq('id', 1)
      .select()
      .single()

    if (error) return { error: error.message }

    setSettings(data as Settings)
    if (patch.palette) applyPalette(patch.palette)
    return { error: null }
  }

  return (
    <SettingsContext.Provider value={{ settings, loading, refresh, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings doit être utilisé dans SettingsProvider')
  return ctx
}
