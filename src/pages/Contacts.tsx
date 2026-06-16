import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useToast } from '../components/Toast'
import type { Contact } from '../lib/types'

export default function Contacts() {
  const { show } = useToast()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'inbox' | 'unread' | 'archived'>('inbox')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Contact | null>(null)

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) show(error.message, 'error')
    else setContacts(data as Contact[])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const openContact = async (contact: Contact) => {
    setSelected(contact)
    if (!contact.is_read) {
      const { error } = await supabase.from('contacts').update({ is_read: true }).eq('id', contact.id)
      if (!error) {
        setContacts((prev) => prev.map((c) => (c.id === contact.id ? { ...c, is_read: true } : c)))
      }
    }
  }

  const toggleArchive = async (contact: Contact) => {
    const { error } = await supabase
      .from('contacts')
      .update({ is_archived: !contact.is_archived })
      .eq('id', contact.id)
    if (error) {
      show(error.message, 'error')
      return
    }
    setContacts((prev) =>
      prev.map((c) => (c.id === contact.id ? { ...c, is_archived: !c.is_archived } : c))
    )
    show(contact.is_archived ? 'Message restauré' : 'Message archivé')
  }

  const handleDelete = async (contact: Contact) => {
    if (!confirm(`Supprimer le message de ${contact.prenom} ${contact.nom} ?`)) return
    const { error } = await supabase.from('contacts').delete().eq('id', contact.id)
    if (error) {
      show(error.message, 'error')
      return
    }
    setContacts((prev) => prev.filter((c) => c.id !== contact.id))
    if (selected?.id === contact.id) setSelected(null)
    show('Message supprimé')
  }

  const filtered = contacts.filter((c) => {
    if (filter === 'inbox' && c.is_archived) return false
    if (filter === 'unread' && (c.is_read || c.is_archived)) return false
    if (filter === 'archived' && !c.is_archived) return false
    if (search) {
      const haystack = `${c.prenom} ${c.nom} ${c.email} ${c.motif} ${c.message}`.toLowerCase()
      if (!haystack.includes(search.toLowerCase())) return false
    }
    return true
  })

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Contacts</h1>
          <p className="admin-header__subtitle">{contacts.filter((c) => !c.is_read).length} message(s) non lu(s)</p>
        </div>
      </div>

      <div className="toolbar">
        <div className="toolbar__tabs">
          <button className={`toolbar__tab ${filter === 'inbox' ? 'active' : ''}`} onClick={() => setFilter('inbox')}>Boîte de réception</button>
          <button className={`toolbar__tab ${filter === 'unread' ? 'active' : ''}`} onClick={() => setFilter('unread')}>Non lus</button>
          <button className={`toolbar__tab ${filter === 'archived' ? 'active' : ''}`} onClick={() => setFilter('archived')}>Archivés</button>
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
            <div className="empty-state__icon">✉</div>
            <p>Aucun message à afficher.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Expéditeur</th>
                <th>Motif</th>
                <th>Source</th>
                <th>Reçu le</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className={!c.is_read ? 'is-unread' : ''} style={{ cursor: 'pointer' }} onClick={() => openContact(c)}>
                  <td>
                    <strong style={{ color: 'var(--color-text)' }}>{c.prenom} {c.nom}</strong>
                    <div className="text-muted" style={{ fontSize: '0.78rem' }}>{c.email}</div>
                  </td>
                  <td><span className="badge badge--rose">{c.motif}</span></td>
                  <td className="text-muted">{c.source || '—'}</td>
                  <td className="text-muted">{new Date(c.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn--ghost btn--sm" onClick={() => toggleArchive(c)}>
                        {c.is_archived ? 'Désarchiver' : 'Archiver'}
                      </button>
                      <button className="btn btn--danger btn--sm" onClick={() => handleDelete(c)}>Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card__header">
              <h2>{selected.prenom} {selected.nom}</h2>
              <button className="modal-card__close" onClick={() => setSelected(null)}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.88rem' }}>
              <div><span className="form-label" style={{ display: 'inline' }}>Email — </span><a href={`mailto:${selected.email}`}>{selected.email}</a></div>
              {selected.telephone && (
                <div><span className="form-label" style={{ display: 'inline' }}>Téléphone — </span><a href={`tel:${selected.telephone}`}>{selected.telephone}</a></div>
              )}
              <div><span className="form-label" style={{ display: 'inline' }}>Motif — </span>{selected.motif}</div>
              {selected.source && (
                <div><span className="form-label" style={{ display: 'inline' }}>Source — </span>{selected.source}</div>
              )}
              <div>
                <span className="form-label">Message</span>
                <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{selected.message}</p>
              </div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                Reçu le {new Date(selected.created_at).toLocaleString('fr-FR')}
              </div>
            </div>

            <div className="modal-card__footer">
              <a href={`mailto:${selected.email}`} className="btn btn--primary">Répondre par email</a>
              <button className="btn btn--ghost" onClick={() => setSelected(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
