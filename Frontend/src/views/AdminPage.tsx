'use client'

import Link from 'next/link'
import { useDemoStore } from '@/context/DemoStoreContext'
import { statusMeta } from '@/types/content'

const recentRows = [
  { initials: 'CL', bg: '#d6b189', fg: '#3f2c22', name: 'Claire Lescure', email: 'claire@email.fr', specialites: ['Huile', 'Portrait'], status: 'En attente', statusClass: 'badge-pending', date: 'Il y a 2h' },
  { initials: 'MR', bg: '#9d6a3b', fg: '#fffdfa', name: 'Marc Renaud', email: 'm.renaud@gmail.com', specialites: ['Aquarelle'], status: 'En attente', statusClass: 'badge-pending', date: 'Il y a 5h' },
  { initials: 'SD', bg: '#4a7c59', fg: '#fffdfa', name: 'Sophie Dumas', email: 'sophie.d@art.fr', specialites: ['Acrylique', 'Abstrait'], status: 'Actif', statusClass: 'badge-active', date: 'Hier' },
  { initials: 'TB', bg: '#5b3221', fg: '#d6b089', name: 'Thomas Brel', email: 't.brel@mail.fr', specialites: ['Sculpture'], status: 'Actif', statusClass: 'badge-active', date: 'Il y a 2j' },
]

