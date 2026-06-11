import { useRef, useEffect, useState } from 'react'

const testimonials = [
  {
    text: "Sophie a su m'accompagner avec une grande douceur et une bienveillance exceptionnelle. Son approche intégrative m'a permis d'explorer des aspects de moi-même que je n'aurais jamais pu atteindre seule. Je recommande vivement.",
    author: "Marie L.",
    context: "Suivi individuel",
    rating: 5,
  },
  {
    text: "Une professionnelle remarquable qui allie écoute profonde et outils thérapeutiques variés. Grâce à notre travail sur la mémoire cellulaire, j'ai pu me libérer de schémas familiaux qui me pesaient depuis longtemps.",
    author: "Thomas G.",
    context: "Mémoire cellulaire",
    rating: 5,
  },
  {
    text: "Les séances à distance sont aussi efficaces qu'en présentiel. Sophie crée un véritable espace de confiance et de sécurité. Son intuition clinique est remarquable.",
    author: "Isabelle M.",
    context: "Consultation vidéo",
    rating: 5,
  },
  {
    text: "J'ai consulté Sophie durant ma grossesse puis après l'accouchement. Son accompagnement a été précieux pour traverser cette période de transformation. Elle comprend vraiment ce que vivent les femmes et les mères.",
    author: "Camille D.",
    context: "Maternité & parentalité",
    rating: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-sage-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
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
    <section className="py-28 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="opacity-0 translate-y-8 transition-all duration-1000"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-taupe-400 mb-4">Témoignages</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-cream">
              Ce que disent
              <em className="italic font-light text-taupe-300"> mes patients</em>
            </h2>
          </div>

          {/* Featured testimonial */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="flex justify-center mb-6">
              <StarRating count={testimonials[current].rating} />
            </div>
            <blockquote className="font-display text-2xl font-light italic text-cream leading-relaxed mb-8">
              «&nbsp;{testimonials[current].text}&nbsp;»
            </blockquote>
            <div>
              <p className="font-sans text-sm font-light text-cream">{testimonials[current].author}</p>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-taupe-400 mt-1">{testimonials[current].context}</p>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mb-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 ${
                  i === current
                    ? 'w-8 h-1 bg-cream'
                    : 'w-4 h-1 bg-taupe-500 hover:bg-taupe-300'
                }`}
              />
            ))}
          </div>

          {/* All testimonials grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {testimonials.map((t, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  i === current
                    ? 'bg-white/10 border border-taupe-400'
                    : 'bg-white/5 border border-white/10 hover:border-taupe-500'
                }`}
              >
                <StarRating count={t.rating} />
                <p className="font-sans text-xs text-taupe-300 font-light leading-relaxed mt-3 line-clamp-3">
                  {t.text}
                </p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="font-sans text-xs text-cream">{t.author}</p>
                  <p className="font-sans text-xs text-taupe-500 tracking-wider">{t.context}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Doctolib reviews link */}
          <div className="text-center mt-12">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-sans text-sm tracking-[0.15em] uppercase text-taupe-300 hover:text-cream transition-colors duration-200"
            >
              Voir tous les avis sur Doctolib
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
