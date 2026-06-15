import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from './Footer'

// Composant pour gérer le scroll to top
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // défilement fluide
    })
  }, [pathname]) // Se déclenche à chaque changement de chemin

  return null
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}