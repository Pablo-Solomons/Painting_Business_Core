import { useMemo, useState } from 'react'

type PainterRow = {
  id: number
  initials: string
  avatarBg: string
  avatarColor: string
  name: string
  email: string
  location: string
  date: string
  dateRel: string
  specialites: string[]
  fiches: number
  status: 'pending' | 'active' | 'suspended' | 'rejected'
}

const painters: PainterRow[] = [
  { id: 1, initials: 'CL', avatarBg: '#d6b189', avatarColor: '#3f2c22', name: 'Claire Lescure', email: 'claire@email.fr', location: 'Lyon, France', date: '28 mai 2026', dateRel: 'Il y a 2h', specialites: ['Huile', 'Portrait'], fiches: 0, status: 'pending' },
  { id: 2, initials: 'MR', avatarBg: '#9d6a3b', avatarColor: '#fffdfa', name: 'Marc Renaud', email: 'm.renaud@gmail.com', location: 'Paris, France', date: '28 mai 2026', dateRel: 'Il y a 5h', specialites: ['Aquarelle', 'Paysage'], fiches: 0, status: 'pending' },
  { id: 3, initials: 'SD', avatarBg: '#4a7c59', avatarColor: '#fffdfa', name: 'Sophie Dumas', email: 'sophie.d@art.fr', location: 'Bordeaux, France', date: '27 mai 2026', dateRel: 'Hier', specialites: ['Acrylique', 'Abstrait'], fiches: 12, status: 'active' },
  { id: 4, initials: 'JM', avatarBg: '#5b3221', avatarColor: '#d6b189', name: 'Jean-Marc Olivier', email: 'jmo@artelier.net', location: 'Marseille, France', date: '25 mai 2026', dateRel: 'Il y a 3j', specialites: ['Fresque', 'Encaustique'], fiches: 8, status: 'active' },
  { id: 5, initials: 'AB', avatarBg: '#8c2a2a', avatarColor: '#fffdfa', name: 'Aurélie Bonnet', email: 'aurelie.bonnet@free.fr', location: 'Nantes, France', date: '22 mai 2026', dateRel: 'Il y a 6j', specialites: ['Dessin', 'Graphite'], fiches: 0, status: 'rejected' },
  { id: 6, initials: 'PL', avatarBg: '#6a7662', avatarColor: '#fffdfa', name: 'Pierre Lavigne', email: 'p.lavigne@atelierpl.fr', location: 'Strasbourg, France', date: '20 mai 2026', dateRel: 'Il y a 8j', specialites: ['Huile', 'Nature morte'], fiches: 23, status: 'active' },
  { id: 7, initials: 'MH', avatarBg: '#8c5a1a', avatarColor: '#fffdfa', name: 'Marie-Hélène Vu', email: 'mhvu@studio-couleur.fr', location: 'Paris, France', date: '18 mai 2026', dateRel: 'Il y a 10j', specialites: ['Aquarelle', 'Botaniques'], fiches: 5, status: 'suspended' },
  { id: 8, initials: 'GF', avatarBg: '#3f2c22', avatarColor: '#d6b189', name: 'Guillaume Ferrand', email: 'g.ferrand@atelier.com', location: 'Toulouse, France', date: '15 mai 2026', dateRel: 'Il y a 13j', specialites: ['Sculpture', 'Modelage'], fiches: 0, status: 'pending' },
  { id: 9, initials: 'NP', avatarBg: '#d6b189', avatarColor: '#3f2c22', name: 'Nathalie Perrin', email: 'nperrin@colorlabs.fr', location: 'Grenoble, France', date: '14 mai 2026', dateRel: 'Il y a 14j', specialites: ['Couleur', 'Pigments'], fiches: 31, status: 'active' },
  { id: 10, initials: 'TC', avatarBg: '#201712', avatarColor: '#9d6a3b', name: 'Thomas Collet', email: 't.collet@gmail.com', location: 'Lille, France', date: '12 mai 2026', dateRel: 'Il y a 16j', specialites: ['Gravure', 'Linogravure'], fiches: 0, status: 'pending' },
  { id: 11, initials: 'EP', avatarBg: '#e6d9c7', avatarColor: '#5b3221', name: 'Élise Pontier', email: 'elise@pontierart.com', location: 'Nice, France', date: '10 mai 2026', dateRel: 'Il y a 18j', specialites: ['Pastel', 'Paysage'], fiches: 7, status: 'active' },
  { id: 12, initials: 'RB', avatarBg: '#9d6a3b', avatarColor: '#f8f1e7', name: 'Raphaël Bouvier', email: 'raphael.b@studio.fr', location: 'Montpellier, France', date: '8 mai 2026', dateRel: 'Il y a 20j', specialites: ['Tempera', 'Icônes'], fiches: 0, status: 'pending' },
  { id: 13, initials: 'LS', avatarBg: '#7a4a1a', avatarColor: '#fffdfa', name: 'Lucie Saunier', email: 'lucie.s@ateliercouleurs.fr', location: 'Rennes, France', date: '5 mai 2026', dateRel: 'Il y a 23j', specialites: ['Gouache', 'Illustration'], fiches: 18, status: 'active' },
  { id: 14, initials: 'HD', avatarBg: '#4a7c59', avatarColor: '#fffdfa', name: 'Hugo Desjardins', email: 'h.desjardins@art.ca', location: 'Québec, Canada', date: '2 mai 2026', dateRel: 'Il y a 26j', specialites: ['Huile', 'Marine'], fiches: 4, status: 'suspended' },
]

