import './Parcours.css'

export default function Parcours() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <span className="page-hero__label">Biographie</span>
          <h1 className="page-hero__title">Mon parcours</h1>
          <p className="page-hero__text">
            Un chemin singulier, de la création artistique à la psychologie clinique —
            nourri par la curiosité, l'expérience personnelle et un engagement profond envers l'humain.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="parcours-grid">
            <div className="parcours-timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <span className="timeline-year">Origines</span>
                <h3 className="timeline-title">Enlumineuse & calligraphe</h3>
                <p className="timeline-text">
                  Sophie Jacquet-Audebert débute sa vie créatrice en tant qu'enlumineuse et calligraphe
                  (École française d'Enluminure). Un ancrage dans la beauté, la précision du geste
                  et la transmission — qui nourrit encore aujourd'hui sa pratique.
                </p>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <span className="timeline-year">Le tournant</span>
                <h3 className="timeline-title">La maternité comme initiation</h3>
                <p className="timeline-text">
                  C'est grâce à la maternité et à la quête du nouvel équilibre qui en découle
                  qu'elle initie son travail personnel en psychothérapie. Il l'emmène sur les bancs
                  de la faculté, où elle obtient un DAEU pour intégrer ensuite le cursus de Psychologie
                  Clinique (Master Pro, option somatique) à l'Université Paris 7.
                </p>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <span className="timeline-year">Spécialisation</span>
                <h3 className="timeline-title">Mère, enfant, parentalité</h3>
                <p className="timeline-text">
                  Son intention première est de travailler avec la mère et l'enfant afin d'aider
                  la jeune mère et le tout-petit à prendre le meilleur départ possible dans la relation.
                  Le spectre de son observation s'élargit naturellement — de la femme enceinte jusqu'à
                  la parentalité, en passant par la problématique de l'infertilité.
                </p>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <span className="timeline-year">Approfondissement</span>
                <h3 className="timeline-title">Les liens familiaux invisibles</h3>
                <p className="timeline-text">
                  Les liens familiaux invisibles reliant les individus à travers les générations
                  retiennent son attention. Elle comprend qu'une force silencieuse mais puissante
                  circule au creux des systèmes familiaux — l'analyse transgénérationnelle devient
                  un pilier de sa pratique.
                </p>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <span className="timeline-year">Révélation</span>
                <h3 className="timeline-title">La mémoire cellulaire</h3>
                <p className="timeline-text">
                  Quand la Mémoire Cellulaire entre dans sa vie, la rencontre est aussi bouleversante
                  que naturelle. Elle sait rapidement que cette discipline va devenir pour elle un outil
                  incontournable, tellement il fait le lien avec les autres registres qu'elle manie.
                </p>
              </div>
            </div>

            <div className="parcours-aside">
              <div className="parcours-portrait">
                <div className="parcours-portrait__img">
                  <img
                    src="/Sophie-Jacquet-Audebert.avif"
                    alt="Sophie Jacquet-Audebert"
                  />
                </div>
                <div className="parcours-portrait__caption">
                  <strong>Sophie Jacquet-Audebert</strong>
                  <span>Psychologue clinicienne</span>
                  <span>Paris 7 · MasterPro somatique</span>
                </div>
              </div>

              <div className="parcours-quote">
                <blockquote>
                  "Deviens qui tu es"
                </blockquote>
                <cite>— Nietzsche</cite>
              </div>

              <div className="parcours-formations">
                <h4 className="parcours-formations__title">Formations & approches</h4>
                <ul className="parcours-formations__list">
                  <li>Psychogénéalogie</li>
                  <li>Hypnothérapie</li>
                  <li>Thérapie de groupe</li>
                  <li>Constellations familiales</li>
                  <li>PNL (Programmation Neuro-Linguistique)</li>
                  <li>CPA (Communication Profonde Accompagnée)</li>
                  <li>Art-thérapie</li>
                  <li>Mémoire cellulaire</li>
                  <li>Bio-résonance cellulaire</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