export function AdminPage() {
  const {
    getModerationQueue,
    getRoadmapModerationQueue,
    approveFiche,
    rejectFiche,
    approveRoadmap,
    rejectRoadmap,
    fiches,
    roadmaps,
    session,
    resetDemoData,
  } = useDemoStore()

  const moderationQueue = getModerationQueue()
  const roadmapModerationQueue = getRoadmapModerationQueue()
  const publishedCount = fiches.filter((f) => f.status === 'published').length
  const publishedRoadmapCount = roadmaps.filter((r) => r.status === 'published').length
  const totalInReview = moderationQueue.length + roadmapModerationQueue.length

  const today = new Date()
  const currentDate = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(today)
  const currentDay = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(today)
  const capitalizedDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1)

  const kpis = [
    { label: 'Peintres inscrits', value: '247', delta: '▲ +12 ce mois', tone: 'up', icon: '👤' },
    { label: 'En attente validation', value: '7', delta: 'Depuis hier', tone: 'neutral', icon: '⏳' },
    { label: 'Fiches publiées', value: String(publishedCount), delta: '▲ Données simulées', tone: 'up', icon: '◧' },
    { label: 'Contenus en révision', value: String(totalInReview), delta: 'À modérer', tone: 'neutral', icon: '✎' },
  ]

  return (
    <section className="panel active" id="panel-overview">
      <div className="greeting-bar">
        <div>
          <div className="greeting-eyebrow">Tableau de bord</div>
          <h1 className="greeting-title">
            Bonjour, <em>{session?.name ?? 'Administrateur'}</em>
          </h1>
        </div>
        <div className="greeting-date">
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, textAlign: 'right' }}>{currentDate}</div>
          <div style={{ textTransform: 'capitalize', letterSpacing: '0.1em' }}>{capitalizedDay}</div>
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`kpi-card${kpi.label === 'En attente validation' ? ' alert' : kpi.label === 'Contenus en révision' ? ' warn-card' : ''}`}>
            <div className="kpi-label">{kpi.label}</div>
            <div className="kpi-value">{kpi.value}</div>
            <div className={`kpi-delta ${kpi.tone}`}>{kpi.delta}</div>
            <div className="kpi-icon">{kpi.icon}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '1.5px' }}>
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-label">Simulation</div>
              <div className="card-title">Données locales</div>
            </div>
          </div>
          <div className="card-body" style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: 'var(--bone-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
              Les fiches et roadmaps soumises par les peintres passent par « En révision ». Approuvez-les ici pour les rendre visibles sur le site public.
            </p>
            <p style={{ color: 'var(--bone-muted)', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.85rem' }}>
              {publishedRoadmapCount} roadmap{publishedRoadmapCount > 1 ? 's' : ''} publiée{publishedRoadmapCount > 1 ? 's' : ''} · {publishedCount} fiche{publishedCount > 1 ? 's' : ''} publiée{publishedCount > 1 ? 's' : ''}
            </p>
            <button type="button" className="topbar-btn" onClick={resetDemoData}>
              Réinitialiser les données de démo
            </button>
          </div>
        </div>

        <div className="card admin-quick-panel">
          <div className="card" style={{ padding: '1.25rem 1.5rem', border: 'none', borderBottom: '1px solid var(--stroke)' }}>
            <div className="card-label">Accès rapides</div>
            <div className="card-title">Actions prioritaires</div>
          </div>
          <div className="quick-actions">
            <Link href="/admin/peintres" className="quick-action-item">
              <div className="qa-icon">👤</div>
              <div>
                <div className="qa-label">Valider les peintres</div>
                <div className="qa-sub">7 en attente</div>
              </div>
              <span className="qa-badge">Urgent</span>
              <div className="qa-arrow" />
            </Link>
            <a href="#moderation-fiches" className="quick-action-item">
              <div className="qa-icon">◧</div>
              <div>
                <div className="qa-label">Modérer les fiches</div>
                <div className="qa-sub">{moderationQueue.length} soumission{moderationQueue.length > 1 ? 's' : ''}</div>
              </div>
              <div className="qa-arrow" />
            </a>
            <a href="#moderation-roadmaps" className="quick-action-item">
              <div className="qa-icon">🗺</div>
              <div>
                <div className="qa-label">Modérer les roadmaps</div>
                <div className="qa-sub">{roadmapModerationQueue.length} soumission{roadmapModerationQueue.length > 1 ? 's' : ''}</div>
              </div>
              <div className="qa-arrow" />
            </a>
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-label">Dernières inscriptions</div>
              <div className="card-title">Nouveaux peintres</div>
            </div>
          </div>
          <table className="activity-table">
            <thead>
              <tr>
                <th>Peintre</th>
                <th>Spécialités</th>
                <th>Statut</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentRows.map((row) => (
                <tr key={row.name}>
                  <td>
                    <div className="activity-cell">
                      <div className="activity-avatar" style={{ background: row.bg, color: row.fg }}>{row.initials}</div>
                      <div>
                        <div className="activity-name">{row.name}</div>
                        <div className="activity-meta">{row.email}</div>
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
                  <td>
                    <span className={`badge ${row.statusClass}`}>{row.status}</span>
                  </td>
                  <td className="activity-time">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card" id="moderation-fiches">
          <div className="card-header">
            <div>
              <div className="card-label">Modération</div>
              <div className="card-title">Fiches en révision</div>
            </div>
          </div>
          <div className="moderation-list">
            {moderationQueue.length === 0 ? (
              <p className="step-empty" style={{ margin: '1rem 1.5rem' }}>Aucune fiche en attente de modération.</p>
            ) : (
              moderationQueue.map((fiche) => {
                const meta = statusMeta(fiche.status)
                return (
                  <div key={fiche.slug} className="mod-item">
                    <div
                      className="mod-color-swatch"
                      style={{ background: fiche.swatch?.[1] ?? 'var(--ochre)' }}
                    />
                    <div className="mod-info">
                      <div className="mod-title">{fiche.title}</div>
                      <div className="mod-author">{fiche.question}</div>
                      <div className="mod-author">{fiche.category} · {fiche.tool}</div>
                      <div style={{ marginTop: '0.35rem' }}>
                        <span className={`badge ${meta.className}`}>{meta.label}</span>
                      </div>
                    </div>
                    <div className="mod-actions">
                      <button
                        type="button"
                        className="mod-btn approve"
                        title="Approuver"
                        onClick={() => approveFiche(fiche.slug)}
                      >
                        ✓
                      </button>
                      <button
                        type="button"
                        className="mod-btn reject"
                        title="Rejeter"
                        onClick={() => rejectFiche(fiche.slug)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      <div className="card" id="moderation-roadmaps" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <div>
            <div className="card-label">Modération</div>
            <div className="card-title">Roadmaps en révision</div>
          </div>
        </div>
        <div className="moderation-list">
          {roadmapModerationQueue.length === 0 ? (
            <p className="step-empty" style={{ margin: '1rem 1.5rem' }}>Aucune roadmap en attente de modération.</p>
          ) : (
            roadmapModerationQueue.map((roadmap) => {
              const meta = statusMeta(roadmap.status)
              const ficheCount = roadmap.steps.reduce((n, s) => n + s.ficheSlugs.length, 0)
              return (
                <div key={roadmap.slug} className="mod-item">
                  <div className="mod-color-swatch" style={{ background: 'var(--ochre)' }} />
                  <div className="mod-info">
                    <div className="mod-title">{roadmap.title}</div>
                    <div className="mod-author">{roadmap.summary}</div>
                    <div className="mod-author">{roadmap.steps.length} étapes · {ficheCount} fiche{ficheCount > 1 ? 's' : ''} liée{ficheCount > 1 ? 's' : ''}</div>
                    <div style={{ marginTop: '0.35rem' }}>
                      <span className={`badge ${meta.className}`}>{meta.label}</span>
                    </div>
                  </div>
                  <div className="mod-actions">
                    <button
                      type="button"
                      className="mod-btn approve"
                      title="Approuver"
                      onClick={() => approveRoadmap(roadmap.slug)}
                    >
                      ✓
                    </button>
                    <button
                      type="button"
                      className="mod-btn reject"
                      title="Rejeter"
                      onClick={() => rejectRoadmap(roadmap.slug)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
