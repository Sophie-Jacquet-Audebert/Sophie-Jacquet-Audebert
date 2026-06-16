import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { supabase } from '../lib/supabase'
import type { Contact, Appointment } from '../lib/types'

type Stats = {
  articlesPublished: number
  articlesTotal: number
  unreadContacts: number
  totalContacts: number
  pendingAppointments: number
  upcomingAppointments: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentContacts, setRecentContacts] = useState<Contact[]>([])
  const [nextAppointments, setNextAppointments] = useState<Appointment[]>([])
  const [chartData, setChartData] = useState<{ name: string; contacts: number; rdv: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const today = new Date().toISOString().slice(0, 10)

      const [
        articlesPublished,
        articlesTotal,
        unreadContacts,
        totalContacts,
        pendingAppointments,
        upcomingAppointments,
        recentContactsRes,
        nextAppointmentsRes,
      ] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact', head: true }).eq('published', true),
        supabase.from('articles').select('id', { count: 'exact', head: true }),
        supabase.from('contacts').select('id', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('contacts').select('id', { count: 'exact', head: true }),
        supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('status', 'En attente'),
        supabase.from('appointments').select('id', { count: 'exact', head: true }).gte('date', today),
        supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(5),
        supabase
          .from('appointments')
          .select('*')
          .gte('date', today)
          .order('date', { ascending: true })
          .order('heure', { ascending: true })
          .limit(5),
      ])

      setStats({
        articlesPublished: articlesPublished.count ?? 0,
        articlesTotal: articlesTotal.count ?? 0,
        unreadContacts: unreadContacts.count ?? 0,
        totalContacts: totalContacts.count ?? 0,
        pendingAppointments: pendingAppointments.count ?? 0,
        upcomingAppointments: upcomingAppointments.count ?? 0,
      })
      setRecentContacts((recentContactsRes.data as Contact[]) ?? [])
      setNextAppointments((nextAppointmentsRes.data as Appointment[]) ?? [])

      // Activité des 7 derniers jours
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
      const sinceIso = sevenDaysAgo.toISOString().slice(0, 10)

      const [contactsByDay, appointmentsByDay] = await Promise.all([
        supabase.from('contacts').select('created_at').gte('created_at', sinceIso),
        supabase.from('appointments').select('created_at').gte('created_at', sinceIso),
      ])

      const days: { name: string; key: string; contacts: number; rdv: number }[] = []
      for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const key = d.toISOString().slice(0, 10)
        const name = d.toLocaleDateString('fr-FR', { weekday: 'short' })
        days.push({ name, key, contacts: 0, rdv: 0 })
      }

      ;(contactsByDay.data ?? []).forEach((row: { created_at: string }) => {
        const key = row.created_at.slice(0, 10)
        const day = days.find((d) => d.key === key)
        if (day) day.contacts += 1
      })
      ;(appointmentsByDay.data ?? []).forEach((row: { created_at: string }) => {
        const key = row.created_at.slice(0, 10)
        const day = days.find((d) => d.key === key)
        if (day) day.rdv += 1
      })

      setChartData(days.map(({ name, contacts, rdv }) => ({ name, contacts, rdv })))
      setLoading(false)
    }

    load()
  }, [])

  if (loading || !stats) {
    return <p className="text-muted">Chargement…</p>
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Résumé</h1>
          <p className="admin-header__subtitle">Vue d'ensemble de l'activité du site</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-card__label">Articles publiés</span>
          <div className="stat-card__value">{stats.articlesPublished}</div>
          <div className="stat-card__meta">{stats.articlesTotal} au total</div>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Messages non lus</span>
          <div className="stat-card__value">{stats.unreadContacts}</div>
          <div className="stat-card__meta">{stats.totalContacts} messages reçus</div>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">RDV en attente</span>
          <div className="stat-card__value">{stats.pendingAppointments}</div>
          <div className="stat-card__meta">{stats.upcomingAppointments} à venir</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <h2 className="panel__title">Activité — 7 derniers jours</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={12} />
              <YAxis stroke="var(--color-text-muted)" fontSize={12} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.8rem',
                }}
              />
              <Bar dataKey="contacts" name="Contacts" fill="var(--color-rose)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="rdv" name="RDV" fill="var(--color-gold)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <h2 className="panel__title">Prochains rendez-vous</h2>
          {nextAppointments.length === 0 ? (
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>Aucun rendez-vous à venir.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {nextAppointments.map((a) => (
                <div key={a.id} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '0.85rem' }}>{a.prenom} {a.nom}</strong>
                    <span className="badge badge--rose">
                      {new Date(a.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} · {a.heure.slice(0, 5)}
                    </span>
                  </div>
                  <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>{a.motif}</p>
                </div>
              ))}
            </div>
          )}
          <Link to="/rendez-vous" className="btn btn--ghost btn--sm" style={{ marginTop: '0.5rem' }}>
            Voir tous les rendez-vous
          </Link>
        </div>
      </div>

      <div className="panel" style={{ marginTop: '1.5rem' }}>
        <h2 className="panel__title">Derniers messages</h2>
        {recentContacts.length === 0 ? (
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>Aucun message pour le moment.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Motif</th>
                <th>Reçu le</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentContacts.map((c) => (
                <tr key={c.id} className={!c.is_read ? 'is-unread' : ''}>
                  <td>{c.prenom} {c.nom}</td>
                  <td>{c.motif}</td>
                  <td>{new Date(c.created_at).toLocaleDateString('fr-FR')}</td>
                  <td>
                    {c.is_read ? (
                      <span className="badge badge--muted">Lu</span>
                    ) : (
                      <span className="badge badge--rose">Non lu</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Link to="/contacts" className="btn btn--ghost btn--sm" style={{ marginTop: '1rem' }}>
          Voir tous les messages
        </Link>
      </div>
    </div>
  )
}
