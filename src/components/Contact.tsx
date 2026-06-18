import { useRef, useEffect, useState } from 'react'

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
  howFound: string
  preferredContact: string
}

const subjects = [
  'Premier contact',
  'Parentalité & maternité',
  'Anxiété & stress',
  'Travail transgénérationnel',
  'Art-thérapie',
  'Biorésonnance',
  'Atelier ou conférence',
  'Autre',
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    howFound: '',
    preferredContact: 'email',
  })
  const [submitted, setSubmitted] = useState(false)

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => setSubmitted(true), 500)
  }

  return (
    <section id="contact" className="py-28 bg-taupe-100">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="opacity-0 translate-y-8 transition-all duration-1000"
        >
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Left info */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <p className="section-subtitle">Contact</p>
                <h2 className="section-title">
                  Commençons
                  <em className="italic font-light"> à vous écouter</em>
                </h2>
                <p className="mt-6 font-sans font-light text-taupe-500 leading-relaxed">
                  N'hésitez pas à me contacter pour toute question ou pour convenir 
                  d'un premier rendez-vous. Je vous répondrai dans les meilleurs délais.
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white border border-taupe-200 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-taupe-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-[0.2em] uppercase text-taupe-300 mb-1">Cabinet</p>
                    <p className="font-sans text-sm font-light text-charcoal">
                      189, rue du Faubourg Saint-Denis<br />
                      75010 Paris
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white border border-taupe-200 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-taupe-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-[0.2em] uppercase text-taupe-300 mb-1">Email</p>
                    <a
                      href="mailto:sophiejacquetaudebert@gmail.com"
                      className="font-sans text-sm font-light text-charcoal hover:text-taupe-500 transition-colors"
                    >
                      sophiejacquetaudebert@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white border border-taupe-200 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-taupe-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-[0.2em] uppercase text-taupe-300 mb-1">Téléphone</p>
                    <a
                      href="tel:+33664997050"
                      className="font-sans text-sm font-light text-charcoal hover:text-taupe-500 transition-colors"
                    >
                      06 64 99 70 50
                    </a>
                  </div>
                </div>
              </div>

              {/* Doctolib CTA */}
              <div className="p-6 bg-white border border-taupe-200">
                <p className="font-display text-xl font-light text-charcoal mb-3">
                  Prendre rendez-vous directement
                </p>
                <p className="font-sans text-xs font-light text-taupe-500 mb-5">
                  Réservez votre séance en ligne sur Doctolib, en quelques clics.
                </p>
                <a
                  href="https://www.doctolib.fr/psychologue/paris/sophie-jacquet-audebert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-doctolib w-full justify-center text-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Ouvrir Doctolib
                </a>
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-12">
                    <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-display text-3xl font-light text-charcoal mb-3">
                      Message envoyé
                    </h3>
                    <p className="font-sans font-light text-taupe-500">
                      Merci pour votre message. Je vous répondrai dans les meilleurs délais.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white p-8 lg:p-10 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs tracking-[0.2em] uppercase text-taupe-400 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border border-taupe-200 px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal transition-colors bg-transparent"
                        placeholder="Marie"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-[0.2em] uppercase text-taupe-400 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border border-taupe-200 px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal transition-colors bg-transparent"
                        placeholder="Martin"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs tracking-[0.2em] uppercase text-taupe-400 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-taupe-200 px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal transition-colors bg-transparent"
                        placeholder="marie@exemple.fr"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-[0.2em] uppercase text-taupe-400 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-taupe-200 px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal transition-colors bg-transparent"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs tracking-[0.2em] uppercase text-taupe-400 mb-2">
                      Objet de votre demande
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full border border-taupe-200 px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal transition-colors bg-transparent appearance-none cursor-pointer"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans text-xs tracking-[0.2em] uppercase text-taupe-400 mb-2">
                      Comment avez-vous entendu parler de moi ?
                    </label>
                    <select
                      name="howFound"
                      value={formData.howFound}
                      onChange={handleChange}
                      className="w-full border border-taupe-200 px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal transition-colors bg-transparent appearance-none cursor-pointer"
                    >
                      <option value="">Choisir une option</option>
                      <option value="Doctolib">Doctolib</option>
                      <option value="Recommandation">Recommandation / bouche à oreille</option>
                      <option value="Google">Google / recherche internet</option>
                      <option value="Réseaux sociaux">Réseaux sociaux</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans text-xs tracking-[0.2em] uppercase text-taupe-400 mb-2">
                      Votre message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full border border-taupe-200 px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal transition-colors bg-transparent resize-none"
                      placeholder="Décrivez brièvement votre situation ou votre demande..."
                    />
                  </div>

                  <div>
                    <p className="font-sans text-xs tracking-[0.2em] uppercase text-taupe-400 mb-3">
                      Moyen de contact préféré
                    </p>
                    <div className="flex gap-6">
                      {['Email', 'Téléphone', 'Les deux'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContact"
                            value={opt.toLowerCase()}
                            checked={formData.preferredContact === opt.toLowerCase()}
                            onChange={handleChange}
                            className="accent-charcoal"
                          />
                          <span className="font-sans text-sm font-light text-charcoal">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full text-center"
                  >
                    Envoyer le message
                  </button>

                  <p className="font-sans text-xs text-taupe-300 text-center">
                    Vos informations sont confidentielles et ne seront jamais partagées.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
