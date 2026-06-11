import { Link } from 'react-router-dom'
import './Pratiques.css'

const practices = [
  {
    slug: 'psychologie-clinique',
    number: '01',
    label: 'Fondement analytique',
    title: 'Psychologie clinique',
    short: "Une écoute profonde ancrée dans l'analytique — l'inconscient, le symptôme, l'individu unique.",
    tags: ['Individuel', 'Adulte', 'Profondeur'],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="22" r="14" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 52c0-11.046 8.954-20 20-20s20 8.954 20 20" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M28 22c0-2.209 1.791-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    slug: 'art-therapie',
    number: '02',
    label: 'Expression créatrice',
    title: 'Art-thérapie',
    short: "Accéder à la personne en deçà de la parole, au-delà du contrôle conscient — par le geste et la création.",
    tags: ['Corps', 'Créativité', 'Symbolique'],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 48l10-20 8 13 5-8 8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="48" cy="18" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 14h8M14 20h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    slug: 'memoire-cellulaire',
    number: '03',
    label: 'Transgénérationnel',
    title: 'Mémoire cellulaire',
    short: "Explorer l'histoire de l'individu dans sa généalogie — les mémoires invisibles qui traversent les générations.",
    tags: ['Transgénérationnel', 'Corps', 'Histoire'],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 10v6M32 48v6M10 32h6M48 32h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="32" cy="32" r="4" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    slug: 'bio-resonance',
    number: '04',
    label: 'Corps & vibration',
    title: 'Bio-résonance cellulaire',
    short: "Un outil en lien direct avec la vibration du corps humain — pour rétablir les équilibres énergétiques.",
    tags: ['Corps', 'Énergie', 'Équilibre'],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 32c4-12 7-12 11 0s7 12 11 0 7-12 11 0 7 12 11 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
]

export default function Pratiques() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <span className="page-hero__label">Accompagnement</span>
          <h1 className="page-hero__title">Mes pratiques</h1>
          <p className="page-hero__text">
            Ma pratique s'est élaborée au fil de mon expérience — entièrement constituée 
            de thérapies longuement étudiées et expérimentées sur moi-même.
          </p>
        </div>
      </div>

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
                  <div className="pratique-item__icon">{p.icon}</div>
                  <span className="pratique-item__number">{p.number}</span>
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

      <section className="section section--alt">
        <div className="container" style={{textAlign:'center', maxWidth:'700px', margin:'0 auto'}}>
          <span className="section__label">Consultation</span>
          <h2 className="section__title">Prendre rendez-vous</h2>
          <div className="divider"></div>
          <p className="section__subtitle" style={{marginBottom:'2rem'}}>
            En cabinet à Paris 10ème ou à distance — je vous accueille selon vos besoins et disponibilités.
          </p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            Prendre rendez-vous sur Doctolib
          </a>
        </div>
      </section>
    </div>
  )
}
