import { useRef, useEffect } from 'react'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-8')
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="apropos" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-20 items-center opacity-0 translate-y-8 transition-all duration-1000"
        >
          {/* Image side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden">
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-taupe-100 z-0" />
              <div className="relative z-10 w-full h-full bg-gradient-to-br from-taupe-100 to-taupe-200 flex items-center justify-center">
                {/* Portrait placeholder */}
                <div className="text-center">
                  <div className="w-40 h-40 rounded-full bg-taupe-200/80 mx-auto flex items-center justify-center mb-4">
                    <svg className="w-20 h-20 text-taupe-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                    </svg>
                  </div>
                  <p className="font-sans text-xs tracking-[0.3em] uppercase text-taupe-400">Sophie Jacquet-Audebert</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sage-50 z-0" />
            </div>

            {/* Credential card */}
            <div className="absolute top-1/2 -right-10 -translate-y-1/2 bg-charcoal text-cream p-6 hidden xl:block">
              <p className="font-display text-3xl font-light mb-1">Université</p>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-taupe-300">Paris 7 Diderot</p>
              <div className="w-8 h-px bg-taupe-400 my-3" />
              <p className="font-sans text-xs text-taupe-300">Master Pro — option somatique</p>
            </div>
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <p className="section-subtitle">À propos</p>
              <h2 className="section-title">
                Un parcours singulier
                <br />
                <em className="italic font-light">au service du vôtre</em>
              </h2>
            </div>

            <div className="space-y-5 font-sans font-light text-taupe-500 leading-relaxed">
              <p>
                Sophie Jacquet-Audebert est une enlumineuse et calligraphe devenue psychologue clinicienne 
                (Université Paris 7 Diderot). C'est grâce à la maternité et la quête du nouvel équilibre 
                qui en découle qu'elle initie son travail personnel en psychothérapie.
              </p>
              <p>
                Son intention première est de travailler avec la mère et l'enfant. Le spectre de son observation 
                s'élargit naturellement de la femme enceinte jusqu'à la place du père et la parentalité, 
                en passant par la problématique de l'infertilité.
              </p>
              <p>
                Les liens familiaux invisibles reliant les individus à travers les générations retiennent 
                particulièrement son attention — cette force silencieuse mais puissante qui circule au creux 
                des systèmes familiaux.
              </p>
            </div>

            {/* Quote */}
            <blockquote className="border-l-2 border-sage-300 pl-6 py-2">
              <p className="font-display text-xl italic text-taupe-400">
                « Ma démarche est d'accompagner chacun au plus proche de son besoin, 
                en mettant mes compétences à la disposition du patient. »
              </p>
            </blockquote>

            {/* Skills */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                'Psychogénéalogie',
                'Hypnothérapie',
                'Thérapie de groupe',
                'Constellations familiales',
                'PNL',
                'Communication Profonde Accompagnée',
              ].map((skill) => (
                <div key={skill} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0" />
                  <span className="font-sans text-sm text-taupe-500 font-light">{skill}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-outline inline-block mt-4"
            >
              Me contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
