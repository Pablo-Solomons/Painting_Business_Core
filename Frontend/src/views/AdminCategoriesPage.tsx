'use client'

import { useState } from 'react'

type AdminCategory = {
  slug: string
  name: string
  description: string
  fichesCount: number
  publishedCount: number
  reviewCount: number
}

const adminCategories: AdminCategory[] = [
  { slug: 'technique', name: 'Technique', description: 'Savoir-faire, méthodes et procédés picturaux', fichesCount: 2, publishedCount: 1, reviewCount: 1 },
  { slug: 'medium', name: 'Médium', description: 'Liants, diluants, siccatifs et adjuvants', fichesCount: 1, publishedCount: 1, reviewCount: 0 },
  { slug: 'support', name: 'Support', description: 'Toiles, panneaux, papiers et préparation des fonds', fichesCount: 2, publishedCount: 2, reviewCount: 0 },
  { slug: 'pigment', name: 'Pigment', description: 'Couleurs, transparence, opacité et stabilité lumineuse', fichesCount: 2, publishedCount: 2, reviewCount: 0 },
]

export function AdminCategoriesPage() {
  const [categories] = useState<AdminCategory[]>(adminCategories)
  const [editSlug, setEditSlug] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [message, setMessage] = useState('')

  const startEdit = (cat: AdminCategory) => {
    setEditSlug(cat.slug)
    setEditName(cat.name)
    setMessage('')
  }

  const saveEdit = () => {
    setEditSlug(null)
    setMessage('Catégorie renommée (simulation locale)')
    setTimeout(() => setMessage(''), 2000)
  }

  return (
    <div className="admin-fiches-page">
      <div className="page-header admin-page-header">
        <div className="page-eyebrow">Administration</div>
        <h1 className="page-title">Gestion des <em>catégories</em></h1>
        <p className="page-subtitle">Administration de la taxonomie — créez, renommez et hiérarchisez les catégories qui structurent le catalogue documentaire.</p>
      </div>

      {message && (
        <div className="form-message form-message--success" role="alert">{message}</div>
      )}

      <div className="admin-toolbar">
        <button type="button" className="admin-filter-chip active">
          + Nouvelle catégorie
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Catégorie</th>
            <th>Description</th>
            <th>Fiches total</th>
            <th>Publiées</th>
            <th>En révision</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.slug}>
              <td>
                {editSlug === cat.slug ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="admin-inline-input"
                    autoFocus
                  />
                ) : (
                  <div className="admin-fiche-title">{cat.name}</div>
                )}
              </td>
              <td className="admin-muted">{cat.description}</td>
              <td className="admin-muted">{cat.fichesCount}</td>
              <td className="admin-muted">{cat.publishedCount}</td>
              <td className={`admin-muted ${cat.reviewCount > 0 ? 'admin-warn' : ''}`}>{cat.reviewCount}</td>
              <td>
                <div className="admin-row-actions">
                  {editSlug === cat.slug ? (
                    <>
                      <button type="button" className="admin-row-btn approve" onClick={saveEdit}>✓</button>
                      <button type="button" className="admin-row-btn cancel" onClick={() => setEditSlug(null)}>✕</button>
                    </>
                  ) : (
                    <button type="button" className="admin-row-btn" onClick={() => startEdit(cat)}>Renommer</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}