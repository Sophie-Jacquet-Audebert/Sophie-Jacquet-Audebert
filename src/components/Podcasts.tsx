import { useRef, useEffect } from 'react'

const podcasts = [
  {
    title: 'La Révolution de l\'Esprit',
    author: 'Anthony Chêne',
    type: 'Documentaire',
    description: 'Un documentaire sur la transformation intérieure et l\'éveil de la conscience.',
    url: 'https://youtu.be/hG04LX4zrlA',
    duration: '1h 20min',
    icon: '🎬',
  },
  {
    title: 'La Puissance de l\'Intention',
    author: 'Anthony Chêne',
    type: 'Documentaire',
    description: 'Explorer la puissance de l\'intention consciente dans le processus de guérison.',
    url: 'https://youtu.be/70Xg0cclf5Q',
    duration: '58min',
    icon: '🎬',
  },
  {
    title: 'Les Chemins de la Guérison',
    author: 'Jean-Yves Bilien',
    type: 'Documentaire — 2013',
    description: 'Avec la participation de thérapeutes et chercheurs reconnus dans le domaine du soin alternatif.',
    url: 'https://youtu.be/aQL91Tahebk',
    duration: '1h 45min',
    icon: '🎬',
  },
]

const books = [
  {
    title: 'Votre Corps a une Mémoire',
    author: 'Myriam Brousse',
    editor: 'Marabout, 2007',
  },
  {
    title: 'Nouvelle Terre',
    author: 'Eckhart Tolle',
    editor: 'Ariane Edition, 2005',
  },
  {
    title: 'Aïe, mes Aïeux !',
    author: 'Anne Ancelin Schützenberger',
    editor: 'Desclée de Brouwer, 2003',
  },
  {
    title: 'Les Fantômes Familiaux',
    author: 'Bruno Clavier',
    editor: 'Petite Bibliothèque Payot, 2013',
  },
]

export default function Podcasts() {
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
    <section id="inspirations" className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="opacity-0 translate-y-8 transition-all duration-1000"
        >
          <div className="text-center mb-16">
            <p className="section-subtitle">Inspirations & ressources</p>
            <h2 className="section-title">
              Pour aller
              <em className="italic font-light"> plus loin</em>
            </h2>
            <p className="mt-6 font-sans font-light text-taupe-400 max-w-xl mx-auto">
              Une sélection de documentaires et d'ouvrages que je partage avec mes patients 
              et qui nourrissent ma pratique.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Documentaires */}
            <div>
              <h3 className="font-display text-2xl font-light text-charcoal mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-taupe-300" />
                Documentaires recommandés
              </h3>
              <div className="space-y-4">
                {podcasts.map((item) => (
                  <a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-5 bg-white border border-taupe-100 hover:border-charcoal group transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-taupe-100 flex items-center justify-center flex-shrink-0 group-hover:bg-charcoal transition-colors duration-300">
                      <svg className="w-5 h-5 text-taupe-400 group-hover:text-cream transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-display text-lg font-light text-charcoal group-hover:text-charcoal">
                            {item.title}
                          </p>
                          <p className="font-sans text-xs tracking-wider text-taupe-400 mt-0.5">
                            {item.author} · {item.type}
                          </p>
                        </div>
                        <span className="font-sans text-xs text-taupe-300 flex-shrink-0">{item.duration}</span>
                      </div>
                      <p className="font-sans text-sm font-light text-taupe-500 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Livres */}
            <div>
              <h3 className="font-display text-2xl font-light text-charcoal mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-taupe-300" />
                Livres de référence
              </h3>
              <div className="space-y-4">
                {books.map((book) => (
                  <div
                    key={book.title}
                    className="flex items-start gap-4 p-5 bg-white border border-taupe-100 hover:border-taupe-300 transition-colors duration-300"
                  >
                    <div className="w-12 h-16 bg-taupe-100 flex items-center justify-center flex-shrink-0 relative">
                      <svg className="w-5 h-5 text-taupe-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-display text-lg font-light text-charcoal">
                        {book.title}
                      </p>
                      <p className="font-sans text-sm font-light text-taupe-500 mt-0.5">{book.author}</p>
                      <p className="font-sans text-xs tracking-wider text-taupe-300 mt-1">{book.editor}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ateliers */}
              <div className="mt-8 p-6 bg-taupe-100 border border-taupe-200">
                <h4 className="font-display text-xl font-light text-charcoal mb-3">Les Transmissions de Sophie</h4>
                <p className="font-sans text-sm font-light text-taupe-500 leading-relaxed">
                  Ateliers et conférences sur la mémoire cellulaire, l'astrologie et le bien-être. 
                  Ces rencontres peuvent avoir lieu chez vous — jusqu'à 15 personnes.
                </p>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-block mt-4 font-sans text-xs tracking-[0.2em] uppercase text-charcoal border-b border-charcoal hover:text-taupe-500 hover:border-taupe-500 transition-colors duration-200"
                >
                  Me contacter pour un atelier
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
