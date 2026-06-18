import { useRef, useEffect } from 'react'

export default function Appointment() {
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
    <section id="rdv" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="opacity-0 translate-y-8 transition-all duration-1000"
        >
          <div className="text-center mb-16">
            <p className="section-subtitle">Prendre rendez-vous</p>
            <h2 className="section-title">
              Votre premier pas
              <em className="italic font-light"> vers vous</em>
            </h2>
            <p className="mt-6 font-sans font-light text-taupe-400 max-w-xl mx-auto">
              Chaque parcours commence par une première rencontre. Je suis disponible pour 
              une consultation en cabinet ou à distance, selon votre situation et vos préférences.
            </p>
          </div>

          {/* Doctolib options */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
            {/* Cabinet */}
            <div className="border border-taupe-200 p-8 hover:border-charcoal transition-colors duration-300 group">
              <div className="w-12 h-12 bg-taupe-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-charcoal transition-colors duration-300">
                <svg className="w-6 h-6 text-taupe-500 group-hover:text-cream transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-light text-charcoal mb-3">
                En cabinet
              </h3>
              <p className="font-sans text-sm font-light text-taupe-500 mb-6 leading-relaxed">
                Consultation en présentiel au cabinet situé au 189, rue du Faubourg Saint-Denis, Paris 10e.
              </p>
              <div className="space-y-2 mb-8">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                  <span className="font-sans text-xs text-taupe-400">Séance individuelle — 60 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                  <span className="font-sans text-xs text-taupe-400">Paris 10e — Métro Gare du Nord</span>
                </div>
              </div>
              <a
                href="https://www.doctolib.fr/psychologue/paris/sophie-jacquet-audebert"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-doctolib w-full justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Réserver sur Doctolib
              </a>
            </div>

            {/* Vidéo */}
            <div className="border border-taupe-200 p-8 hover:border-charcoal transition-colors duration-300 group">
              <div className="w-12 h-12 bg-taupe-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-charcoal transition-colors duration-300">
                <svg className="w-6 h-6 text-taupe-500 group-hover:text-cream transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-light text-charcoal mb-3">
                À distance
              </h3>
              <p className="font-sans text-sm font-light text-taupe-500 mb-6 leading-relaxed">
                Consultation par vidéo depuis chez vous, où que vous soyez en France ou à l'étranger.
              </p>
              <div className="space-y-2 mb-8">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                  <span className="font-sans text-xs text-taupe-400">Zoom, Skype, FaceTime, WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                  <span className="font-sans text-xs text-taupe-400">Accessible depuis partout</span>
                </div>
              </div>
              <a
                href="https://www.doctolib.fr/psychologue/paris/sophie-jacquet-audebert"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-doctolib w-full justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Réserver sur Doctolib
              </a>
            </div>
          </div>

          {/* Practical info */}
          <div className="bg-cream border border-taupe-200 p-8 max-w-3xl mx-auto">
            <p className="font-sans text-xs tracking-[0.25em] uppercase text-taupe-300 mb-6">Informations pratiques</p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="font-display text-3xl font-light text-charcoal mb-2">1ère</div>
                <p className="font-sans text-xs text-taupe-400 uppercase tracking-wider">séance de découverte</p>
                <p className="font-sans text-xs text-taupe-400 mt-1">Pour se rencontrer et définir votre besoin</p>
              </div>
              <div className="text-center border-x border-taupe-200">
                <div className="font-display text-3xl font-light text-charcoal mb-2">60'</div>
                <p className="font-sans text-xs text-taupe-400 uppercase tracking-wider">durée d'une séance</p>
                <p className="font-sans text-xs text-taupe-400 mt-1">Cabinet ou vidéo</p>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-light text-charcoal mb-2">✓</div>
                <p className="font-sans text-xs text-taupe-400 uppercase tracking-wider">remboursement partiel</p>
                <p className="font-sans text-xs text-taupe-400 mt-1">Selon votre mutuelle</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
