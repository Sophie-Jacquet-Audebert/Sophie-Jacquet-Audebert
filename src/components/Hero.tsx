import { useEffect, useRef } from 'react'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.opacity = '0'
      ref.current.style.transform = 'translateY(20px)'
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transition = 'opacity 1s ease, transform 1s ease'
          ref.current.style.opacity = '1'
          ref.current.style.transform = 'translateY(0)'
        }
      }, 100)
    }
  }, [])

  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden bg-cream">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-taupe-100/40" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-sage-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div ref={ref} className="space-y-8">
            <div>
              <p className="section-subtitle">Psychologue Clinicienne · Paris 10</p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-charcoal">
                Un espace pour
                <br />
                <em className="font-light italic text-taupe-500">vous retrouver</em>
              </h1>
            </div>

            <p className="font-sans text-base leading-relaxed text-taupe-500 max-w-md font-light">
              Je vous accompagne avec une approche singulière et intégrative, au plus proche de votre besoin. 
              Consultations en cabinet à Paris ou à distance.
            </p>

            <blockquote className="text-xl font-display italic text-taupe-400 border-l-2 border-taupe-200 pl-5">
              « Deviens qui tu es »
              <footer className="text-sm font-sans not-italic tracking-widest uppercase text-taupe-300 mt-2">
                — Nietzsche
              </footer>
            </blockquote>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-doctolib"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                RDV en cabinet
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Consultation vidéo
              </a>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs font-sans tracking-wider text-taupe-400 uppercase">Psychologue diplômée</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                </div>
                <span className="text-xs font-sans tracking-wider text-taupe-400 uppercase">Séances vidéo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs font-sans tracking-wider text-taupe-400 uppercase">Sur rendez-vous</span>
              </div>
            </div>
          </div>

          {/* Right — Photo */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Photo frame */}
              <div className="relative aspect-[3/4] max-w-md ml-auto overflow-hidden">
                {/* Decorative border */}
                <div className="absolute -top-4 -right-4 w-full h-full border border-taupe-200 z-0" />
                
                {/* Photo placeholder with elegant design */}
                <div className="relative z-10 w-full h-full bg-taupe-100 overflow-hidden">
                  {/* Elegant placeholder with initials */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-taupe-100 to-taupe-200">
                    <div className="w-32 h-32 rounded-full bg-taupe-200 flex items-center justify-center mb-6">
                      <span className="font-display text-4xl font-light text-taupe-400">SJA</span>
                    </div>
                    <p className="font-sans text-xs tracking-[0.3em] uppercase text-taupe-400">Photo à venir</p>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-8 -left-8 bg-cream p-6 shadow-lg max-w-xs z-20">
                <p className="font-display text-2xl font-light text-charcoal mb-1">
                  15+ ans
                </p>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-taupe-400">
                  d'expérience clinique
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-12 bg-taupe-300" />
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-taupe-300">Découvrir</span>
      </div>
    </section>
  )
}
