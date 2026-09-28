import { PracticeSidebar } from './PsychologieClinique'
import './PracticeDetail.css'
import { Link } from 'react-router-dom'

export default function MemoireCellulaire() {
  return (
    <div>
      <div className="page-hero">
        <Link to="/pratiques" className="btn btn--ghost bottom-page-hero__btn">
          ← Toutes les pratiques
        </Link>
        <div className="container">
          <span className="page-hero__label">Pratique · 02</span>
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
                dans la pratique de Sophie Jacquet-Audebert : un outil qui fait le lien
                entre tous les autres registres qu'elle manie.
              </p>
              <p>
                Parler de mémoire cellulaire, c'est parler de la mémoire de notre corps,
                celle contenue dans nos cellules, notre matière.
              </p>
              <p>
                Le corps, par l'intermédiaire de ses cellules, peut être considéré comme
                détenteur d'archives personnelles et familiales. Le corps est porteur
                d'histoires. Celle du patient bien sûr, mais également celle de ses
                parents, de ses grands-parents, et même de ses arrière-grands-parents.
              </p>
              <p>
                Nous sommes nombreux à comprendre notre problème, et malheureusement,
                tout aussi nombreux à continuer à exprimer le symptôme issu du problème,
                malgré notre compréhension donc, et de plus (le pire ?), souvent après
                des années de travail intense auprès d'un psychologue ou d'un thérapeute
                tout à fait investi. Et oui, l'esprit a compris (ce qui est déjà fort
                utile), mais la matière est lourde et continue de renfermer en son sein
                une mémoire enkystée, et bien souvent ignorée.
              </p>
              <p>
                Travailler en mémoire cellulaire, c'est considérer cet aspect de la
                problématique humaine, celle encapsulée tout au fond de nous. En dessiner
                les contours petit à petit, pour ainsi, au fil du temps, s'en débarrasser.
              </p>
              <blockquote className="practice-detail__quote">
                "Je suis très reconnaissante à la mémoire cellulaire dans mon parcours,
                elle a permis ma délivrance. Après 10 ans de psychanalyse, il était
                évident que des symptômes s'accrochaient, persistaient. Aller travailler
                dans le corps fut ma chance, mon issue."
              </blockquote>
              <p>
                Je ne renie pas la psychanalyse, bien au contraire, car je ne pense pas
                que le travail en mémoire cellulaire aurait à lui seul suffi à mon
                soulagement (comme toutes les thérapies non ?), en revanche, l'axe de
                travail mémoire cellulaire permet un nettoyage dans la matière que peu
                de thérapies proposent. C'est, jusqu'à présent, mon observation.
              </p>
              <figure className="practice-detail__video">
                <div className="practice-detail__video-frame">
                  <iframe
                    src="https://www.rts.ch/play/embed?urn=urn:rts:video:3745896"
                    title="Film suisse : trauma sur 4 générations présent dans l'ADN"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  Film suisse : trauma sur 4 générations présent dans l'ADN
                </figcaption>
              </figure>
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
            <PracticeSidebar current="memoire-cellulaire" />
          </div>
        </div>
      </section>
    </div>
  )
}