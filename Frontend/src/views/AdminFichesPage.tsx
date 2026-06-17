'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useDemoStore } from '@/context/DemoStoreContext'
import { statusMeta } from '@/types/content'

export function AdminFichesPage() {
  const { fiches, approveFiche, rejectFiche } = useDemoStore()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'review' | 'draft' | 'rejected'>('all')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    return fiches.filter((f) => {
      const matchesStatus = statusFilter === 'all' ? true : f.status === statusFilter
      const matchesSearch = !search.trim() || f.title.toLowerCase().includes(search.toLowerCase()) || f.question.toLowerCase().includes(search.toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [fiches, search, statusFilter])

  const toggleSelect = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map((f) => f.slug)))
    }
  }

  const approveSelected = () => {
    selected.forEach((slug) => approveFiche(slug))
    setSelected(new Set())
  }

  const rejectSelected = () => {
    selected.forEach((slug) => rejectFiche(slug))
    setSelected(new Set())
  }

  const counts = {
    all: fiches.length,
    published: fiches.filter((f) => f.status === 'published').length,
    review: fiches.filter((f) => f.status === 'review').length,
    draft: fiches.filter((f) => f.status === 'draft').length,
    rejected: fiches.filter((f) => f.status === 'rejected').length,
  }

  return (
    <div className="admin-fiches-page">
      <div className="page-header admin-page-header">
        <div className="page-eyebrow">Administration</div>
        <h1 className="page-title">Gestion des <em>fiches</em></h1>
        <p className="page-subtitle">Modération et supervision de toutes les fiches de connaissance — vue administrateur avec actions en lot.</p>
      </div>

      {selected.size > 0 && (
        <div className="admin-bulk-bar">
          <span>{selected.size} fiche(s) sélectionnée(s)</span>
          <button type="button" className="admin-bulk-btn approve" onClick={approveSelected}>✓ Approuver la sélection</button>
          <button type="button" className="admin-bulk-btn reject" onClick={rejectSelected}>✕ Rejeter la sélection</button>
          <button type="button" className="admin-bulk-btn cancel" onClick={() => setSelected(new Set())}>Annuler</button>
        </div>
      )}

      <div className="admin-toolbar">
        <div className="admin-search">
          <input type="text" placeholder="Rechercher une fiche…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="admin-status-filters">
          {(['all', 'published', 'review', 'draft', 'rejected'] as const).map((status) => (
            <button
              key={status}
              type="button"
              className={`admin-filter-chip ${statusFilter === status ? 'active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status === 'all' ? 'Tous' : status === 'published' ? 'Publiés' : status === 'review' ? 'En révision' : status === 'draft' ? 'Brouillons' : 'Rejetés'}
              <span className="admin-filter-count">{counts[status]}</span>
            </button>
          ))}
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th className="col-check">
              <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} />
            </th>
            <th>Titre / Question</th>
            <th>Catégorie</th>
            <th>Auteur</th>
            <th>Statut</th>
            <th>Mis à jour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((fiche) => {
            const meta = statusMeta(fiche.status)
            return (
              <tr key={fiche.slug}>
                <td className="col-check">
                  <input type="checkbox" checked={selected.has(fiche.slug)} onChange={() => toggleSelect(fiche.slug)} />
                </td>
                <td>
                  <div className="admin-fiche-title">{fiche.title}</div>
                  <div className="admin-fiche-question">{fiche.question}</div>
                </td>
                <td><span className="admin-tag">{fiche.category}</span></td>
                <td className="admin-muted">{fiche.authorId}</td>
                <td><span className={`badge ${meta.className}`}>{meta.label}</span></td>
                <td className="admin-muted">{new Date(fiche.updatedAt).toLocaleDateString('fr-FR')}</td>
                <td>
                  <div className="admin-row-actions">
                    <Link href={`/fiches/${fiche.slug}`} className="admin-row-btn">Voir</Link>
                    {fiche.status === 'review' && (
                      <>
                        <button type="button" className="admin-row-btn approve" onClick={() => approveFiche(fiche.slug)}>✓</button>
                        <button type="button" className="admin-row-btn reject" onClick={() => rejectFiche(fiche.slug)}>✕</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <div className="admin-empty">Aucune fiche trouvée pour ces critères.</div>
      )}
    </div>
  )
}