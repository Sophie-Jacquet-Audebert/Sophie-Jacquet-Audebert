import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import AppointmentModal from '../components/Appointmentmodal'
import './Contact.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false) // Ajout de l'état pour le modal

  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    motif: '',
    source: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // 1. Insère le message dans Supabase
      const { data: inserted, error: insertError } = await supabase
        .from('contacts')
        .insert({
          prenom: form.prenom,
          nom: form.nom,
          email: form.email,
          telephone: form.telephone || null,
          motif: form.motif,
          source: form.source || null,
          message: form.message,
        })
        .select()
        .single()

      if (insertError) throw insertError

      // 2. Déclenche la notification email (best-effort : on n'échoue pas
      //    l'envoi du formulaire si la notification échoue côté admin)
      try {
        await supabase.functions.invoke('send-notification', {
          body: { type: 'contact', record: inserted },
        })
      } catch (notifyError) {
        console.error('Notification email non envoyée :', notifyError)
      }

      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError("Une erreur est survenue lors de l'envoi. Merci de réessayer ou de me contacter par téléphone.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* ===== TOP BAR ===== */}
      <div className="topbar">
        <div className="topbar__left">
          <span>189, rue du Faubourg Saint Denis — 75010 Paris</span>
          <span className="topbar__sep">·</span>
          <a href="tel:0664997050">06 64 99 70 50</a>
          <span className="topbar__sep">·</span>
          <a href="mailto:sophie.jacquetaudebert@gmail.com">
            sophie.jacquetaudebert@gmail.com
          </a>
        </div>
        <div className="topbar__right">
          <a 
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="topbar__icon"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            Facebook
          </a>
          <a 
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="topbar__icon"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      {/* ===== PAGE NAV (header non-hero) ===== */}
      <header className="page-nav">
        <div className="page-nav__inner">
          {/* Logo */}
          <div className="page-nav__logo-wrap">
            <img src="/logo.png" alt="Logo Sophie Jacquet-Audebert" className="page-nav__logo" />
          </div>

          {/* Identity */}
          <div className="page-nav__identity">
            <p className="page-nav__name-top">Sophie Jacquet-Audebert</p>
            <p className="page-nav__role">Psychologue</p>
          </div>

          {/* Nav */}
          <nav className="page-nav__links">
            {[
              { label: "Accueil", path: "/" },
              { label: "Pratiques", path: "/pratiques" },
              { label: "Parcours", path: "/parcours" },
              { label: "Actualités", path: "/actualites" },
              { label: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="page-nav__link"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Page title block */}
          <div className="container">
            <span className="page-hero__label">Prenons contact</span>
            <h1 className="page-hero__title">Me contacter</h1>
            <p className="page-hero__text">
            Pour une première consultation, une question sur mes pratiques ou 
            pour organiser un atelier.
            </p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Infos */}
            <div className="contact-info">
              <div className="contact-info__block">
                <span className="contact-info__label">Cabinet</span>
                <address className="contact-info__address">
                  189, rue du Faubourg Saint-Denis<br />
                  75010 Paris
                </address>
              </div>

              <div className="contact-info__block">
                <span className="contact-info__label">Téléphone</span>
                <a href="tel:+33664997050" className="contact-info__value">06 64 99 70 50</a>
              </div>

              <div className="contact-info__block">
                <span className="contact-info__label">Email</span>
                <a href="mailto:sophiejacquetaudebert@gmail.com" className="contact-info__value">
                  sophiejacquetaudebert@gmail.com
                </a>
              </div>

              <div className="contact-info__block">
                <span className="contact-info__label">Consultations à distance</span>
                <div className="contact-info__platforms">
                  <span>Zoom</span>
                  <span>Skype</span>
                  <span>FaceTime</span>
                </div>
              </div>

              <div className="contact-info__rdv">
                {/* <p className="contact-info__rdv-text">
                  Pour une prise de rendez-vous rapide, 
                  utilisez Doctolib — disponible 24h/24.
                </p> */}
                <p className="contact-info__rdv-text">
                  Pour une prise de rendez-vous rapide, 
                  — disponible 24h/24.
                </p>
                {/* Bouton modifié pour ouvrir le modal */}
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn--primary"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Prendre RDV
                </button>
              </div>

              <div className="contact-info__map">
                <div className="contact-info__map-placeholder">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" width="32" height="32">
                    <path d="M24 4C17.373 4 12 9.373 12 16c0 9 12 24 12 24s12-15 12-24c0-6.627-5.373-12-12-12z"/>
                    <circle cx="24" cy="16" r="4"/>
                  </svg>
                  <span>189, rue du Faubourg Saint-Denis<br />75010 Paris</span>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="contact-form-wrapper">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success__icon">✓</div>
                  <h3>Message envoyé</h3>
                  <p>Merci pour votre message. Je vous répondrai dans les meilleurs délais.</p>
                </div>
              ) : (
                <form className="contact-form-full" onSubmit={handleSubmit}>
                  <h2 className="contact-form-full__title">Envoyer un message</h2>

                  {error && (
                    <p style={{ color: '#c1432f', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      {error}
                    </p>
                  )}

                  <div className="contact-form-full__row">
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
                  <div className="contact-form-full__row">
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
                  <div className="form-group">
                    <label className="form-label">Motif de contact *</label>
                    <select
                      name="motif"
                      className="form-select"
                      value={form.motif}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Sélectionner un motif</option>
                      <option>Première consultation</option>
                      <option>Suivi thérapeutique</option>
                      <option>Consultation à distance</option>
                      <option>Atelier / conférence</option>
                      <option>Renseignements tarifs</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Comment avez-vous entendu parler de moi ?</label>
                    <select
                      name="source"
                      className="form-select"
                      value={form.source}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner</option>
                      <option>Bouche à oreille</option>
                      <option>Doctolib</option>
                      <option>Recherche internet</option>
                      <option>Podcast / médias</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      name="message"
                      className="form-textarea"
                      placeholder="Décrivez brièvement votre démarche, vos questions ou ce qui vous amène..."
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn--primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={loading}
                  >
                    {loading ? 'Envoi en cours…' : 'Envoyer mon message'}
                  </button>
                  <p className="contact-form-full__privacy">
                    Vos informations restent strictement confidentielles et ne sont jamais transmises à des tiers. 
                    Conformément au RGPD, vous disposez d'un droit d'accès et de suppression de vos données.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ajout du modal */}
      <AppointmentModal 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}