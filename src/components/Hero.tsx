import { useRef } from 'react'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  const handleScrollDown = () => {
  const target = document.getElementById('rdv_section')

  if (target) {
    const y =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      80

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    })
  }
}

  return (
    <>
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

      {/* ===== HERO ===== */}
      <div className="hero" ref={heroRef}>
        <div className="hero__bg" />
        <div className="hero__overlay" />

        <div className="hero__inner">
          {/* Logo */}
          <div className="hero__logo-wrap">
            <img src="/logo.png" alt="Logo Sophie Jacquet-Audebert" className="hero__logo" />
          </div>
          {/* Identity */}
          <div className="hero__identity">
            <p className="hero__name-top">Sophie Jacquet-Audebert</p>
            <p className="hero__role">Psychologue</p>
          </div>

          {/* Nav */}
          <nav className="hero__nav">
            {[
              { label: "Accueil", path: "/" },
              { label: "Pratiques", path: "/pratiques" },
              { label: "Parcours", path: "/parcours" },
              { label: "Actualités", path: "/actualites" },
              { label: "Contact", path: "/contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.path}
                className="hero__nav-link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hero__line" />

          <div className="hero__title-block">
            <p className="hero__name-sub">Sophie Jacquet-Audebert</p>
            <h1 className="hero__title">
              Un espace pour
              <br />
              <em>vous rencontrer</em>
            </h1>
            <p className="hero__desc">
              "Deviens qui tu es"
              — Nietzsche
            </p>
          </div>

          <button className="hero__scroll-btn" onClick={handleScrollDown} aria-label="Défiler vers le bas">
            <span className="hero__scroll-label">Prendre rdv </span>
            <span className="hero__scroll-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  )
}