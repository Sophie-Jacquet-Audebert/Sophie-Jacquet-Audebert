export type Article = {
  id: number
  category: string
  title: string
  subtitle: string | null
  text: string
  tags: string[]
  info: string | null
  status: string
  icon: string
  published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type ArticleInput = Omit<Article, 'id' | 'created_at' | 'updated_at'>

export type Contact = {
  id: string
  prenom: string
  nom: string
  email: string
  telephone: string | null
  motif: string
  source: string | null
  message: string
  is_read: boolean
  is_archived: boolean
  created_at: string
}

export type Appointment = {
  id: string
  date: string
  heure: string
  motif: string
  nom: string
  prenom: string
  email: string
  telephone: string | null
  status: 'En attente' | 'Confirmé' | 'Annulé'
  notes: string | null
  created_at: string
}

export type PaletteName = 'cosmic' | 'ocean' | 'forest'

export type Settings = {
  id: number
  palette: PaletteName
  notify_email: string | null
  notify_on_contact: boolean
  notify_on_appointment: boolean
  updated_at: string
}

export const PALETTES: Record<PaletteName, Record<string, string>> = {
  cosmic: {
    '--color-cream': '#FFFDFC',
    '--color-cream-dark': '#F7F3F2',
    '--color-rose': '#D77FA6',
    '--color-rose-light': '#F8D5E4',
    '--color-rose-dark': '#B85B87',
    '--color-gold': '#F5C76B',
    '--color-gold-light': '#FFE6B3',
    '--color-text': '#2B3A42',
    '--color-text-soft': '#46545C',
    '--color-text-muted': '#8FA1A8',
  },
  ocean: {
    '--color-cream': '#F8FCFC',
    '--color-cream-dark': '#EAF5F6',
    '--color-rose': '#4A90E2',
    '--color-rose-light': '#BFDFFF',
    '--color-rose-dark': '#2E6EB5',
    '--color-gold': '#FFB86B',
    '--color-gold-light': '#FFE0B3',
    '--color-text': '#1E293B',
    '--color-text-soft': '#475569',
    '--color-text-muted': '#94A3B8',
  },
  forest: {
    '--color-cream': '#FBFCF8',
    '--color-cream-dark': '#EFF4E8',
    '--color-rose': '#5B9B6C',
    '--color-rose-light': '#CDE8D3',
    '--color-rose-dark': '#3E7550',
    '--color-gold': '#E0B15A',
    '--color-gold-light': '#F5DEB3',
    '--color-text': '#25332A',
    '--color-text-soft': '#556B5D',
    '--color-text-muted': '#8B9B90',
  },
}
