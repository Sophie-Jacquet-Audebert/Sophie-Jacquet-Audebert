import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useToast } from '../components/Toast'
import type { Appointment } from '../lib/types'

type AppointmentInput = Omit<Appointment, 'id' | 'created_at'>

const EMPTY_APPOINTMENT: AppointmentInput = {
  date: '',
  heure: '',
  motif: '',
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  status: 'En attente',
  notes: '',
}

const STATUS_BADGE: Record<Appointment['status'], string> = {
  'En attente': 'badge--warning',
  'Confirmé': 'badge--success',
  'Annulé': 'badge--danger',
}

export default function Appointments() {
  const { show } = useToast()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'upcoming' | 'all' | 'pending'>('upcoming')
  const [search, setSearch] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Appointment | null>(null)
  const [form, setForm] = useState<AppointmentInput>(EMPTY_APPOINTMENT)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('date', { ascending: true })
      .order('heure', { ascending: true })
    if (error) show(error.message, 'error')
    else setAppointments(data as Appointment[])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm(EMPTY_APPOINTMENT)
    setModalOpen(true)
  }

  const openEdit = (appt: Appointment) => {
    setEditing(appt)
    setForm({
      date: appt.date,
      heure: appt.heure?.slice(0, 5) ?? '',
      motif: appt.motif,
      nom: appt.nom,
      prenom: appt.prenom,
      email: appt.email,
      telephone: appt.telephone ?? '',
      status: appt.status,
      notes: appt.notes ?? '',
    })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    if (editing) {
      const { error } = await supabase.from('appointments').update(form).eq('id', editing.id)
      if (error) show(error.message, 'error')
      else {
        show('Rendez-vous mis à jour')
        setModalOpen(false)
        load()
      }
    } else {
      const { error } = await supabase.from('appointments').insert(form)
      if (error) show(error.message, 'error')
      else {
        show('Rendez-vous créé')
        setModalOpen(false)
        load()
      }
    }
    setSaving(false)
  }

  const updateStatus = async (appt: Appointment, status: Appointment['status']) => {
    const { error } = await supabase.from('appointments').update({ status }).eq('id', appt.id)
    if (error) show(error.message, 'error')
    else setAppointments((prev) => prev.map((a) => (a.id === appt.id ? { ...a, status } : a)))
  }

  const handleDelete = async (appt: Appointment) => {
    if (!confirm(`Supprimer le rendez-vous de ${appt.prenom} ${appt.nom} ?`)) return
    const { error } = await supabase.from('appointments').delete().eq('id', appt.id)
    if (error) show(error.message, 'error')
    else {
      setAppointments((prev) => prev.filter((a) => a.id !== appt.id))
      show('Rendez-vous supprimé')
    }
  }

  const today = new Date().toISOString().slice(0, 10)

  const filtered = appointments.filter((a) => {
    if (filter === 'upcoming' && a.date < today) return false
    if (filter === 'pending' && a.status !== 'En attente') return false
    if (search) {
      const haystack = `${a.prenom} ${a.nom} ${a.email} ${a.motif}`.toLowerCase()
      if (!haystack.includes(search.toLowerCase())) return false
    }
    return true
  })

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Rendez-vous</h1>
          <p className="admin-header__subtitle">{appointments.filter((a) => a.status === 'En attente').length} en attente de confirmation</p>
        </div>
        <button className="btn btn--primary" onClick={openCreate}>+ Nouveau rendez-vous</button>
      </div>

      <div className="toolbar">
        <div className="toolbar__tabs">
          <button className={`toolbar__tab ${filter === 'upcoming' ? 'active' : ''}`} onClick={() => setFilter('upcoming')}>À venir</button>
          <button className={`toolbar__tab ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>En attente</button>
          <button className={`toolbar__tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Tous</button>
        </div>
        <input
          className="search-input"
          placeholder="Rechercher…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="panel panel--flush">
        {loading ? (
          <p className="text-muted" style={{ padding: '1.5rem' }}>Chargement…</p>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">◷</div>
            <p>Aucun rendez-vous à afficher.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Patient(e)</th>
                <th>Motif</th>
                <th>Contact</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td>
                    <strong style={{ color: 'var(--color-text)' }}>
                      {new Date(a.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </strong>
                    <div className="text-muted" style={{ fontSize: '0.78rem' }}>{a.heure?.slice(0, 5)}</div>
                  </td>
                  <td>{a.prenom} {a.nom}</td>
                  <td>{a.motif}</td>
                  <td>
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>{a.email}</div>
                    {a.telephone && <div className="text-muted" style={{ fontSize: '0.8rem' }}>{a.telephone}</div>}
                  </td>
                  <td>
                    <select
                      className={`badge ${STATUS_BADGE[a.status]}`}
                      style={{ border: 'none', appearance: 'none', paddingRight: '1.5rem' }}
                      value={a.status}
                      onChange={(e) => updateStatus(a, e.target.value as Appointment['status'])}
                    >
                      <option value="En attente">En attente</option>
                      <option value="Confirmé">Confirmé</option>
                      <option value="Annulé">Annulé</option>
                    </select>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="btn btn--ghost btn--sm" onClick={() => openEdit(a)}>Modifier</button>
                      <button className="btn btn--danger btn--sm" onClick={() => handleDelete(a)}>Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card__header">
              <h2>{editing ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}</h2>
              <button className="modal-card__close" onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input
                    type="date"
                    className="form-input"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Heure *</label>
                  <input
                    type="time"
                    className="form-input"
                    required
                    value={form.heure}
                    onChange={(e) => setForm({ ...form, heure: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Motif du rendez-vous *</label>
                <input
                  className="form-input"
                  required
                  value={form.motif}
                  onChange={(e) => setForm({ ...form, motif: e.target.value })}
                  placeholder="Première consultation"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Prénom *</label>
                  <input
                    className="form-input"
                    required
                    value={form.prenom}
                    onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Nom *</label>
                  <input
                    className="form-input"
                    required
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-input"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone</label>
                  <input
                    className="form-input"
                    value={form.telephone ?? ''}
                    onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Statut</label>
                <select
                  className="form-select"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Appointment['status'] })}
                >
                  <option value="En attente">En attente</option>
                  <option value="Confirmé">Confirmé</option>
                  <option value="Annulé">Annulé</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Notes internes</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={form.notes ?? ''}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              <div className="modal-card__footer">
                <button type="button" className="btn btn--ghost" onClick={() => setModalOpen(false)}>Annuler</button>
                <button type="submit" className="btn btn--primary" disabled={saving}>
                  {saving ? 'Enregistrement…' : editing ? 'Enregistrer' : 'Créer le rendez-vous'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
