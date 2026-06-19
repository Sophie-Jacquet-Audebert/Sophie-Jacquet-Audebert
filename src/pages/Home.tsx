import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import Hero from '../components/Hero'
import './Home.css'

// ── shared animation config ──────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const

function FadeUp({
  children,
  delay = 0,
  duration = 1.2,
  className,
  style,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  style?: React.CSSProperties
  as?: keyof JSX.IntrinsicElements
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  const MotionTag = motion[Tag as 'div']
  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}

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

// ── data ─────────────────────────────────────────────────────────────────────
const practices = [
  {
    slug: 'psychologie-clinique',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="18" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 28c-8 0-14 4-14 9h28c0-5-6-9-14-9z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 18c0-2.2 1.8-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Fondement',
    title: 'Psychologie clinique',
    desc: "Une écoute profonde ancrée dans l'analytique — l'inconscient, le symptôme, l'individu unique dans toute sa singularité."
  },
  {
    slug: 'art-therapie',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 36l8-16 6 10 4-6 6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="36" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 10h6M10 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Expression',
    title: 'Art-thérapie',
    desc: "Un outil précieux pour accéder à la personne en deçà de la parole, au-delà du contrôle conscient — par le geste et la création."
  },
  {
    slug: 'memoire-cellulaire',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    label: 'Transgénérationnel',
    title: 'Le corp et ses mémoires',
    desc: "Explorer l'histoire de l'individu dans sa généalogie — les mémoires invisibles qui traversent les générations et façonnent le présent."
  },
  {
    slug: 'bio-resonance',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 24c3-8 5-8 8 0s5 8 8 0 5-8 8 0 5 8 8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Corps & vibration',
    title: 'Bio-résonance cellulaire',
    desc: "Un outil en lien direct avec la vibration du corps humain — pour rétablir les équilibres énergétiques fondamentaux."
  }
]

const testimonials = [
  {
    text: "Sophie m'a aidée à comprendre des schémas répétitifs dans ma vie que je ne voyais pas. Son approche holistique m'a permis de sortir d'une impasse que je vivais depuis des années.",
    author: "Marie-Claire D.",
    detail: "Suivi en psychologie clinique"
  },
  {
    text: "La douceur et la profondeur de l'approche de Sophie sont rares. Elle a su créer un espace de confiance où j'ai pu explorer ce que je n'osais pas regarder seul.",
    author: "Thomas B.",
    detail: "Art-thérapie & mémoire cellulaire"
  },
  {
    text: "Je venais avec des questions sur ma parentalité. En quelques séances, des choses s'éclairaient, pas seulement pour moi mais pour toute ma famille. Un travail en profondeur.",
    author: "Aurélie M.",
    detail: "Consultation à distance"
  }
]

const podcasts = [
  {
    title: "La mémoire du corps",
    platform: "Spotify",
    duration: "48 min",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    )
  },
  {
    title: "Psychogénéalogie : les héritages invisibles",
    platform: "Apple Podcasts",
    duration: "1h02",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.272 1.272 1.912 2.619 2.264 4.392.12.6.12 2.208.007 2.832a9.78 9.78 0 01-1.8 4.116c-1.656 2.304-4.38 3.696-7.2 3.696-2.892 0-5.58-1.464-7.236-3.912-.72-1.056-1.212-2.28-1.476-3.72-.12-.66-.12-2.28 0-2.94a9.756 9.756 0 013.54-6.144 9.588 9.588 0 015.845-1.907zm-.024 1.6a8.135 8.135 0 00-6.228 2.952 8.164 8.164 0 00-1.716 7.584c.888 3.24 3.78 5.568 7.152 5.784 4.164.264 7.752-2.784 8.136-6.948.384-4.14-2.784-7.872-7.02-8.304a8.45 8.45 0 00-.324-.068zM12 7.9c1.548 0 2.808 1.26 2.808 2.808S13.548 13.516 12 13.516s-2.808-1.26-2.808-2.808S10.452 7.9 12 7.9zm0 7.22c2.04 0 3.9.936 5.148 2.424a7.776 7.776 0 01-10.296 0C8.1 16.056 9.96 15.12 12 15.12z" />
      </svg>
    )
  },
  {
    title: "Le corps parle : symptômes et sens",
    platform: "YouTube",
    duration: "55 min",
    href: "https://youtu.be/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    )
  }
]

