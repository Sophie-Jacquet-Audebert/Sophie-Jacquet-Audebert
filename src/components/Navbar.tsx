import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-name">Sophie Jacquet-Audebert</span>
          <span className="navbar__brand-title">Psychologue</span>
        </Link>

        <nav className={`navbar__nav ${isMenuOpen ? 'navbar__nav--open' : ''}`}>
          <NavLink to="/" end className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            Accueil
          </NavLink>
          <NavLink to="/pratiques" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            Pratiques
          </NavLink>
          <NavLink to="/parcours" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            Parcours
          </NavLink>
          <NavLink to="/actualites" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            Actualités
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            Contact
          </NavLink>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__cta"
          >
            Prendre RDV
          </a>
        </nav>

        <button
          className={`navbar__burger ${isMenuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