function statusLabel(status: PainterRow['status']) {
  if (status === 'pending') return 'En attente'
  if (status === 'active') return 'Actif'
  if (status === 'suspended') return 'Suspendu'
  return 'Rejeté'
}

function badgeClass(status: PainterRow['status']) {
  if (status === 'pending') return 'badge-pending'
  if (status === 'active') return 'badge-active'
  if (status === 'suspended') return 'badge-suspended'
  return 'badge-rejected'
}

export function AdminPeintresPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | PainterRow['status']>('all')
  const [sort, setSort] = useState<'date-desc' | 'date-asc' | 'name-asc' | 'fiches-desc'>('date-desc')

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    const list = painters.filter((row) => {
      const matchesFilter = filter === 'all' ? true : row.status === filter
      const matchesSearch =
        !query ||
        row.name.toLowerCase().includes(query) ||
        row.email.toLowerCase().includes(query) ||
        row.location.toLowerCase().includes(query) ||
        row.specialites.some((specialite) => specialite.toLowerCase().includes(query))
      return matchesFilter && matchesSearch
    })

    return list.sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'fiches-desc') return b.fiches - a.fiches
      if (sort === 'date-asc') return a.id - b.id
      return b.id - a.id
    })
  }, [search, filter, sort])

  const total = painters.length
  const pending = painters.filter((row) => row.status === 'pending').length
  const active = painters.filter((row) => row.status === 'active').length
  const suspended = painters.filter((row) => row.status === 'suspended' || row.status === 'rejected').length

  return (
    <section className="page-content">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Administration · Inscriptions</div>
          <h1 className="page-title">
            Validation des <em>Peintres</em>
          </h1>
          <p className="page-subtitle">Gérez les demandes d'accès, validez ou rejetez les inscriptions en attente.</p>
        </div>
        <div className="page-header-actions">
          <button type="button" className="btn btn-ghost">
            ↓ Exporter CSV
          </button>
          <button type="button" className="btn btn-primary">
            ✉ Relancer tous
          </button>
        </div>
      </div>

      <div className="kpi-strip">
        <button type="button" className="kpi-item clickable" onClick={() => setFilter('all')}>
          <div className="kpi-num" id="kpi-total">{total}</div>
          <div className="kpi-label">Peintres total</div>
          <div className="kpi-delta up">▲ +12 ce mois</div>
        </button>
        <button type="button" className="kpi-item clickable" onClick={() => setFilter('pending')}>
          <div className="kpi-num warn-color" id="kpi-pending">{pending}</div>
          <div className="kpi-label">En attente</div>
          <div className="kpi-delta alert">⚑ À traiter</div>
        </button>
        <button type="button" className="kpi-item clickable" onClick={() => setFilter('active')}>
          <div className="kpi-num success-color" id="kpi-active">{active}</div>
          <div className="kpi-label">Actifs</div>
          <div className="kpi-delta up">▲ +8 ce mois</div>
        </button>
        <button type="button" className="kpi-item clickable" onClick={() => setFilter('suspended')}>
          <div className="kpi-num" id="kpi-suspended">{suspended}</div>
          <div className="kpi-label">Suspendus / Rejetés</div>
          <div className="kpi-delta">Dont 1 contestation</div>
        </button>
      </div>

      <div className="toolbar">
        <div className="search-bar">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            id="search-input"
            placeholder="Rechercher par nom, email, spécialité…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="filter-chips">
          <button type="button" className={`filter-chip${filter === 'all' ? ' active' : ''}`} onClick={() => setFilter('all')}>
            Tous
          </button>
          <button type="button" className={`filter-chip chip-pending${filter === 'pending' ? ' active' : ''}`} onClick={() => setFilter('pending')}>
            En attente
          </button>
          <button type="button" className={`filter-chip chip-active${filter === 'active' ? ' active' : ''}`} onClick={() => setFilter('active')}>
            Actifs
          </button>
          <button type="button" className={`filter-chip chip-suspended${filter === 'suspended' ? ' active' : ''}`} onClick={() => setFilter('suspended')}>
            Suspendus
          </button>
          <button type="button" className={`filter-chip chip-suspended${filter === 'rejected' ? ' active' : ''}`} onClick={() => setFilter('rejected')}>
            Rejetés
          </button>
        </div>

        <div className="toolbar-right">
          <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}>
            <option value="date-desc">↓ Plus récent</option>
            <option value="date-asc">↑ Plus ancien</option>
            <option value="name-asc">A→Z Nom</option>
            <option value="fiches-desc">↓ Fiches</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="bulk-bar" id="bulk-bar">
          <span className="bulk-bar-count" id="bulk-count">0 sélectionné(s)</span>
          <button type="button" className="bulk-btn">✓ Valider tout</button>
          <button type="button" className="bulk-btn danger">✕ Rejeter tout</button>
          <button type="button" className="bulk-btn">🔒 Suspendre tout</button>
          <span className="bulk-cancel">✕ Annuler</span>
        </div>

        <div className="table-header">
          <span className="table-result-count">
            <span id="result-count">{filtered.length}</span> peintres affichés
          </span>
        </div>

        <table>
          <thead>
            <tr>
              <th className="col-check">
                <input type="checkbox" className="cb" id="cb-all" />
              </th>
              <th>Peintre</th>
              <th>Spécialités</th>
              <th>Localisation</th>
              <th>Fiches</th>
              <th>Inscrit(e)</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="peintres-tbody">
            {filtered.map((row) => (
              <tr key={row.id}>
                <td className="col-check">
                  <input type="checkbox" className="cb row-cb" />
                </td>
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
                    {row.specialites.map((specialite) => (
                      <span key={specialite} className="spec-tag">{specialite}</span>
                    ))}
                  </div>
                </td>
                <td><span className="location-cell">{row.location}</span></td>
                <td>
                  <span className="fiches-count"><strong>{row.fiches}</strong> fiche{row.fiches !== 1 ? 's' : ''}</span>
                </td>
                <td>
                  <span className="date-cell">
                    {row.date}
                    <span className="relative">{row.dateRel}</span>
                  </span>
                </td>
                <td>
                  <span className={`badge ${badgeClass(row.status)}`}>{statusLabel(row.status)}</span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button type="button" className="action-btn detail" title="Voir le détail">◉ <span className="tooltip">Détail</span></button>
                    {row.status === 'pending' ? (
                      <>
                        <button type="button" className="action-btn validate" title="Valider">✓ <span className="tooltip">Valider</span></button>
                        <button type="button" className="action-btn reject" title="Rejeter">✕ <span className="tooltip">Rejeter</span></button>
                      </>
                    ) : null}
                    {row.status === 'active' ? (
                      <button type="button" className="action-btn suspend" title="Suspendre">🔒 <span className="tooltip">Suspendre</span></button>
                    ) : null}
                    {row.status === 'suspended' || row.status === 'rejected' ? (
                      <button type="button" className="action-btn validate" title="Réintégrer">↺ <span className="tooltip">Réintégrer</span></button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="empty-state" id="empty-state">
          <div className="empty-icon">👤</div>
          <div className="empty-title">Aucun peintre trouvé</div>
          <div className="empty-sub">Modifiez vos filtres ou votre recherche</div>
        </div>

        <div className="pagination" id="pagination">
          <span className="pag-info" id="pag-info">Affichage 1–10 sur {filtered.length}</span>
          <div className="pag-controls" id="pag-controls">
            <button type="button" className="pag-btn active">1</button>
            <button type="button" className="pag-btn">2</button>
          </div>
        </div>
      </div>
    </section>
  )
}