// ── page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="home">

      <Hero />

      {/* ABOUT INTRO — redesigned, no background image */}
      <RoundedSection className="section about-intro">
        <div className="container">
          <div className="about-intro__inner">

            {/* Left — label + title + divider */}
            <div className="about-intro__left">
              <FadeUp delay={0}>
                <span className="section__label">À propos</span>
              </FadeUp>
              <AboutTitle />
              <div className="divider divider--left" />
              <FadeUp
                as="p"
                className="about-intro__body"
                delay={0.5}
                duration={1.3}
              >
                Psychologue clinicienne formée à l'approche analytique, j'accompagne
                chaque personne dans sa singularité — en mobilisant, selon les besoins,
                des outils complémentaires : art-thérapie, mémoire cellulaire,
                bio-résonance.
              </FadeUp>
              <FadeUp delay={0.7} duration={1.3}>
                <Link to="/parcours" className="btn btn--outline" style={{ marginTop: '2rem', display: 'inline-flex' }}>
                  Mon parcours
                </Link>
              </FadeUp>
            </div>

            {/* Right — accent number + quote */}
            <div className="about-intro__right">
              <FadeUp delay={0.2} duration={1.4} className="about-intro__accent-number">
                <strong className="about-intro__accent-num">15</strong>
                <span>ans de<br />pratique</span>
              </FadeUp>
              <FadeUp delay={0.4} duration={1.4} className="about-intro__quote">
                <blockquote>
                  "Ma démarche est d'accompagner chacun au plus proche de son besoin,
                  en mettant mes compétences à sa disposition."
                </blockquote>
                <div className="about-intro__signature">Sophie J.-A.</div>
              </FadeUp>
            </div>

          </div>
        </div>
      </RoundedSection>

      {/* PRATIQUES */}
      <RoundedSection className="section section--alt practices-section">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Accompagnement</span>
            <FadeUp as="h2" className="section__title" duration={1.3}>
              Mes outils
            </FadeUp>
            <div className="divider"></div>
            <p className="section__subtitle">
              Une palette d'approches complémentaires, choisies et expérimentées
              pour leur profondeur et leur efficacité.
            </p>
          </div>
          <div className="practices-grid">
            {practices.map(p => (
              <Link
                to={`/pratiques/${p.slug}`}
                key={p.slug}
                className={`practice-card${p.slug === 'art-therapie' ? ' practice-card--active' : ''}`}
              >
                <div className="practice-card__icon">{p.icon}</div>
                <span className="practice-card__label">{p.label}</span>
                <h3 className="practice-card__title">{p.title}</h3>
                <p className="practice-card__desc">{p.desc}</p>
                <span className="practice-card__link">En savoir plus →</span>
              </Link>
            ))}
          </div>
        </div>
      </RoundedSection>

      {/* RDV SECTION */}
      <RoundedSection className="section rdv-section">
        <div id='rdv_section' className="container">
          <div className="rdv-grid">
            <div className="rdv-card rdv-card--cabinet">
              <div className="rdv-card__icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M24 4C17.373 4 12 9.373 12 16c0 9 12 24 12 24s12-15 12-24c0-6.627-5.373-12-12-12z" />
                  <circle cx="24" cy="16" r="4" />
                </svg>
              </div>
              <h3 className="rdv-card__title">En cabinet</h3>
              <p className="rdv-card__address">189, rue du Faubourg Saint-Denis<br />75010 Paris</p>
              <p className="rdv-card__text">
                Consultations individuelles dans un espace confidentiel et apaisant,
                au cœur du 10ème arrondissement de Paris.
              </p>
              <FadeUpBtn href="tel:06 64 99 70 50" className="btn btn--primary" delay={0.3}>
                Réserver en cabinet
              </FadeUpBtn>
            </div>

            <div className="rdv-divider">
              <span>ou</span>
            </div>

            <div className="rdv-card rdv-card--video">
              <div className="rdv-card__icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="12" width="28" height="24" rx="3" />
                  <path d="M32 20l12-8v24l-12-8V20z" />
                </svg>
              </div>
              <h3 className="rdv-card__title">En vidéo</h3>
              <div className="rdv-platforms">
                <span>Zoom</span>
                <span>Skype</span>
                <span>FaceTime</span>
              </div>
              <p className="rdv-card__text">
                La distance n'est pas un obstacle. Les consultations à distance
                offrent la même qualité d'accompagnement, depuis chez vous.
              </p>
              <FadeUpBtn href="tel:06 64 99 70 50" className="btn btn--outline" delay={0.5}>
                Réserver en vidéo
              </FadeUpBtn>
            </div>
          </div>
        </div>
      </RoundedSection>

      {/* TEMOIGNAGES */}
      <RoundedSection className="section section--alt testimonials-section">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Témoignages</span>
            <FadeUp as="h2" className="section__title" duration={1.3}>
              Ce qu'ils en disent
            </FadeUp>
            <div className="divider"></div>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-card__quote">"</div>
                <p className="testimonial-card__text">{t.text}</p>
                <div className="testimonial-card__footer">
                  <span className="testimonial-card__author">{t.author}</span>
                  <span className="testimonial-card__detail">{t.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RoundedSection>

      {/* PODCASTS */}
      <RoundedSection className="section podcasts-section">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Médias</span>
            <FadeUp as="h2" className="section__title" duration={1.3}>
              Podcasts &amp; interventions
            </FadeUp>
            <div className="divider"></div>
            <p className="section__subtitle">
              Retrouvez Sophie dans des émissions et podcasts où elle partage
              ses réflexions sur la psychologie et le mieux-être.
            </p>
          </div>
          <div className="podcasts-list">
            {podcasts.map((p, i) => (
              <a key={i} href={p.href} className="podcast-item" target="_blank" rel="noopener noreferrer">
                <div className="podcast-item__platform">{p.icon}</div>
                <div className="podcast-item__content">
                  <h3 className="podcast-item__title">{p.title}</h3>
                  <span className="podcast-item__meta">{p.platform} · {p.duration}</span>
                </div>
                <div className="podcast-item__play">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </RoundedSection>

      {/* CONTACT CTA */}
      <RoundedSection className="section section--alt contact-cta">
        <div className="container">
          <div className="contact-cta__inner">
            <div className="contact-cta__content">
              <span className="section__label">Premiers pas</span>
              <ContactTitle />
              <p className="contact-cta__text">
                Que vous ayez des questions sur mon approche, les tarifs ou les modalités
                de consultation, je suis disponible pour en discuter ensemble.
              </p>
            </div>
            <div className="contact-cta__form">
              <ContactForm />
            </div>
          </div>
        </div>
      </RoundedSection>

    </div>
  )
}

// ── animated section titles ───────────────────────────────────────────────────
function AboutTitle() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-70px' })
  const lines = ['Une approche intégrative,', 'au service de l\u2019humain']
  return (
    <h2 ref={ref} className="section__title about-intro__title">
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.45, duration: 1.3, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h2>
  )
}

function ContactTitle() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-70px' })
  const lines = ['Prêt·e à commencer', 'votre chemin\u00a0?']
  return (
    <h2 ref={ref} className="contact-cta__title">
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.45, duration: 1.3, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h2>
  )
}

