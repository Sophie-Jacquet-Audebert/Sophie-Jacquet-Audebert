import { Link } from 'react-router-dom'
import { PracticeSidebar } from './PsychologieClinique'
import './PracticeDetail.css'

export default function ArtTherapie() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <span className="page-hero__label">Pratique · 02</span>
          <h1 className="page-hero__title">Art-thérapie</h1>
          <p className="page-hero__text">
            Un outil précieux permettant d'accéder à la personne et à ses fonctionnements 
            en dépassant la barrière du contrôle, en deçà de la parole.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="practice-detail-grid">
            <article className="practice-detail__content">
              <p className="practice-detail__lead">
                L'art-thérapie est une forme de thérapie qui utilise le processus créatif 
                comme médiateur entre le patient et le thérapeute.
              </p>
              <p>
                Elle permet d'accéder à des parties de soi qui ne peuvent pas toujours 
                s'exprimer par les mots. Le geste, la couleur, la forme — tout cela parle 
                à la place du contrôle conscient et permet une exploration plus profonde 
                de l'expérience intérieure.
              </p>
              <p>
                Nourrie par sa formation d'enlumineuse et de calligraphe, Sophie Jacquet-Audebert 
                intègre l'art-thérapie dans sa pratique avec une sensibilité particulière pour 
                la dimension créatrice et symbolique de l'être humain.
              </p>
              <blockquote className="practice-detail__quote">
                "Un outil précieux permettant d'accéder à la personne et ses fonctionnements 
                en dépassant la barrière du contrôle, en deçà de la parole."
              </blockquote>
              <h3>Ce que l'art-thérapie peut traiter</h3>
              <ul className="practice-detail__list">
                <li>Difficultés à mettre des mots sur ses émotions</li>
                <li>Traumas anciens ou récents</li>
                <li>Anxiété et stress chronique</li>
                <li>Travail sur l'identité et la confiance en soi</li>
                <li>Accompagnement du deuil</li>
                <li>Exploration créatrice de soi</li>
              </ul>
            </article>
            <PracticeSidebar />
          </div>
        </div>
      </section>
    </div>
  )
}
