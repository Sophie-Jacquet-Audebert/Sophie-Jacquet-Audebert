import { useState, useEffect } from 'react'
import { useSettings } from '../context/SettingsContext'
import { useToast } from '../components/Toast'
import { PALETTES, type PaletteName } from '../lib/types'

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings()
  const { show } = useToast()

  const [palette, setPalette] = useState<PaletteName>('cosmic')
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifyOnContact, setNotifyOnContact] = useState(true)
  const [notifyOnAppointment, setNotifyOnAppointment] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (settings) {
      setPalette(settings.palette)
      setNotifyEmail(settings.notify_email ?? '')
      setNotifyOnContact(settings.notify_on_contact)
      setNotifyOnAppointment(settings.notify_on_appointment)
    }
  }, [settings])

  const handleSave = async () => {
    setSaving(true)
    const { error } = await updateSettings({
      palette,
      notify_email: notifyEmail || null,
      notify_on_contact: notifyOnContact,
      notify_on_appointment: notifyOnAppointment,
    })
    setSaving(false)
    if (error) show(error, 'error')
    else show('Paramètres enregistrés')
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Paramètres</h1>
          <p className="admin-header__subtitle">Apparence du site et notifications</p>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: '1.5rem' }}>
        <h2 className="panel__title">Palette de couleurs</h2>
        <div className="palette-grid">
          {(Object.keys(PALETTES) as PaletteName[]).map((name) => (
            <div
              key={name}
              className={`palette-option ${palette === name ? 'selected' : ''}`}
              onClick={() => setPalette(name)}
            >
              <div className="palette-option__swatches">
                <span className="palette-option__swatch" style={{ background: PALETTES[name]['--color-rose-dark'] }} />
                <span className="palette-option__swatch" style={{ background: PALETTES[name]['--color-gold'] }} />
                <span className="palette-option__swatch" style={{ background: PALETTES[name]['--color-cream-dark'] }} />
              </div>
              <span className="palette-option__name">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h2 className="panel__title">Notifications par email</h2>

        <div className="form-group">
          <label className="form-label">Adresse de réception</label>
          <input
            type="email"
            className="form-input"
            placeholder="sophiejacquetaudebert@gmail.com"
            value={notifyEmail}
            onChange={(e) => setNotifyEmail(e.target.value)}
          />
          <p className="form-hint">Les notifications seront envoyées à cette adresse via Resend.</p>
        </div>

        <div className="form-group">
          <label className="checkbox-row">
            <input type="checkbox" checked={notifyOnContact} onChange={(e) => setNotifyOnContact(e.target.checked)} />
            <span style={{ fontSize: '0.85rem' }}>M'avertir lors d'un nouveau message de contact</span>
          </label>
        </div>

        <div className="form-group mb-0">
          <label className="checkbox-row">
            <input type="checkbox" checked={notifyOnAppointment} onChange={(e) => setNotifyOnAppointment(e.target.checked)} />
            <span style={{ fontSize: '0.85rem' }}>M'avertir lors d'une nouvelle demande de rendez-vous</span>
          </label>
        </div>
      </div>

      <button className="btn btn--primary" style={{ marginTop: '1.5rem' }} onClick={handleSave} disabled={saving}>
        {saving ? 'Enregistrement…' : 'Enregistrer les paramètres'}
      </button>
    </div>
  )
}
