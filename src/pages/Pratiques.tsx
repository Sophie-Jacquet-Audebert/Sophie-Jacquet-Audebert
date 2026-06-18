import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './Pratiques.css'

const EASE = [0.16, 1, 0.3, 1] as const

// ── FadeUp Button animé au scroll ───────────────────────────────────────────
function FadeUpBtn({ href, className, delay = 0, children }: {
  href: string
  className: string
  delay?: number
  children: React.ReactNode
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 1.3, ease: EASE }}
    >
      {children}
    </motion.a>
  )
}

// ── rounded section wrapper ───────────────────────────────────────────────────
function RoundedSection({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{
        borderTopLeftRadius: '0% 0rem',
        borderTopRightRadius: '0% 0rem',
        borderBottomLeftRadius: '0% 0rem',
        borderBottomRightRadius: '0% 0rem',
      }}
      animate={
        inView
          ? {
              borderTopLeftRadius: '50% 8rem',
              borderTopRightRadius: '50% 8rem',
              borderBottomLeftRadius: '50% 8rem',
              borderBottomRightRadius: '50% 8rem',
            }
          : {
              borderTopLeftRadius: '0% 0rem',
              borderTopRightRadius: '0% 0rem',
              borderBottomLeftRadius: '0% 0rem',
              borderBottomRightRadius: '0% 0rem',
            }
      }
      transition={{ duration: 1.4, ease: EASE }}
    >
      {children}
    </motion.section>
  )
}

// ── Rounded image animée au scroll ───────────────────────────────────────────
function RoundedImage({
  src,
  alt,
  className,
  delay = 0,
  finalRadius = '2.5rem',
}: {
  src: string
  alt: string
  className?: string
  delay?: number
  finalRadius?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ overflow: 'hidden' }}
      initial={{ borderRadius: '0rem', opacity: 0 }}
      animate={
        inView
          ? { borderRadius: finalRadius, opacity: 1 }
          : { borderRadius: '0rem', opacity: 0 }
      }
      transition={{ delay, duration: 1.4, ease: EASE }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </motion.div>
  )
}

const practices = [
  {
    slug: 'psychologie-clinique',
    number: '01',
    label: 'Fondement analytique',
    title: 'Psychologie clinique',
    short: "Une écoute profonde ancrée dans l'analytique — l'inconscient, le symptôme, l'individu unique.",
    tags: ['Individuel', 'Adulte', 'Profondeur'],
    image: '/vitaly-gariev-qvbJkpIKotk-unsplash.jpg',
    icon: null,
  },
  {
    slug: 'art-therapie',
    number: '02',
    label: 'Expression créatrice',
    title: 'Art-thérapie',
    short: "Accéder à la personne en deçà de la parole, au-delà du contrôle conscient — par le geste et la création.",
    tags: ['Corps', 'Créativité', 'Symbolique'],
    image: '/taelynn-christopher-pfSNx3Z12K8-unsplash.jpg',
    icon: null,
  },
  {
    slug: 'memoire-cellulaire',
    number: '03',
    label: 'Transgénérationnel',
    title: 'Mémoire cellulaire',
    short: "Explorer l'histoire de l'individu dans sa généalogie — les mémoires invisibles qui traversent les générations.",
    tags: ['Transgénérationnel', 'Corps', 'Histoire'],
    image: '/robina-weermeijer-IHfOpAzzjHM-unsplash.jpg',
    icon: null,
  },
  {
    slug: 'bio-resonance',
    number: '04',
    label: 'Corps & vibration',
    title: 'Bio-résonance cellulaire',
    short: "Un outil en lien direct avec la vibration du corps humain — pour rétablir les équilibres énergétiques.",
    tags: ['Corps', 'Énergie', 'Équilibre'],
    image: '/mjh-shikder--bJj_81Zois-unsplash.jpg',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 32c4-12 7-12 11 0s7 12 11 0 7-12 11 0 7 12 11 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
]

export default function Pratiques() {
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

          <div className="page__hero__line" />

          {/* Page title block */}
          <div className="container">
            <span className="page-hero__label">Accompagnement</span>
            <h1 className="page-hero__title">Mes pratiques</h1>
            <p className="page-hero__text">
              Ma pratique s'est élaborée au fil de mon expérience — entièrement constituée
              de thérapies longuement étudiées et expérimentées sur moi-même.
            </p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="pratiques-intro">
            <p>
              Chacune de ces approches est complémentaire. Selon votre besoin du moment,
              nous pourrons travailler avec l'une ou plusieurs d'entre elles,
              dans une logique d'accompagnement sur-mesure.
            </p>
          </div>
          <div className="pratiques-list">
            {practices.map((p, i) => (
              <div key={p.slug} className={`pratique-item ${i % 2 === 1 ? 'pratique-item--reverse' : ''}`}>

                <div className="pratique-item__visual">
                  {p.image ? (
                    <>
                      {/* ↓ Remplacement : arrondi animé au scroll via Framer Motion */}
                      <RoundedImage
                        src={p.image}
                        alt={p.title}
                        className="pratique-item__photo"
                        delay={0}
                        finalRadius="2.5rem"
                      />
                      <span className="pratique-item__number">{p.number}</span>
                    </>
                  ) : (
                    <>
                      <div className="pratique-item__icon">{p.icon}</div>
                      <span className="pratique-item__number">{p.number}</span>
                    </>
                  )}
                </div>

                <div className="pratique-item__content">
                  <span className="pratique-item__label">{p.label}</span>
                  <h2 className="pratique-item__title">{p.title}</h2>
                  <div className="divider divider--left"></div>
                  <p className="pratique-item__text">{p.short}</p>
                  <div className="pratique-item__tags">
                    {p.tags.map(t => (
                      <span key={t} className="pratique-item__tag">{t}</span>
                    ))}
                  </div>
                  <Link to={`/pratiques/${p.slug}`} className="btn btn--outline mt-md">
                    En savoir plus
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section avec effet rounded + bouton animé */}
      <RoundedSection className="section section--alt">
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <span className="section__label">Consultation</span>
          <h2 className="section__title">Prendre rendez-vous</h2>
          <div className="divider"></div>
          <p className="section__subtitle" style={{ marginBottom: '2rem' }}>
            En cabinet à Paris 10ème ou à distance — je vous accueille selon vos besoins et disponibilités.
          </p>
          <FadeUpBtn 
            href="https://www.doctolib.fr/psychologue/paris/sophie-jacquet-audebert"
            className="btn btn--primary"
            delay={0.2}
          >
            Prendre rendez-vous sur Doctolib
          </FadeUpBtn>
        </div>
      </RoundedSection>
    </div>
  )
}