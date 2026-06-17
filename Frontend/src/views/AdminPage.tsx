'use client'

import Link from 'next/link'
import { useDemoStore } from '@/context/DemoStoreContext'
import { statusMeta } from '@/types/content'

const recentRows = [
  { initials: 'CL', bg: '#d6b189', fg: '#3f2c22', name: 'Claire Lescure', email: 'claire@email.fr', specialites: ['Huile', 'Portrait'], status: 'En attente', statusClass: 'badge-pending' },
  { initials: 'MR', bg: '#9d6a3b', fg: '#fffdfa', name: 'Marc Renaud', email: 'm.renaud@gmail.com', specialites: ['Aquarelle'], status: 'En attente', statusClass: 'badge-pending' },
  { initials: 'SD', bg: '#4a7c59', fg: '#fffdfa', name: 'Sophie Dumas', email: 'sophie.d@art.fr', specialites: ['Acrylique', 'Abstrait'], status: 'Actif', statusClass: 'badge-active' },
  { initials: 'TB', bg: '#5b3221', fg: '#d6b089', name: 'Thomas Brel', email: 't.brel@mail.fr', specialites: ['Sculpture'], status: 'Actif', statusClass: 'badge-active' },
]

const alertsList = [
  { icon: '🚩', text: 'Fiche "Glacis" signalée pour contenu inexact', time: 'Il y a 1h', urgent: true },
  { icon: '⚠️', text: 'Compte "Marc Renaud" — informations suspectes', time: 'Il y a 3h', urgent: true },
  { icon: '📋', text: 'Roadmap "Initiation huile" — 3 fiches manquantes', time: 'Hier', urgent: false },
]

