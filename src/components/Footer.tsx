import { Link } from 'react-router-dom'
import { useState } from 'react' // Ajout de l'import useState
import './Footer.css'
import AppointmentModal from '../components/Appointmentmodal' // Ajout de l'import du modal

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false) // Ajout de l'état

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <h3 className="footer__brand-name">Sophie Jacquet-Audebert</h3>
            <p className="footer__brand-subtitle">Psychologue clinicienne</p>
            <p className="footer__brand-quote">« Deviens qui tu es »<br /><em>— Nietzsche</em></p>
          </div>

          <div className="footer__nav">
            <h4 className="footer__nav-title">Navigation</h4>
            <ul className="footer__nav-list">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/pratiques">Pratiques</Link></li>
              <li><Link to="/parcours">Parcours</Link></li>
              <li><Link to="/actualites">Actualités &amp; Ateliers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer__nav">
            <h4 className="footer__nav-title">Pratiques</h4>
            <ul className="footer__nav-list">
              <li><Link to="/pratiques/psychologie-clinique">Psychologie clinique</Link></li>
              <li><Link to="/pratiques/art-therapie">Art-thérapie</Link></li>
              <li><Link to="/pratiques/memoire-cellulaire">Mémoire cellulaire</Link></li>
              <li><Link to="/pratiques/bio-resonance">Bio-résonance cellulaire</Link></li>
            </ul>
          </div>

          <div className="footer__contact">
            <h4 className="footer__nav-title">Contact</h4>
            <address className="footer__address">
              <p>189, rue du Faubourg Saint Denis</p>
              <p>75010 Paris</p>
              <p className="footer__contact-item">
                <a href="tel:+33664997050">06 64 99 70 50</a>
              </p>
              <p className="footer__contact-item">
                <a href="mailto:sophiejacquetaudebert@gmail.com">sophiejacquetaudebert@gmail.com</a>
              </p>
            </address>
            {/* Modification du lien "Prendre rendez-vous" en bouton */}
            <button
              onClick={openModal}
              className="footer__doctolib"
              type="button"
            >
              Prendre rendez-vous
            </button>
          </div>
        </div>

        <div className="footer__bottom container">
          <p className="footer__legal">
            © {new Date().getFullYear()} Sophie Jacquet-Audebert — Psychologue clinicienne — Paris 10ème
          </p>
          <p className="footer__legal footer__legal--right">
            Consultation en cabinet et à distance (Zoom, Skype, FaceTime)
          </p>
        </div>
      </footer>

      {/* Ajout du modal */}
      <AppointmentModal 
        open={isModalOpen}
        onClose={closeModal}
      />
    </>
  )
}