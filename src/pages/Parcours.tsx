import { Link } from 'react-router-dom'
import './Parcours.css'

export default function Parcours() {
  return (
    <div>
      {/* ===== TOP BAR ===== */}
      <div className="topbar">
        <div className="topbar__left">
          <span>189, rue du Faubourg Saint Denis, 75010 Paris</span>
          <span className="topbar__sep">·</span>
          <a href="tel:0664997050">06 64 99 70 50</a>
          <span className="topbar__sep">·</span>
          <a href="mailto:sophiejacquetaudebert@gmail.com">
            sophiejacquetaudebert@gmail.com
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

          {/* Page title block */}
          <div className="container">
            <span className="page-hero__label">Biographie</span>
            <h1 className="page-hero__title">Mon parcours</h1>
            <p className="page-hero__text">
              Un chemin singulier, de la création artistique à la psychologie clinique,
            nourri par la curiosité, l'expérience personnelle et un engagement profond envers l'humain.
            </p>
          </div>
        </div>
      </header>

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
                  et la transmission, qui nourrit encore aujourd'hui sa pratique.
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
                  Le spectre de son observation s'élargit naturellement, de la femme enceinte jusqu'à
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
                  circule au creux des systèmes familiaux : l'analyse transgénérationnelle devient
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

            <article className="parcours-recit">
              <span className="parcours-recit__label">Mon récit</span>

              <p className="parcours-recit__lead">
                Il me fallut aller bien mal pour oser entreprendre le chemin du mieux-être.
              </p>
              <p>
                Initiant ce voyage à petits pas, remonter cette pente me demanda une grande
                persévérance. Lentement un nouvel équilibre se mit en place, jusqu'à me sentir
                forte de mes vulnérabilités identifiées.
              </p>
              <p>
                Cette traversée vers moi-même reste un virage essentiel dans ma vie. Elle me
                permet de dire «&nbsp;j'ai osé&nbsp;» et «&nbsp;j'ai réussi&nbsp;» à transformer
                un désespoir en force, et pour cela je ressens encore de la gratitude à mon égard.
              </p>
              <p>
                Je suis Sophie Jacquet Audebert, une enlumineuse-calligraphe, devenue psychologue
                clinicienne.
              </p>
              <p>
                C'est le chaos de la première maternité et son inévitable quête d'équilibre, qui
                m'amena à initier mon travail personnel en psychothérapie.
              </p>
              <p>
                Traînant dans mes bagages un lourd échec scolaire, ma renaissance commença par
                <em> éponger </em> cette blessure handicapante. M'inscrire à l'équivalence au bac,
                Diplôme d'Accès aux Études Universitaires (DAEU) puis, grâce à mes bons résultats,
                intégrer le cursus de psychologie de Paris VII, représentait déjà une belle
                réparation, mais ça n'était pas suffisant, je restais fragile.
              </p>
              <p>
                Huit années me furent nécessaires pour obtenir mon diplôme et autant de temps en
                thérapie, pour que je commence à ressentir un certain bénéfice à tout ce travail.
                Objectivement, j'avais réussi à transformer un échec scolaire cuisant en Bac +5
                validé, et j'en étais épatée.
              </p>
              <p>
                Poussant la porte de ma première thérapeute j'étais bien loin d'imaginer qu'un jour
                je reprendrai mes études et deviendrai psychologue. Puis, en m'inscrivant à la fac
                de psychologie, je n'imaginais pas un instant que j'irai au bout de ce cursus.
                Chaque année fut vécue comme un exploit : je l'avais fini, je l'avais réussi,
                j'avais le droit de <em>rejouer</em>, alors je continuais.
              </p>
              <p>
                Je me suis inscrite en psychologie avec l'intention de me former à l'haptonomie,
                avec le désir de l'appliquer à la périnatalité. Je voulais accompagner les parents
                et le tout-petit dans ce départ, aussi sensible qu'important, qu'est la naissance.
                Mais, au fil des années d'études, j'ouvrais mon champ d'intérêt jusqu'à la
                parentalité en général, la problématique de l'infertilité, les grossesses
                pathologiques… et abandonnais ce désir de spécialité. Pour autant je gardais le
                corps au cœur de mon intérêt et choisis l'option somatique en Master.
              </p>
              <p>
                Être en analyse pendant des années éclaire bien sûr les schémas personnels, mais
                aussi les liens familiaux. Cela commence par le système <em>visiblement</em> bancal
                et s'étend jusqu'aux fils subtils qui relient les individus à travers les
                générations. La lumière s'allume alors sur le transgénérationnel, cette force
                silencieuse mais puissante circulant au creux des familles.
              </p>
              <p>
                Après un long travail psychothérapeutique, quelques fantômes familiaux, impossibles
                à ignorer, restaient présents à mes côtés. C'est alors que je rencontrais un axe de
                travail complémentaire : la mémoire cellulaire.
              </p>
              <p>
                Plus que d'éclairer mes blocages et de répondre à beaucoup de mes questions, la
                mémoire cellulaire a validé ce que je présupposais : issues du ventre de nos mères
                autant que de l'histoire de nos familles, les mémoires personnelle et familiale ont
                <em> une place </em> dans le corps et certains de nos symptômes les expriment.
              </p>

              <p className="parcours-recit__closing">
                Ma pratique est le résultat de ce parcours, universitaire, personnel, et passionné.
                Ma démarche est d'accompagner chacun au plus proche de son besoin en mettant mes
                compétences au service du patient.
              </p>
              <span className="parcours-recit__signature">Sophie J.-A.</span>
            </article>

            <div className="parcours-aside">
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