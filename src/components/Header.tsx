import { useState, useEffect } from 'react'

interface HeaderProps {
  scrolled: boolean
}

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Pratiques', href: '#pratiques' },
  { label: 'Approche', href: '#approche' },
  { label: 'Rendez-vous', href: '#rdv' },
  { label: 'Contact', href: '#contact' },
]

export default function Header({ scrolled }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('accueil')

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-sm shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#accueil"
          onClick={(e) => { e.preventDefault(); handleNavClick('#accueil') }}
          className="flex flex-col items-start group"
        >
          <span className="font-display text-lg font-light tracking-[0.15em] text-charcoal uppercase group-hover:opacity-70 transition-opacity">
            Sophie Jacquet-Audebert
          </span>
          <span className="font-sans text-xs tracking-[0.3em] text-taupe-400 uppercase mt-0.5">
            Psychologue Clinicienne
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '')
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className={`nav-link font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                  activeSection === id
                    ? 'text-charcoal'
                    : 'text-taupe-400 hover:text-charcoal'
                }`}
              >
                {link.label}
              </a>
            )
          })}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-5 py-2 bg-charcoal text-cream text-xs tracking-[0.15em] uppercase font-sans font-light transition-all duration-300 hover:bg-taupe-600"
          >
            Prendre RDV
          </a>
        </nav>

        {/* Mobile Burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-6 h-px bg-charcoal transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-charcoal transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-charcoal transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-cream/98 backdrop-blur-sm border-t border-taupe-100 px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              className="font-sans text-sm tracking-[0.2em] uppercase text-charcoal hover:text-taupe-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 btn-primary text-center"
          >
            Prendre RDV
          </a>
        </nav>
      </div>
    </header>
  )
}
