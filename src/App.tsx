import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { SettingsProvider } from './context/SettingsContext'
import { ToastProvider } from './components/Toast'
import ProtectedRoute from './components/ProtectedRoute'

// Public imports
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

// Admin imports
import AdminLayout from './components/AdminLayout'
import Dashboard from './pages/Dashboard'
import Articles from './pages/Articles'
import Contacts from './pages/Contacts'
import Appointments from './pages/Appointments'
import SettingsPage from './pages/SettingsPage'
import './admin.css'

export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
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

              {/* Admin routes - protected */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="articles" element={<Articles />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="rendez-vous" element={<Appointments />} />
                <Route path="parametres" element={<SettingsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </SettingsProvider>
    </AuthProvider>
  )
}