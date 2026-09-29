import { Link } from 'react-router-dom'
import './PracticeDetail.css'

export default function PsychologieClinique() {
  return (
    <div>
      <div className="page-hero">
        <Link to="/pratiques" className="btn btn--ghost bottom-page-hero__btn">
          ← Toutes les pratiques
        </Link>
        <div className="container">
          <span className="page-hero__label">Pratique · 01</span>
          <h1 className="page-hero__title">Psychologie clinique</h1>
          <p className="page-hero__text">
            Une écoute profonde ancrée dans l'approche psychanalytique : l'inconscient,
            le symptôme et ses origines.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="practice-detail-grid">
            <article className="practice-detail__content">
              <p className="practice-detail__lead">
                Le terme clinique trouve ses origines dans le vocabulaire médical.
                Il signifie "qui s'observe au chevet du patient alité" (de cliné, le lit en grec).
              </p>
              <p>
                La psychologie clinique s'appuie sur l'observation directe du patient par
                l'analyse approfondie de son comportement dans différentes situations. C'est à dire
                que le psychologue clinicien s'attache à ce qui fait signe chez le sujet, et ce peut
                être une infinie possibilité de manifestations.
              </p>
              <p>
                Mes études universitaires et mon travail personnel partent d'une solide base
                psychanalytique. Peu à peu, ma pratique s'est enrichie au fil de mes observations,
                de mon expérience et aussi des diverses thérapies personnellement expérimentées.
              </p>
              <p>
                Que ces pépites viennent éclairer, compléter, confirmer ou même infirmer mes hypothèses
                personnelles, toujours elles renouvellent mon intérêt profond et entier pour ces différents
                sujets profondément liés à l'humain et à la condition humaine, au sens tout à fait premier du terme.
              </p>
              <blockquote className="practice-detail__quote">
                La spécificité de mon approche clinique est d'inclure dans ma "lecture" du sujet
                la réalité historique de ses origines, autant personnelles que générationnelles,
                les événements cycliques familiaux et individuels et bien sûr, les maux de son corps.
              </blockquote>
              <h3>Approches intégrées</h3>
              <ul className="practice-detail__list">
                <li>Psychogénéalogie</li>
                <li>Hypnothérapie</li>
                <li>Thérapie de groupe</li>
                <li>Constellations familiales</li>
                <li>Programmation Neuro-Linguistique (PNL)</li>
                <li>Communication Profonde Accompagnée (CPA)</li>
              </ul>
            </article>
            <PracticeSidebar current="psychologie-clinique" />
          </div>
        </div>
      </section>
    </div>
  )
}

// Liste de référence des pratiques, dans l'ordre d'affichage du site
export const PRACTICES = [
  { slug: 'psychologie-clinique', label: 'Psychologie clinique' },
  { slug: 'transgenerationnel', label: 'Le transgénérationnel' },
  { slug: 'memoire-cellulaire', label: 'Le corps et ses mémoires' },
  { slug: 'art-therapie', label: 'Art-thérapie' },
]

export function PracticeSidebar({ current }: { current: string }) {
  const others = PRACTICES.filter(p => p.slug !== current)

  return (
    <aside className="practice-detail__aside">
      <div className="practice-aside-card">
        <h4 className="practice-aside-card__title">Prendre rendez-vous</h4>
        <p>En cabinet à Paris 10ème ou à distance via Zoom ou FaceTime.</p>
        <a href="https://www.doctolib.fr/psychologue/paris/sophie-jacquet-audebert" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
          Réserver sur Doctolib
        </a>
      </div>
      <div className="practice-aside-nav">
        <h4>Autres pratiques</h4>
        {others.map(p => (
          <Link key={p.slug} to={`/pratiques/${p.slug}`}>{p.label}</Link>
        ))}
      </div>
      <Link to="/pratiques" className="btn btn--ghost">
        ← Toutes les pratiques
      </Link>
    </aside>
  )
}
