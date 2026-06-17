'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useDemoStore } from '@/context/DemoStoreContext'
import { statusMeta } from '@/types/content'
import { countRoadmapFiches } from '@/lib/roadmapUtils'

export function AdminRoadmapsPage() {
  const { roadmaps, approveRoadmap, rejectRoadmap, deleteRoadmap } = useDemoStore()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'review' | 'draft' | 'rejected'>('all')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    return roadmaps.filter((r) => {
      const matchesStatus = statusFilter === 'all' ? true : r.status === statusFilter
      const matchesSearch = !search.trim() || r.title.toLowerCase().includes(search.toLowerCase()) || r.summary.toLowerCase().includes(search.toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [roadmaps, search, statusFilter])

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
      setSelected(new Set(filtered.map((r) => r.slug)))
    }
  }

  const approveSelected = () => {
    selected.forEach((slug) => approveRoadmap(slug))
    setSelected(new Set())
  }

  const rejectSelected = () => {
    selected.forEach((slug) => rejectRoadmap(slug))
    setSelected(new Set())
  }

  const counts = {
    all: roadmaps.length,
    published: roadmaps.filter((r) => r.status === 'published').length,
    review: roadmaps.filter((r) => r.status === 'review').length,
    draft: roadmaps.filter((r) => r.status === 'draft').length,
    rejected: roadmaps.filter((r) => r.status === 'rejected').length,
  }

  return (
    <div className="admin-fiches-page">
      <div className="page-header admin-page-header">
        <div className="page-eyebrow">Administration</div>
        <h1 className="page-title">Gestion des <em>roadmaps</em></h1>
        <p className="page-subtitle">Modération et supervision de tous les parcours structurés — vue administrateur avec actions en lot.</p>
      </div>

      {selected.size > 0 && (
        <div className="admin-bulk-bar">
          <span>{selected.size} roadmap(s) sélectionnée(s)</span>
          <button type="button" className="admin-bulk-btn approve" onClick={approveSelected}>✓ Approuver la sélection</button>
          <button type="button" className="admin-bulk-btn reject" onClick={rejectSelected}>✕ Rejeter la sélection</button>
          <button type="button" className="admin-bulk-btn cancel" onClick={() => setSelected(new Set())}>Annuler</button>
        </div>
      )}

      <div className="admin-toolbar">
        <div className="admin-search">
          <input type="text" placeholder="Rechercher une roadmap…" value={search} onChange={(e) => setSearch(e.target.value)} />
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
            <th>Titre / Résumé</th>
            <th>Étapes / Fiches</th>
            <th>Auteur</th>
            <th>Statut</th>
            <th>Mis à jour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((roadmap) => {
            const meta = statusMeta(roadmap.status)
            const ficheCount = countRoadmapFiches(roadmap)
            return (
              <tr key={roadmap.slug}>
                <td className="col-check">
                  <input type="checkbox" checked={selected.has(roadmap.slug)} onChange={() => toggleSelect(roadmap.slug)} />
                </td>
                <td>
                  <div className="admin-fiche-title">{roadmap.title}</div>
                  <div className="admin-fiche-question">{roadmap.summary}</div>
                </td>
                <td className="admin-muted">{roadmap.steps.length} étapes · {ficheCount} fiches liées</td>
                <td className="admin-muted">{roadmap.authorId}</td>
                <td><span className={`badge ${meta.className}`}>{meta.label}</span></td>
                <td className="admin-muted">{new Date(roadmap.updatedAt).toLocaleDateString('fr-FR')}</td>
                <td>
                  <div className="admin-row-actions">
                    <Link href={`/roadmaps/${roadmap.slug}`} className="admin-row-btn">Voir</Link>
                    {roadmap.status === 'review' && (
                      <>
                        <button type="button" className="admin-row-btn approve" onClick={() => approveRoadmap(roadmap.slug)}>✓</button>
                        <button type="button" className="admin-row-btn reject" onClick={() => rejectRoadmap(roadmap.slug)}>✕</button>
                      </>
                    )}
                    <button type="button" className="admin-row-btn cancel" onClick={() => { if (confirm('Supprimer cette roadmap ?')) deleteRoadmap(roadmap.slug) }}>🗑</button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <div className="admin-empty">Aucune roadmap trouvée pour ces critères.</div>
      )}
    </div>
  )
}