const messagesList = [
  { from: 'Claire Lescure', text: 'Bonjour, j\'aimerais savoir comment valider mon compte…', time: 'Il y a 2h', unread: true },
  { from: 'Sophie Dumas', text: 'Merci pour la validation rapide de mes fiches !', time: 'Hier', unread: false },
  { from: 'Thomas Brel', text: 'Question sur la catégorie "Sculpture"…', time: 'Il y a 3j', unread: false },
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
    updateProfile,
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

  const activePanel = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('panel') : null

  if (activePanel === 'alertes') {
    return (
      <section className="panel active" id="panel-overview">
        <div className="greeting-bar" style={{ marginBottom: '1.5rem' }}>
          <div>
            <div className="greeting-eyebrow">Modération</div>
            <h1 className="greeting-title">Alertes <em>et signalements</em></h1>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Signalements récents</div></div>
          <div className="card-body" style={{ padding: '1.25rem 1.5rem' }}>
            <div className="moderation-list">
              {alertsList.map((alert, idx) => (
                <div key={idx} className="mod-item">
                  <div className="mod-color-swatch" style={{ background: alert.urgent ? '#8c1a1a' : 'var(--ochre)' }}>{alert.icon}</div>
                  <div className="mod-info">
                    <div className="mod-title">{alert.text}</div>
                    <div className="mod-author">{alert.time}</div>
                  </div>
                  <div className="mod-actions">
                    <button type="button" className="mod-btn approve" title="Traiter">✓</button>
                    <button type="button" className="mod-btn reject" title="Ignorer">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (activePanel === 'messages') {
    return (
      <section className="panel active" id="panel-overview">
        <div className="greeting-bar" style={{ marginBottom: '1.5rem' }}>
          <div>
            <div className="greeting-eyebrow">Communication</div>
            <h1 className="greeting-title">Messages <em>récents</em></h1>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Boîte de réception</div></div>
          <div className="card-body" style={{ padding: '1.25rem 1.5rem' }}>
            <div className="moderation-list">
              {messagesList.map((msg, idx) => (
                <div key={idx} className="mod-item">
                  <div className="mod-color-swatch" style={{ background: msg.unread ? 'var(--ochre)' : 'var(--stroke)' }}>{msg.unread ? '●' : '○'}</div>
                  <div className="mod-info">
                    <div className="mod-title">{msg.from}</div>
                    <div className="mod-author">{msg.text}</div>
                    <div className="mod-author" style={{ fontSize: '0.68rem' }}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (activePanel === 'config') {
    return (
      <section className="panel active" id="panel-overview">
        <div className="greeting-bar" style={{ marginBottom: '1.5rem' }}>
          <div>
            <div className="greeting-eyebrow">Paramètres</div>
            <h1 className="greeting-title">Configuration <em>de la plateforme</em></h1>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Paramètres généraux</div></div>
          <div className="card-body" style={{ padding: '1.5rem' }}>
            <div className="field-group">
              <label className="field-label">Nom de la plateforme</label>
              <input className="field-input" type="text" defaultValue="ArtPlastique" />
            </div>
            <div className="field-group">
              <label className="field-label">Description</label>
              <textarea className="field-textarea" defaultValue="La référence francophone pour les arts plastiques — fiches de connaissance, roadmaps structurées et communauté de peintres." style={{ minHeight: 80 }} />
            </div>
            <div className="field-group">
              <label className="field-label">Nombre max de fiches par peintre</label>
              <input className="field-input" type="number" defaultValue="50" />
            </div>
            <button type="button" className="topbar-btn" style={{ marginTop: '0.75rem' }}>Enregistrer (simulation)</button>
          </div>
        </div>
      </section>
    )
  }

  if (activePanel === 'profil') {
    return (
      <section className="panel active" id="panel-overview">
        <div className="greeting-bar" style={{ marginBottom: '1.5rem' }}>
          <div>
            <div className="greeting-eyebrow">Compte</div>
            <h1 className="greeting-title">Mon <em>profil</em></h1>
          </div>
        </div>
        <div className="editor-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', marginTop: '1rem' }}>
          <div>
            <div className="editor-section">
              <div className="editor-section-head"><span className="editor-section-label">Informations personnelles</span></div>
              <div className="editor-section-body">
                <div className="field-row"><div className="field-group"><label className="field-label">Nom complet</label><input className="field-input" type="text" value={session?.name ?? ''} onChange={(e) => updateProfile({ name: e.target.value })} /></div><div className="field-group"><label className="field-label">Nom d'utilisateur</label><input className="field-input" type="text" value={session?.handle ?? ''} onChange={(e) => updateProfile({ handle: e.target.value })} /></div></div>
                <div className="field-row"><div className="field-group"><label className="field-label">Email</label><input className="field-input" type="email" value={session?.email ?? ''} onChange={(e) => updateProfile({ email: e.target.value })} /></div><div className="field-group"><label className="field-label">Ville</label><input className="field-input" type="text" value={session?.city ?? ''} onChange={(e) => updateProfile({ city: e.target.value })} /></div></div>
                <div className="field-group"><label className="field-label">Expertise</label><input className="field-input" type="text" value={session?.expertise ?? ''} onChange={(e) => updateProfile({ expertise: e.target.value })} /></div>
                <div className="field-group"><label className="field-label">Bio</label><textarea className="field-textarea" value={session?.bio ?? ''} onChange={(e) => updateProfile({ bio: e.target.value })} /></div>
              </div>
            </div>
            <div className="editor-section">
              <div className="editor-section-head"><span className="editor-section-label">Spécialités</span></div>
              <div className="editor-section-body"><div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>{(session?.specialties ?? ['📋 Modération']).map((item, idx) => <span key={item} className={`discipline-chip${idx < 2 ? ' selected' : ''}`}>{item}</span>)}</div></div>
            </div>
          </div>
          <div>
            <div className="sidebar-card"><div className="sidebar-card-head">Sauvegarder</div><div className="sidebar-card-body"><button type="button" className="publish-btn" onClick={() => { /* auto-saved */ }}>✓ Modifications auto-sauvegardées</button></div></div>
          </div>
        </div>
      </section>
    )
  }

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
            <Link href="/admin/fiches" className="quick-action-item">
              <div className="qa-icon">◧</div>
              <div>
                <div className="qa-label">Modérer les fiches</div>
                <div className="qa-sub">{moderationQueue.length} soumission{moderationQueue.length > 1 ? 's' : ''}</div>
              </div>
              <div className="qa-arrow" />
            </Link>
            <Link href="/admin/roadmaps" className="quick-action-item">
              <div className="qa-icon">🗺</div>
              <div>
                <div className="qa-label">Modérer les roadmaps</div>
                <div className="qa-sub">{roadmapModerationQueue.length} soumission{roadmapModerationQueue.length > 1 ? 's' : ''}</div>
              </div>
              <div className="qa-arrow" />
            </Link>
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="card" id="peintres-recents">
          <div className="card-header">
            <div>
              <div className="card-label">Dernières inscriptions</div>
              <div className="card-title">Nouveaux peintres</div>
            </div>
            <Link href="/admin/peintres" className="card-action" style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ochre)' }}>Voir tout →</Link>
          </div>
          <table className="activity-table">
            <thead>
              <tr>
                <th>Peintre</th>
                <th>Spécialités</th>
                <th>Statut</th>
                <th>Action</th>
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
                  <td>
                    {row.status === 'En attente' && (
                      <div className="admin-row-actions" style={{ gap: '0.35rem' }}>
                        <button type="button" className="admin-row-btn approve" title="Valider">✓</button>
                        <button type="button" className="admin-row-btn reject" title="Rejeter">✕</button>
                      </div>
                    )}
                  </td>
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
                    <div className="mod-color-swatch" style={{ background: fiche.swatch?.[1] ?? 'var(--ochre)' }} />
                    <div className="mod-info">
                      <div className="mod-title">{fiche.title}</div>
                      <div className="mod-author">{fiche.question}</div>
                      <div className="mod-author">{fiche.category} · {fiche.tool}</div>
                      <div style={{ marginTop: '0.35rem' }}>
                        <span className={`badge ${meta.className}`}>{meta.label}</span>
                      </div>
                    </div>
                    <div className="mod-actions">
                      <button type="button" className="mod-btn approve" title="Approuver" onClick={() => approveFiche(fiche.slug)}>✓</button>
                      <button type="button" className="mod-btn reject" title="Rejeter" onClick={() => rejectFiche(fiche.slug)}>✕</button>
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
                    <button type="button" className="mod-btn approve" title="Approuver" onClick={() => approveRoadmap(roadmap.slug)}>✓</button>
                    <button type="button" className="mod-btn reject" title="Rejeter" onClick={() => rejectRoadmap(roadmap.slug)}>✕</button>
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