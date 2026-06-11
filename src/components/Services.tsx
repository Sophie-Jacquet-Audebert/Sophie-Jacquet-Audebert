import { useRef, useEffect, useState } from 'react'

const services = [
  {
    id: 'psychologie-clinique',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Psychologie Clinique',
    subtitle: 'L\'approche fondamentale',
    description: "Mon écoute s'appuie sur l'inconscient, la symbolique, le symptôme et ses origines, le tout exprimé par un individu unique. J'inclus dans ma lecture du sujet la réalité historique de ses origines, autant personnelles que générationnelles.",
    themes: ['Parentalité', 'Infertilité', 'Transgénérationnel', 'Symptômes', 'Anxiété', 'Deuil'],
  },
  {
    id: 'art-therapie',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      </svg>
    ),
    title: 'Art-Thérapie',
    subtitle: 'Au-delà des mots',
    description: "Un outil précieux permettant d'accéder à la personne et ses fonctionnements en dépassant la barrière du contrôle, en deçà de la parole. L'art comme médium thérapeutique pour révéler ce qui ne peut s'exprimer autrement.",
    themes: ['Expression créative', 'Corps & psyché', 'Blocages émotionnels', 'Confiance en soi'],
  },
  {
    id: 'memoire-cellulaire',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        <circle cx="12" cy="12" r="10" strokeWidth={1} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.5 8.5c.5-1 2-2 3.5-2s3 1 3.5 2M8.5 15.5c.5 1 2 2 3.5 2s3-1 3.5-2" />
      </svg>
    ),
    title: 'Mémoire Cellulaire',
    subtitle: 'Les héritages invisibles',
    description: "Cette pratique vient explorer l'histoire de l'individu en le replaçant dans sa généalogie et les mémoires qui y sont liées. Une rencontre bouleversante et naturelle qui fait le lien entre les différents registres cliniques.",
    themes: ['Généalogie', 'Mémoires transmises', 'Loyautés familiales', 'Libération'],
  },
  {
    id: 'bio-resonnance',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    ),
    title: 'Biorésonnance Cellulaire',
    subtitle: 'La vibration du corps',
    description: "Un outil spécifique en lien direct avec la vibration du corps humain. Cette approche complémentaire permet d'accéder aux informations énergétiques du corps et de favoriser son autoguérison naturelle.",
    themes: ['Énergie vitale', 'Corps physique', 'Rééquilibrage', 'Bien-être'],
  },
]

export default function Services() {
  const [activeService, setActiveService] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-8')
        }
      },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="pratiques" className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-1000"
        >
          <p className="section-subtitle">Mes pratiques</p>
          <h2 className="section-title">
            Une approche
            <em className="italic font-light"> intégrative</em>
          </h2>
          <p className="mt-6 font-sans font-light text-taupe-400 max-w-xl mx-auto">
            Ma pratique s'est élaborée au fil de mon expérience. Elle est entièrement constituée 
            de thérapies longuement étudiées et expérimentées sur moi-même.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border border-taupe-200">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`relative p-8 cursor-pointer transition-all duration-300 border-r border-taupe-200 last:border-r-0 group ${
                activeService === index
                  ? 'bg-charcoal text-cream'
                  : 'bg-white hover:bg-taupe-50'
              }`}
              onClick={() => setActiveService(index)}
            >
              <div className={`mb-6 transition-colors duration-300 ${
                activeService === index ? 'text-taupe-300' : 'text-taupe-400 group-hover:text-taupe-600'
              }`}>
                {service.icon}
              </div>
              <h3 className={`font-display text-xl font-light mb-2 transition-colors duration-300 ${
                activeService === index ? 'text-cream' : 'text-charcoal'
              }`}>
                {service.title}
              </h3>
              <p className={`font-sans text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
                activeService === index ? 'text-taupe-300' : 'text-taupe-400'
              }`}>
                {service.subtitle}
              </p>
              {activeService === index && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sage-400" />
              )}
            </div>
          ))}
        </div>

        {/* Active service detail */}
        <div className="mt-0 border border-t-0 border-taupe-200 bg-white p-10 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="font-display text-3xl font-light text-charcoal mb-4">
                {services[activeService].title}
              </h3>
              <p className="font-sans font-light text-taupe-500 leading-relaxed text-base">
                {services[activeService].description}
              </p>
            </div>
            <div>
              <p className="font-sans text-xs tracking-[0.25em] uppercase text-taupe-300 mb-4">
                Thèmes abordés
              </p>
              <div className="flex flex-wrap gap-2">
                {services[activeService].themes.map((theme) => (
                  <span
                    key={theme}
                    className="px-4 py-2 border border-taupe-200 font-sans text-xs tracking-wider text-taupe-500 hover:border-charcoal hover:text-charcoal transition-colors duration-200"
                  >
                    {theme}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Prendre rendez-vous
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
