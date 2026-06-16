import { NavLink, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const NAV_ITEMS = [
  { to: '/', label: 'Résumé', icon: '◇', exact: true },
  { to: '/articles', label: 'Articles', icon: '✎' },
  { to: '/contacts', label: 'Contacts', icon: '✉' },
  { to: '/rendez-vous', label: 'Rendez-vous', icon: '◷' },
  { to: '/parametres', label: 'Paramètres', icon: '⚙' },
]

export default function AdminLayout() {
  const { signOut } = useAuth()
  const [unreadContacts, setUnreadContacts] = useState(0)
  const [pendingAppointments, setPendingAppointments] = useState(0)

  useEffect(() => {
    const loadCounts = async () => {
      const [{ count: contactsCount }, { count: appointmentsCount }] = await Promise.all([
        supabase.from('contacts').select('id', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('status', 'En attente'),
      ])
      setUnreadContacts(contactsCount ?? 0)
      setPendingAppointments(appointmentsCount ?? 0)
    }
    loadCounts()

    const channel = supabase
      .channel('admin-badges')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, loadCounts)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, loadCounts)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const badgeFor = (label: string) => {
    if (label === 'Contacts' && unreadContacts > 0) return unreadContacts
    if (label === 'Rendez-vous' && pendingAppointments > 0) return pendingAppointments
    return null
  }

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <span className="sidebar__brand-label">Espace privé</span>
          <span className="sidebar__brand-name">Sophie Jacquet-Audebert</span>
        </div>

        <nav className="sidebar__nav">
          {NAV_ITEMS.map((item) => {
            const badge = badgeFor(item.label)
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) => `sidebar__link ${isActive ? 'active' : ''}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {badge != null && <span className="sidebar__link-badge">{badge}</span>}
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar__footer">
          <button className="sidebar__signout" onClick={signOut}>
            Se déconnecter
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
