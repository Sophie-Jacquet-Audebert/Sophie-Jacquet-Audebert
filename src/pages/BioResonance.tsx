import { PracticeSidebar } from './PsychologieClinique'
import './PracticeDetail.css'

export default function BioResonance() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <span className="page-hero__label">Pratique · 04</span>
          <h1 className="page-hero__title">Bio-résonance cellulaire</h1>
          <p className="page-hero__text">
            Un outil spécifique en lien direct avec la vibration du corps humain — 
            pour rétablir les équilibres énergétiques fondamentaux.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="practice-detail-grid">
            <article className="practice-detail__content">
              <p className="practice-detail__lead">
                La bio-résonance cellulaire est une approche qui travaille directement 
                avec le corps et ses fréquences vibratoires — en lien direct avec 
                la dimension énergétique de l'être.
              </p>
              <p>
                Cette pratique part du principe que chaque cellule du corps humain émet 
                et reçoit des signaux électromagnétiques, et que ces signaux peuvent être 
                déséquilibrés par des traumatismes, des blocages émotionnels ou des mémoires 
                héritées.
              </p>
              <p>
                Intégrée dans la pratique de Sophie Jacquet-Audebert comme un complément 
                à la psychologie clinique et à la mémoire cellulaire, la bio-résonance 
                permet d'atteindre des niveaux d'information que le travail verbal 
                ne peut pas toujours atteindre.
              </p>
              <blockquote className="practice-detail__quote">
                "Le corps ne ment pas. Il parle un langage subtil mais précis — 
                la bio-résonance nous permet de l'écouter."
              </blockquote>
              <h3>Applications</h3>
              <ul className="practice-detail__list">
                <li>Rééquilibrage énergétique global</li>
                <li>Travail sur les mémoires cellulaires profondes</li>
                <li>Accompagnement des déséquilibres chroniques</li>
                <li>Soutien au processus thérapeutique</li>
                <li>Renforcement de la vitalité</li>
              </ul>
            </article>
            <PracticeSidebar />
          </div>
        </div>
      </section>
    </div>
  )
}
