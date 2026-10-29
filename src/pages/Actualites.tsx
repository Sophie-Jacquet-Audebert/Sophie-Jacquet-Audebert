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
  image_url: string | null
}

const DEFAULT_WORKSHOPS: Workshop[] = [
  {
    id: 1,
    category: 'Immersion',
    title: 'Immersion : prendre sa place',
    subtitle: 'Et si tout commençait par la naissance ?',
    text: `Comprendre d'où je viens pour mieux avancer. Découvrir l'impact des premières empreintes de vie.

Au programme : travail individuel et en groupe, enseignements, ateliers créatifs, mise en mouvement du corps, hypnose, méditation, mémoire cellulaire, breathwork.

Points clés : trouver le sens des premières empreintes de vie, découvrir mes besoins, connaître mes fondations pour mieux atteindre mon potentiel.

Animée par Perrine Gillet, thérapeute hypnose et EMDR, et Sophie Jacquet-Audebert, psychologue clinicienne et thérapeute en mémoire cellulaire.`,
    tags: ['Hypnose', 'Méditation', 'Mémoire cellulaire', 'Breathwork', 'Ateliers créatifs'],
    info: "500 € dont 50 € à l'inscription · 10 participants maximum",
    status: 'Inscriptions ouvertes',
    icon: '◇',
    image_url: '/immersion-prendre-sa-place.jpg',
  },
  {
    id: 2,
    category: 'Rencontre',
    title: 'Petits outils de base pour Êtres Humains',
    subtitle: 'Un petit tour au pays de vous-même, pour cheminer plus léger dans la vie',
    text: `Cette rencontre de 2h vous propose de faire un petit tour au pays de vous-même afin de cheminer plus léger dans la vie.

Lors de cette entrevue, je partage quelques outils de vie, ces « facilitateurs de bien-être » que j'ai rencontrés, observés, compris, et qu'il me semble important de vous transmettre. J'essaie aussi de mettre en lumière les cachettes favorites des vieilleries encombrantes que nous traînons, nous autres les humains.

Cette petite pause vous offre la possibilité de distinguer ce qui, du passé, peut être déposé, mais aussi ce dont vous pouvez vous saisir aujourd'hui.`,
    tags: ['Connaissance', 'Discernement', 'Vivre conscient', 'Responsable', 'Centré'],
    info: 'Ces ateliers et conférences peuvent avoir lieu chez vous, dans un cadre intime et bienveillant · Jusqu’à 15 personnes · Durée 2h',
    status: 'Sur demande',
    icon: '◇',
    image_url: null,
  },
]

export default function Actualites() {
  const [workshops, setWorkshops] = useState<Workshop[]>(DEFAULT_WORKSHOPS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchWorkshops() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('id, category, title, subtitle, text, tags, info, status, icon, image_url')
          .eq('published', true)
          .order('sort_order', { ascending: true })

        if (!isMounted) return

        if (error) {
          console.warn('Erreur de chargement articles Supabase, conservation des ateliers :', error.message)
        } else if (data && data.length > 0) {
          setWorkshops(data)
        }
      } catch (err) {
        console.warn('Connexion Supabase non disponible, ateliers affichés par défaut.')
      }
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
          <span>189, rue du Faubourg Saint Denis, 75010 Paris</span>
          <span className="topbar__sep">·</span>
          <a href="tel:0664997050">06 64 99 70 50</a>
          <span className="topbar__sep">·</span>
          <a href="mailto:sophiejacquetaudebert@gmail.com">
            sophiejacquetaudebert@gmail.com
          </a>
        </div>
        <div className="topbar__right">
          <a
            href="https://www.instagram.com/scommesimplicite"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="topbar__icon"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Instagram
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
            <h1 className="page-hero__title">Actualités et Inspirations</h1>
            <p className="page-hero__text">
              Pour aller plus loin, des ressources annexes
            </p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          {loading && (
            <p className="actualites-status">Chargement des ateliers...</p>
          )}

          {!loading && error && (
            <p className="actualites-status actualites-status--error">{error}</p>
          )}

          {!loading && workshops.length === 0 && (
            <p className="actualites-status">Aucun atelier n'est publié pour le moment.</p>
          )}

          {workshops.length > 0 && (
            <div className="workshops-list">
              {workshops.map((w) => {
                const isImmersion = w.title.toLowerCase().includes('immersion')
                return (
                  <div key={w.id} className={`workshop-card${w.image_url ? ' workshop-card--illustrated' : ''}`}>
                    {w.image_url && (
                      <a
                        className="workshop-card__visual"
                        href={w.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={w.image_url} alt={w.title} loading="lazy" />
                      </a>
                    )}
                    <div className="workshop-card__body">
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
                        <div className="workshop-card__actions">
                          {isImmersion ? (
                            <>
                              <a
                                href="https://buy.stripe.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn--primary btn--stripe"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.52.5 7.295.5 3.5 3.328 3.5 8.163c0 4.671 3.57 6.444 7.625 7.917 2.658.966 3.572 1.691 3.572 2.736 0 .979-.846 1.547-2.316 1.547-2.457 0-5.325-1.121-7.142-2.133l-.891 5.589C6.208 24.872 9.214 25.5 12.35 25.5c5.568 0 9.65-2.712 9.65-7.857 0-4.836-3.419-6.685-8.024-8.493z" />
                                </svg>
                                Réserver avec Stripe
                              </a>
                              <Link to="/contact" className="btn btn--outline">
                                Me contacter
                              </Link>
                            </>
                          ) : (
                            <Link to="/contact" className="btn btn--outline">
                              Me contacter
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Inspirations */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Ressources</span>
            <h2 className="section__title">Inspirations</h2>
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
                  <strong>Aïe, mes aïeux !</strong>
                  <span>Anne Ancelin Schützenberger · Desclée de Brouwer, 2003</span>
                </li>
                <li>
                  <strong>Les fantômes familiaux</strong>
                  <span>Bruno Clavier · Petite Bibliothèque Payot, 2013</span>
                </li>
                <li>
                  <strong>Nouvelle Terre</strong>
                  <span>Eckhart Tolle · Ariane Édition, 2005</span>
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
                  <a href="https://youtu.be/hG04LX4zrlA?si=ShT64G277eYfGFuo" target="_blank" rel="noopener noreferrer">
                    <strong>La Révolution de l'esprit</strong>
                    <span>Anthony Chêne</span>
                  </a>
                </li>
                <li>
                  <a href="https://youtu.be/70Xg0cclf5Q?si=p04_Nz1Y-cib3bGO" target="_blank" rel="noopener noreferrer">
                    <strong>La Puissance de l'intention</strong>
                    <span>Anthony Chêne</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.capuseen.com/films/449-les-chemins-de-la-guerison" target="_blank" rel="noopener noreferrer">
                    <strong>Les Chemins de la guérison</strong>
                    <span>Jean-Yves Bilien, 2013 · Documentaire en VOD</span>
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
