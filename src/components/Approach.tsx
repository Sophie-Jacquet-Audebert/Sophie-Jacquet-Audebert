import { useRef, useEffect } from 'react'

const steps = [
  {
    number: '01',
    title: 'Écoute & Accueil',
    description: 'Chaque accompagnement commence par une écoute sans jugement. Je vous accueille dans votre globalité — votre histoire, votre corps, vos symptômes.',
  },
  {
    number: '02',
    title: 'Exploration',
    description: 'Ensemble, nous explorons les racines de vos difficultés : histoire personnelle, liens familiaux, mémoires transmises, signaux du corps.',
  },
  {
    number: '03',
    title: 'Intégration',
    description: 'À travers différents outils thérapeutiques — parole, art, corps — nous travaillons à l\'intégration et à la transformation.',
  },
  {
    number: '04',
    title: 'Épanouissement',
    description: 'L\'objectif est votre liberté d\'être. Devenir qui vous êtes, déposé des héritages qui vous encombrent.',
  },
]

const themes = [
  { icon: '🤱', label: 'Maternité & parentalité' },
  { icon: '🌿', label: 'Infertilité' },
  { icon: '🔗', label: 'Liens transgénérationnels' },
  { icon: '💔', label: 'Deuil & séparation' },
  { icon: '🌀', label: 'Anxiété & stress' },
  { icon: '🪞', label: 'Image de soi' },
  { icon: '🌙', label: 'Traumatismes' },
  { icon: '✨', label: 'Quête de sens' },
]

export default function Approach() {
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
    <section id="approche" className="py-28 bg-taupe-100">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="opacity-0 translate-y-8 transition-all duration-1000"
        >
          {/* Header */}
          <div className="max-w-2xl mb-16">
            <p className="section-subtitle">Mon approche</p>
            <h2 className="section-title">
              Une thérapie
              <em className="italic font-light"> sur mesure</em>
            </h2>
            <p className="mt-6 font-sans font-light text-taupe-500 leading-relaxed">
              La spécificité de mon approche clinique est d'inclure dans ma lecture du sujet 
              la réalité historique de ses origines, autant personnelles que générationnelles, 
              les événements cycliques familiaux et individuels, et les maux de son corps.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-taupe-200 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-12 h-12 border border-taupe-300 flex items-center justify-center mb-6">
                    <span className="font-display text-sm font-light text-taupe-400">{step.number}</span>
                  </div>
                  <h3 className="font-display text-xl font-light text-charcoal mb-3">{step.title}</h3>
                  <p className="font-sans font-light text-taupe-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Themes */}
          <div className="bg-white p-10">
            <p className="section-subtitle mb-8">Thèmes de consultation fréquents</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {themes.map((theme) => (
                <div key={theme.label} className="flex items-center gap-3 p-4 border border-taupe-100 hover:border-taupe-300 transition-colors duration-200">
                  <span className="text-xl">{theme.icon}</span>
                  <span className="font-sans text-sm font-light text-taupe-600">{theme.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Distance info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-charcoal p-8 text-cream">
              <div className="w-10 h-10 border border-taupe-400 flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-taupe-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-light mb-3">Consultations en cabinet</h3>
              <p className="font-sans text-sm text-taupe-300 font-light leading-relaxed">
                189, rue du Faubourg Saint-Denis<br />
                75010 Paris
              </p>
            </div>
            <div className="bg-white border border-taupe-200 p-8">
              <div className="w-10 h-10 border border-taupe-200 flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-taupe-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-light text-charcoal mb-3">Consultations à distance</h3>
              <p className="font-sans text-sm text-taupe-500 font-light leading-relaxed">
                Via Skype, Zoom, FaceTime ou WhatsApp.<br />
                Accessible depuis toute la France et l'étranger.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
