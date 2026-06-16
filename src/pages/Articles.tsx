import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useToast } from '../components/Toast'
import type { Article, ArticleInput } from '../lib/types'

const EMPTY_ARTICLE: ArticleInput = {
  category: '',
  title: '',
  subtitle: '',
  text: '',
  tags: [],
  info: '',
  status: 'Sur demande',
  icon: '◇',
  published: true,
  sort_order: 0,
}

export default function Articles() {
  const { show } = useToast()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Article | null>(null)
  const [form, setForm] = useState<ArticleInput>(EMPTY_ARTICLE)
  const [tagDraft, setTagDraft] = useState('')
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    if (error) show(error.message, 'error')
    else setArticles(data as Article[])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm(EMPTY_ARTICLE)
    setTagDraft('')
    setModalOpen(true)
  }

  const openEdit = (article: Article) => {
    setEditing(article)
    setForm({
      category: article.category,
      title: article.title,
      subtitle: article.subtitle ?? '',
      text: article.text,
      tags: article.tags,
      info: article.info ?? '',
      status: article.status,
      icon: article.icon,
      published: article.published,
      sort_order: article.sort_order,
    })
    setTagDraft('')
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const addTag = () => {
    const value = tagDraft.trim()
    if (value && !form.tags.includes(value)) {
      setForm({ ...form, tags: [...form.tags, value] })
    }
    setTagDraft('')
  }

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    if (editing) {
      const { error } = await supabase.from('articles').update(form).eq('id', editing.id)
      if (error) show(error.message, 'error')
      else {
        show('Article mis à jour')
        setModalOpen(false)
        load()
      }
    } else {
      const { error } = await supabase.from('articles').insert(form)
      if (error) show(error.message, 'error')
      else {
        show('Article créé')
        setModalOpen(false)
        load()
      }
    }
    setSaving(false)
  }

  const handleDelete = async (article: Article) => {
    if (!confirm(`Supprimer l'article « ${article.title} » ?`)) return
    const { error } = await supabase.from('articles').delete().eq('id', article.id)
    if (error) show(error.message, 'error')
    else {
      show('Article supprimé')
      setArticles((prev) => prev.filter((a) => a.id !== article.id))
    }
  }

  const togglePublished = async (article: Article) => {
    const { error } = await supabase
      .from('articles')
      .update({ published: !article.published })
      .eq('id', article.id)
    if (error) show(error.message, 'error')
    else {
      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? { ...a, published: !a.published } : a))
      )
    }
  }

  const filtered = articles.filter((a) => {
    if (filter === 'published' && !a.published) return false
    if (filter === 'draft' && a.published) return false
    if (search && !`${a.title} ${a.category}`.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Articles</h1>
          <p className="admin-header__subtitle">{articles.length} article(s) au total</p>
        </div>
        <button className="btn btn--primary" onClick={openCreate}>+ Nouvel article</button>
      </div>

      <div className="toolbar">
        <div className="toolbar__tabs">
          <button className={`toolbar__tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Tous</button>
          <button className={`toolbar__tab ${filter === 'published' ? 'active' : ''}`} onClick={() => setFilter('published')}>Publiés</button>
          <button className={`toolbar__tab ${filter === 'draft' ? 'active' : ''}`} onClick={() => setFilter('draft')}>Brouillons</button>
        </div>
        <input
          className="search-input"
          placeholder="Rechercher un article…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="panel panel--flush">
        {loading ? (
          <p className="text-muted" style={{ padding: '1.5rem' }}>Chargement…</p>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">◇</div>
            <p>Aucun article à afficher.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Tags</th>
                <th>Statut</th>
                <th>Visibilité</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((article) => (
                <tr key={article.id}>
                  <td>
                    <strong style={{ color: 'var(--color-text)' }}>{article.icon} {article.title}</strong>
                    {article.subtitle && <div className="text-muted" style={{ fontSize: '0.78rem' }}>{article.subtitle}</div>}
                  </td>
                  <td>{article.category}</td>
                  <td>
                    {article.tags.slice(0, 3).map((t) => (
                      <span key={t} className="badge badge--rose" style={{ marginRight: '0.3rem' }}>{t}</span>
                    ))}
                  </td>
                  <td><span className="badge badge--gold">{article.status}</span></td>
                  <td>
                    <button
                      className={`badge ${article.published ? 'badge--success' : 'badge--muted'}`}
                      style={{ border: 'none' }}
                      onClick={() => togglePublished(article)}
                    >
                      {article.published ? 'Publié' : 'Brouillon'}
                    </button>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="btn btn--ghost btn--sm" onClick={() => openEdit(article)}>Modifier</button>
                      <button className="btn btn--danger btn--sm" onClick={() => handleDelete(article)}>Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card__header">
              <h2>{editing ? "Modifier l'article" : 'Nouvel article'}</h2>
              <button className="modal-card__close" onClick={closeModal}>✕</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Catégorie *</label>
                  <input
                    className="form-input"
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Rencontre mensuelle"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Icône</label>
                  <input
                    className="form-input"
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    placeholder="◇"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Titre *</label>
                <input
                  className="form-input"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="La soirée des parents"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sous-titre</label>
                <input
                  className="form-input"
                  value={form.subtitle ?? ''}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="Autour de l'enfant — à naître, découvrir, nourrir, éduquer"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Texte *</label>
                <textarea
                  className="form-textarea"
                  required
                  rows={6}
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tags</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    className="form-input"
                    value={tagDraft}
                    onChange={(e) => setTagDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                    placeholder="Exploration"
                  />
                  <button type="button" className="btn btn--outline" onClick={addTag}>Ajouter</button>
                </div>
                <div className="tag-input-list">
                  {form.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}>✕</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Info pratique</label>
                  <input
                    className="form-input"
                    value={form.info ?? ''}
                    onChange={(e) => setForm({ ...form, info: e.target.value })}
                    placeholder="Paris 10ème · 2ème mardi du mois · 19h30–22h"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Statut</label>
                  <select
                    className="form-select"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option>Sur demande</option>
                    <option>Places disponibles</option>
                    <option>Complet</option>
                    <option>Suspendu</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Ordre d'affichage</label>
                  <input
                    type="number"
                    className="form-input"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                  />
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    />
                    <span style={{ fontSize: '0.85rem' }}>Publié sur le site</span>
                  </label>
                </div>
              </div>

              <div className="modal-card__footer">
                <button type="button" className="btn btn--ghost" onClick={closeModal}>Annuler</button>
                <button type="submit" className="btn btn--primary" disabled={saving}>
                  {saving ? 'Enregistrement…' : editing ? 'Enregistrer' : 'Créer l’article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
