'use client'

import { useDemoStore } from '@/context/DemoStoreContext'
import { useMemo, useState } from 'react'

export function AdminPeintresPage() {
  const { getAllRegisteredUsers, session } = useDemoStore()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | string>('all')

  const painters = useMemo(() => {
    return getAllRegisteredUsers().map((user) => {
      const initial = (user.name?.charAt(0) ?? '?').toUpperCase()
      const city = user.city || 'Ville inconnue'
      const specialties = user.specialties ?? []
      return {
        id: user.userId,
        initials: initial + (user.name?.split(' ')[1]?.charAt(0) ?? ''),
        avatarBg: '#9d6a3b',
        avatarColor: '#fffdfa',
        name: user.name,
        email: user.email,
        city,
        specialties,
        fiches: 0,
      }
    })
  }, [getAllRegisteredUsers, session])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return painters.filter((row) => {
      if (filter !== 'all' && row.id !== filter) return false
      return (
        !query ||
        row.name.toLowerCase().includes(query) ||
        row.email.toLowerCase().includes(query) ||
        row.specialties.some((s) => s.toLowerCase().includes(query))
      )
    })
  }, [painters, search, filter])

  return (
    <section className="page-content">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Administration · Inscriptions</div>
          <h1 className="page-title">
            Validation des <em>Peintres</em>
          </h1>
          <p className="page-subtitle">Gérez les demandes d'accès — données issues du localStorage (seed + inscriptions).</p>
        </div>
        <div className="page-header-actions">
          <button type="button" className="btn btn-ghost">↓ Exporter CSV</button>
          <button type="button" className="btn btn-primary">✉ Relancer tous</button>
        </div>
      </div>

      <div className="kpi-strip">
        <button type="button" className="kpi-item clickable" onClick={() => setFilter('all')}>
          <div className="kpi-num">{painters.length}</div>
          <div className="kpi-label">Peintres total</div>
          <div className="kpi-delta up">Seed fictif + inscriptions</div>
        </button>
        <button type="button" className="kpi-item clickable" onClick={() => setFilter('none')}>
          <div className="kpi-num">{painters.length}</div>
          <div className="kpi-label">Inscrits localStorage</div>
          <div className="kpi-delta">Données persistées</div>
        </button>
      </div>

      <div className="toolbar">
        <div className="search-bar">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Rechercher par nom, email, spécialité…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table-header">
          <span className="table-result-count">
            <span>{filtered.length}</span> peintres affichés
          </span>
        </div>

        <table>
          <thead>
            <tr>
              <th>Peintre</th>
              <th>Spécialités</th>
              <th>Ville</th>
              <th>Fiches</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id}>
                <td>
                  <div className="peintre-cell">
                    <div className="p-avatar" style={{ background: row.avatarBg, color: row.avatarColor }}>{row.initials}</div>
                    <div>
                      <div className="p-name">{row.name}</div>
                      <div className="p-email">{row.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="spec-tags">
                    {row.specialties.map((s) => (
                      <span key={s} className="spec-tag">{s}</span>
                    ))}
                  </div>
                </td>
                <td><span className="location-cell">{row.city}</span></td>
                <td><span className="fiches-count"><strong>{row.fiches}</strong> fiche{row.fiches !== 1 ? 's' : ''}</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="admin-empty">Aucun peintre trouvé</div>
        )}
      </div>
    </section>
  )
}