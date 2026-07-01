import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './Actualites.css'

type Workshop = {
  id: number
  category: string
  title: string
  subtitle: string | null
  text: string
  tags: string[]
  info: string | null
  status: string
  icon: string | null
}

export default function Actualites() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchWorkshops() {
      const { data, error } = await supabase
        .from('articles')
        .select('id, category, title, subtitle, text, tags, info, status, icon')
        .eq('published', true)
        .order('sort_order', { ascending: true })

      if (!isMounted) return

      if (error) {
        console.error('Erreur lors du chargement des articles :', error)
        setError('Impossible de charger les ateliers pour le moment.')
      } else {
        setWorkshops(data ?? [])
      }
      setLoading(false)
    }

    fetchWorkshops()

    return () => {
      isMounted = false
    }
  }, [])

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
            <span className="page-hero__label">Ateliers & conférences</span>
            <h1 className="page-hero__title">Actualités</h1>
            <p className="page-hero__text">
             Des transmissions pour explorer, comprendre et grandir ensemble — 
            en groupe ou chez vous, sur demande.
            </p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="actualites-intro">
            <p>
              Ces ateliers et conférences peuvent avoir lieu chez vous. 
              Il vous suffit pour cela de me contacter — je me déplace pour animer 
              ces rencontres dans un cadre intime et bienveillant.
            </p>
          </div>

          {loading && (
            <p className="actualites-status">Chargement des ateliers...</p>
          )}

          {!loading && error && (
            <p className="actualites-status actualites-status--error">{error}</p>
          )}

          {!loading && !error && workshops.length === 0 && (
            <p className="actualites-status">Aucun atelier n'est publié pour le moment.</p>
          )}

          {!loading && !error && workshops.length > 0 && (
            <div className="workshops-list">
              {workshops.map((w) => (
                <div key={w.id} className="workshop-card">
                  <div className="workshop-card__header">
                    <div className="workshop-card__icon">{w.icon}</div>
                    <div className="workshop-card__meta">
                      <span className="workshop-card__category">{w.category}</span>
                      <span className="workshop-card__status">{w.status}</span>
                    </div>
                  </div>
                  <h2 className="workshop-card__title">{w.title}</h2>
                  {w.subtitle && (
                    <p className="workshop-card__subtitle">{w.subtitle}</p>
                  )}
                  <div className="divider divider--left"></div>
                  <p className="workshop-card__text">{w.text}</p>
                  <div className="workshop-card__tags">
                    {(w.tags ?? []).map(t => (
                      <span key={t} className="workshop-card__tag">{t}</span>
                    ))}
                  </div>
                  <div className="workshop-card__footer">
                    <span className="workshop-card__info">{w.info}</span>
                    <Link to="/contact" className="btn btn--outline">
                      Me contacter
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Inspirations */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Ressources</span>
            <h2 className="section__title">Inspirations & recommandations</h2>
            <div className="divider"></div>
          </div>
          <div className="inspirations-grid">
            <div className="inspiration-col">
              <h3 className="inspiration-col__title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                </svg>
                Livres
              </h3>
              <ul className="inspiration-list">
                <li>
                  <strong>Votre corps a une mémoire</strong>
                  <span>Myriam Brousse · Marabout, 2007</span>
                </li>
                <li>
                  <strong>Nouvelle Terre</strong>
                  <span>Eckhart Tolle · Ariane Édition, 2005</span>
                </li>
                <li>
                  <strong>Aïe, mes aïeux !</strong>
                  <span>Anne Ancelin Schützenberger · Desclée de Brouwer, 2003</span>
                </li>
                <li>
                  <strong>Les fantômes familiaux</strong>
                  <span>Bruno Clavier · Petite Bibliothèque Payot, 2013</span>
                </li>
              </ul>
            </div>
            <div className="inspiration-col">
              <h3 className="inspiration-col__title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                  <path d="M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
                </svg>
                Documentaires
              </h3>
              <ul className="inspiration-list">
                <li>
                  <a href="https://youtu.be/hG04LX4zrlA" target="_blank" rel="noopener noreferrer">
                    <strong>La Révolution de l'esprit</strong>
                    <span>Anthony Chêne</span>
                  </a>
                </li>
                <li>
                  <a href="https://youtu.be/70Xg0cclf5Q" target="_blank" rel="noopener noreferrer">
                    <strong>La Puissance de l'intention</strong>
                    <span>Anthony Chêne</span>
                  </a>
                </li>
                <li>
                  <a href="https://youtu.be/aQL91Tahebk" target="_blank" rel="noopener noreferrer">
                    <strong>Les Chemins de la guérison</strong>
                    <span>Jean-Yves Bilien, 2013</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}