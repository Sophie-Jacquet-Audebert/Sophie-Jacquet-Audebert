import { PracticeSidebar } from './PsychologieClinique'
import './PracticeDetail.css'

export default function MemoireCellulaire() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <span className="page-hero__label">Pratique · 03</span>
          <h1 className="page-hero__title">Mémoire cellulaire</h1>
          <p className="page-hero__text">
            Cette pratique vient explorer l'histoire de l'individu en le replaçant dans 
            sa généalogie et les mémoires qui y sont liées.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="practice-detail-grid">
            <article className="practice-detail__content">
              <p className="practice-detail__lead">
                La mémoire cellulaire est la discipline qui a été la révélation majeure 
                dans la pratique de Sophie Jacquet-Audebert — un outil qui fait le lien 
                entre tous les autres registres qu'elle manie.
              </p>
              <p>
                Quand la Mémoire Cellulaire est entrée dans sa vie, la rencontre a été 
                aussi bouleversante que naturelle. Elle a su rapidement que cette discipline 
                allait devenir pour elle un outil incontournable.
              </p>
              <p>
                Cette pratique explore l'histoire de l'individu en le replaçant dans sa 
                généalogie — les mémoires invisibles transmises de génération en génération, 
                les événements fondateurs qui ont façonné les schémas répétitifs, les blocages 
                et les ressources d'une lignée.
              </p>
              <blockquote className="practice-detail__quote">
                "Une force silencieuse mais puissante circule au creux des systèmes familiaux. 
                La mémoire cellulaire permet de la rencontrer, de la comprendre, 
                et de la transformer."
              </blockquote>
              <h3>Ce que la mémoire cellulaire peut traiter</h3>
              <ul className="practice-detail__list">
                <li>Schémas répétitifs inexpliqués</li>
                <li>Mémoires transgénérationnelles</li>
                <li>Liens entre symptômes physiques et histoire familiale</li>
                <li>Loyautés invisibles</li>
                <li>Deuils non résolus dans la lignée</li>
                <li>Libération de mémoires héritées</li>
              </ul>
            </article>
            <PracticeSidebar />
          </div>
        </div>
      </section>
    </div>
  )
}
