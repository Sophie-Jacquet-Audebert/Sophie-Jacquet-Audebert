import { useState } from 'react'
import './AppointmentModal.css'
import { supabase } from '../lib/supabase'

type Props = {
  open: boolean
  onClose: () => void
}

const MOTIFS = [
  'Première séance de psychologie',
  'Consultation de suivi de psychologie',
  'Enfant - Première séance de psychologie',
  'Enfant - Consultation de suivi de psychologie',
  'Adolescent - Première consultation de psychothérapie',
  'Adolescent - Consultation de suivi psychothérapie',
  'Consultation à distance',
]

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
]

type FormState = {
  motif: string
  date: string
  heure: string
  prenom: string
  nom: string
  email: string
  telephone: string
}

const EMPTY_FORM: FormState = {
  motif: '',
  date: '',
  heure: '',
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
}

const TOTAL_STEPS = 3

export default function AppointmentModal({ open, onClose }: Props) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  if (!open) return null

  const reset = () => {
    setStep(1)
    setForm(EMPTY_FORM)
    setError(null)
    setSubmitted(false)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const goBack = () => setStep((s) => Math.max(s - 1, 1))

  const canGoNextFromStep1 = form.motif !== ''
  const canGoNextFromStep2 = form.date !== '' && form.heure !== ''
  const canSubmit =
    form.prenom.trim() !== '' &&
    form.nom.trim() !== '' &&
    form.email.trim() !== ''

  const today = new Date().toISOString().slice(0, 10)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setError(null)
    setLoading(true)

    try {
      // Insère la demande de RDV dans Supabase
      //  (pas de .select() : l'utilisateur anonyme n'a pas de droit SELECT
      //  sur la table `appointments`, ce qui est le comportement souhaité)
      const payload = {
        date: form.date,
        heure: form.heure,
        motif: form.motif,
        prenom: form.prenom,
        nom: form.nom,
        email: form.email,
        telephone: form.telephone || null,
        status: 'En attente',
      }

      const { error: insertError } = await supabase
        .from('appointments')
        .insert(payload)

      if (insertError) throw insertError

      try {
        await supabase.functions.invoke('send-notification', {
          body: { type: 'appointment', record: payload },
        })
      } catch (notifyError) {
        console.error('Notification email non envoyée :', notifyError)
      }

      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError(
        "Une erreur est survenue lors de l'envoi de votre demande. Merci de réessayer ou de me contacter directement par téléphone."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="appt-modal-overlay" onClick={handleClose}>
      <div className="appt-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="appt-modal-card__header">
          <h2>Prendre rendez-vous</h2>
          <button className="appt-modal-card__close" onClick={handleClose} aria-label="Fermer">
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="appt-success">
            <div className="appt-success__icon">✓</div>
            <h3>Demande envoyée</h3>
            <p>
              Votre demande de rendez-vous a bien été enregistrée. Je vous
              contacterai dans les meilleurs délais pour la confirmer.
            </p>
            <button className="btn btn--primary" onClick={handleClose}>
              Fermer
            </button>
          </div>
        ) : (
          <>
            <div className="appt-steps">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`appt-steps__item ${step === s ? 'active' : ''} ${step > s ? 'done' : ''}`}>
                  <span className="appt-steps__dot">{step > s ? '✓' : s}</span>
                  <span className="appt-steps__label">
                    {s === 1 ? 'Motif' : s === 2 ? 'Date & heure' : 'Coordonnées'}
                  </span>
                </div>
              ))}
            </div>

            {error && <p className="appt-error">{error}</p>}

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="appt-step">
                  <p className="appt-step__intro">Choisissez votre motif de consultation</p>
                  <div className="appt-motif-list">
                    {MOTIFS.map((motif) => (
                      <label
                        key={motif}
                        className={`appt-motif-option ${form.motif === motif ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="motif"
                          value={motif}
                          checked={form.motif === motif}
                          onChange={handleChange}
                        />
                        <span>{motif}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="appt-step">
                  <p className="appt-step__intro">Choisissez la date et l'heure souhaitées</p>
                  <div className="form-group">
                    <label className="form-label">Date *</label>
                    <input
                      type="date"
                      name="date"
                      className="form-input"
                      min={today}
                      value={form.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Heure *</label>
                    <div className="appt-time-grid">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          className={`appt-time-slot ${form.heure === slot ? 'selected' : ''}`}
                          onClick={() => setForm((prev) => ({ ...prev, heure: slot }))}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="appt-step">
                  <p className="appt-step__intro">Vos coordonnées</p>
                  <div className="appt-row">
                    <div className="form-group">
                      <label className="form-label">Prénom *</label>
                      <input
                        type="text"
                        name="prenom"
                        className="form-input"
                        placeholder="Marie"
                        value={form.prenom}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Nom *</label>
                      <input
                        type="text"
                        name="nom"
                        className="form-input"
                        placeholder="Dupont"
                        value={form.nom}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="appt-row">
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="marie.dupont@email.fr"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Téléphone</label>
                      <input
                        type="tel"
                        name="telephone"
                        className="form-input"
                        placeholder="06 00 00 00 00"
                        value={form.telephone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="appt-recap">
                    <span className="appt-recap__label">Récapitulatif</span>
                    <p>{form.motif}</p>
                    <p>
                      {new Date(form.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}{' '}
                      à {form.heure}
                    </p>
                  </div>
                </div>
              )}

              <div className="appt-modal-card__footer">
                {step > 1 && (
                  <button type="button" className="btn btn--ghost" onClick={goBack}>
                    Retour
                  </button>
                )}

                {step < TOTAL_STEPS && (
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={goNext}
                    disabled={step === 1 ? !canGoNextFromStep1 : !canGoNextFromStep2}
                  >
                    Continuer
                  </button>
                )}

                {step === TOTAL_STEPS && (
                  <button type="submit" className="btn btn--primary" disabled={!canSubmit || loading}>
                    {loading ? 'Envoi en cours…' : 'Confirmer ma demande'}
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}