// ── contact form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
          source: form.source || null, // Champ non obligatoire
          message: form.message,
        })
        .select()
        .single()

      if (insertError) throw insertError

      // 2. Déclenche la notification email (best-effort)
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

  if (submitted) {
    return (
      <div className="contact-success">
        <div className="contact-success__icon">✓</div>
        <h3>Message envoyé</h3>
        <p>Merci pour votre message. Je vous répondrai dans les meilleurs délais.</p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {error && (
        <p style={{ color: '#c1432f', fontSize: '0.85rem', marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      <div className="contact-form__row">
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

      {/* <div className="form-group">
        <label className="form-label">Téléphone</label>
        <input
          type="tel"
          name="telephone"
          className="form-input"
          placeholder="06 00 00 00 00"
          value={form.telephone}
          onChange={handleChange}
        />
      </div> */}

      <div className="form-group">
        <label className="form-label">Motif *</label>
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
          <option>Renseignements tarifs</option>
          <option>Atelier / conférence</option>
          <option>Autre</option>
        </select>
      </div>

      {/* <div className="form-group">
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
      </div> */}

      <div className="form-group">
        <label className="form-label">Message *</label>
        <textarea
          name="message"
          className="form-textarea"
          placeholder="Décrivez brièvement votre démarche, vos questions ou ce qui vous amène..."
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn--primary"
        style={{ width: '100%', justifyContent: 'center' }}
        disabled={loading}
      >
        {loading ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </button>

      <p className="contact-form__privacy">
        Vos informations restent strictement confidentielles et ne sont jamais transmises à des tiers.
        Conformément au RGPD, vous disposez d'un droit d'accès et de suppression de vos données.
      </p>
    </form>
  )
}