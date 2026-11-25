import { Link } from 'react-router-dom'
import { PracticeSidebar } from './PsychologieClinique'
import './PracticeDetail.css'
import './ArtTherapie.css'

export default function ArtTherapie() {
  return (
    <div>
      <div className="page-hero">
         <Link to="/pratiques" className="btn btn--ghost bottom-page-hero__btn">
          ← Toutes les pratiques
        </Link>
        <div className="container">
          <span className="page-hero__label">Pratique · 04</span>
          <h1 className="page-hero__title">Art-thérapie</h1>
          <p className="page-hero__text">
            Un outil précieux permettant d'accéder à la personne et à ses fonctionnements 
            en dépassant la barrière du contrôle.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="practice-detail-grid">
            <article className="practice-detail__content">
              <h1>L’art-thérapie, mes racines.</h1>
              <p className="practice-detail__lead">
                Je suis avant tout une enlumineuse, emportée par la couleur, la beauté, la quête d’équilibre, partout
              </p>
              <p>
                Si l’art thérapie peut être une thérapie à part entière, elle est, dans ma pratique, un outil comme un autre, utilisé quand le besoin s’en fait ressentir.

                Cet outil fantastique mêle puissance et douceur.

              </p>
              <p>
                La créativité, s’éloignant du contrôle et de la pensée, offre un accès dérivé à l’expression de nos émotions, biais léger vers nos profondeurs, nos ombres.
                Ce faisant, avec peu de mots, elle permet d’approcher nos monstres, parfois de les dissiper

                L’art-thérapie est un voyage à travers soi-même, pertinent à tous les âges de la vie.

              </p>
              <blockquote className="practice-detail__quote">
                "Un outil précieux permettant d'accéder à la personne et ses fonctionnements 
                en dépassant la barrière du contrôle, en deçà de la parole."
              </blockquote>
              <h1>La créativité sauve.</h1>
              <section className="art-therapy-testimonial" aria-labelledby="loulou-testimonial-title">
                <h2 id="loulou-testimonial-title">LOULOU</h2>
                <p className="art-therapy-testimonial__age"><em>(14 ans. 9 ans lors du suivi)</em></p>
                <blockquote>
                  <em>
                    L’art-thérapie m'a aidé à redonner des couleurs à ma vie. Après la mort de mon père je vivais dans un monde sans couleurs, sans joie, un monde vide... Grâce à cette année de thérapie avec Sophie, j'ai appris à exprimer ce que je ressentais, j'ai recommencé à sourire et à voir la vie d'un autre côté. À chaque séance je rajoutais littéralement de la couleur, que ce soit sur la feuille ou dans ma vie.
                  </em>
                </blockquote>
              </section>
              <h3>Ce que l’art thérapie permet</h3>
              <ul className="practice-detail__list">
                <li>Se découvrir en douceur </li>
                <li>Laisser émerger des parts enfouies</li>
                <li>Reprendre confiance </li>
              </ul>
            </article>
            <PracticeSidebar current="art-therapie" />
          </div>
        </div>
      </section>
    </div>
  )
}
