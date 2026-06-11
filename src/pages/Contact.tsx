import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <span className="page-hero__label">Prenons contact</span>
          <h1 className="page-hero__title">Me contacter</h1>
          <p className="page-hero__text">
            Pour une première consultation, une question sur mes pratiques ou 
            pour organiser un atelier — je vous réponds avec soin.
          </p>
        </div>
      </div>

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
                <p className="contact-info__rdv-text">
                  Pour une prise de rendez-vous rapide, 
                  utilisez Doctolib — disponible 24h/24.
                </p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Prendre RDV sur Doctolib
                </a>
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
                  <div className="contact-form-full__row">
                    <div className="form-group">
                      <label className="form-label">Prénom *</label>
                      <input type="text" className="form-input" placeholder="Marie" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Nom *</label>
                      <input type="text" className="form-input" placeholder="Dupont" required />
                    </div>
                  </div>
                  <div className="contact-form-full__row">
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input type="email" className="form-input" placeholder="marie.dupont@email.fr" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Téléphone</label>
                      <input type="tel" className="form-input" placeholder="06 00 00 00 00" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Motif de contact *</label>
                    <select className="form-select" required>
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
                    <select className="form-select">
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
                      className="form-textarea"
                      placeholder="Décrivez brièvement votre démarche, vos questions ou ce qui vous amène..."
                      rows={6}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn--primary" style={{width:'100%', justifyContent:'center'}}>
                    Envoyer mon message
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
    </div>
  )
}
