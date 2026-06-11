import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Pratiques from './pages/Pratiques'
import Parcours from './pages/Parcours'
import Actualites from './pages/Actualites'
import Contact from './pages/Contact'
import PsychologieClinique from './pages/PsychologieClinique'
import ArtTherapie from './pages/ArtTherapie'
import MemoireCellulaire from './pages/MemoireCellulaire'
import BioResonance from './pages/BioResonance'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pratiques" element={<Pratiques />} />
          <Route path="pratiques/psychologie-clinique" element={<PsychologieClinique />} />
          <Route path="pratiques/art-therapie" element={<ArtTherapie />} />
          <Route path="pratiques/memoire-cellulaire" element={<MemoireCellulaire />} />
          <Route path="pratiques/bio-resonance" element={<BioResonance />} />
          <Route path="parcours" element={<Parcours />} />
          <Route path="actualites" element={<Actualites />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
