import { PracticeSidebar } from './PsychologieClinique'
import './PracticeDetail.css'
import { Link } from 'react-router-dom'

export default function Transgenerationnel() {
  return (
    <div>
      <div className="page-hero">
        <Link to="/pratiques" className="btn btn--ghost bottom-page-hero__btn">
          ← Toutes les pratiques
        </Link>
        <div className="container">
          <span className="page-hero__label">Pratique · 02</span>
          <h1 className="page-hero__title">Le transgénérationnel</h1>
          <p className="page-hero__text">
            Les fils subtils qui relient les individus à travers les générations,
            et la manière dont ils façonnent le présent.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="practice-detail-grid">
            <article className="practice-detail__content">
              <p className="practice-detail__lead">
                Être en analyse pendant des années permet le travail sur les schémas
                personnels, bien sûr, mais aussi de mettre en lumière les liens familiaux
                entravant le patient.
              </p>
              <p>
                Cela commence par le système visiblement bancal, celui que l'on voit et
                que l'on nomme, puis cela s'étend jusqu'aux fils subtils qui relient les
                individus à travers les générations. La lumière s'allume alors sur le
                transgénérationnel, cette force silencieuse mais puissante circulant au
                creux des familles.
              </p>
              <p>
                Explorer l'histoire d'une personne, c'est donc aussi la replacer dans sa
                généalogie. Ce qui n'a pas pu se dire dans une génération cherche souvent
                à se rejouer dans la suivante : une répétition, une date qui revient, une
                place difficile à tenir dans la fratrie, une loyauté que l'on porte sans
                l'avoir choisie…
              </p>
              <p>
                La spécificité de mon approche clinique est d'inclure dans ma «&nbsp;lecture&nbsp;»
                du sujet la réalité historique de ses origines, autant personnelles que
                générationnelles, les événements cycliques familiaux et individuels et
                bien sûr, les maux de son corps.
              </p>
              <blockquote className="practice-detail__quote">
                Après un long travail psychothérapeutique, quelques fantômes familiaux,
                impossibles à ignorer, restaient présents à mes côtés.
              </blockquote>
              <p>
                Cet axe de travail se prolonge naturellement dans{' '}
                <Link to="/pratiques/memoire-cellulaire">le corps et ses mémoires</Link>,
                là où l'histoire familiale s'est déposée dans la matière.
              </p>
              <h3>Exemples de ce que l'éclairage transgénérationnel permet d'explorer</h3>
              <ul className="practice-detail__list">
                <li>Schémas, évènements, répétitions… observables dans les différentes générations</li>
                <li>Loyautés invisibles et places assignées dans le système familial</li>
                <li>Non-dits, secrets et deuils non résolus dans la lignée</li>
                <li>Liens entre l'histoire familiale et les symptômes actuels</li>
              </ul>
            </article>
            <PracticeSidebar current="transgenerationnel" />
          </div>
        </div>
      </section>
    </div>
  )
}
