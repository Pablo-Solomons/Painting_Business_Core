import { Link } from 'react-router-dom'

const kpis = [
  { label: 'Peintres inscrits', value: '247', delta: '▲ +12 ce mois', tone: 'up', icon: '👤' },
  { label: 'En attente validation', value: '7', delta: 'Depuis hier', tone: 'neutral', icon: '⏳' },
  { label: 'Fiches publiées', value: '1 284', delta: '▲ +38 ce mois', tone: 'up', icon: '◧' },
  { label: 'Fiches en révision', value: '3', delta: 'À modérer', tone: 'neutral', icon: '✎' },
]

const recentRows = [
  { initials: 'CL', bg: '#d6b189', fg: '#3f2c22', name: 'Claire Lescure', email: 'claire@email.fr', specialites: ['Huile', 'Portrait'], status: 'En attente', statusClass: 'badge-pending', date: 'Il y a 2h' },
  { initials: 'MR', bg: '#9d6a3b', fg: '#fffdfa', name: 'Marc Renaud', email: 'm.renaud@gmail.com', specialites: ['Aquarelle'], status: 'En attente', statusClass: 'badge-pending', date: 'Il y a 5h' },
  { initials: 'SD', bg: '#4a7c59', fg: '#fffdfa', name: 'Sophie Dumas', email: 'sophie.d@art.fr', specialites: ['Acrylique', 'Abstrait'], status: 'Actif', statusClass: 'badge-active', date: 'Hier' },
  { initials: 'TB', bg: '#5b3221', fg: '#d6b189', name: 'Thomas Brel', email: 't.brel@mail.fr', specialites: ['Sculpture'], status: 'Actif', statusClass: 'badge-active', date: 'Il y a 2j' },
]

const moderationRows = [
  { title: 'Bleu Outremer', author: 'par Antoine Morel · PB29', badge: 'En révision', badgeClass: 'badge-review', color: '#3f6f9e' },
  { title: 'Vermillon de Cadmium', author: 'par Hélène Cours · PR108', badge: 'Signalée', badgeClass: 'badge-danger', color: '#c74d2d' },
  { title: 'Vert Céladon', author: 'par Lucie Ferrand · PG36', badge: 'En révision', badgeClass: 'badge-review', color: '#84a58a' },
]

export function AdminPage() {
  const today = new Date()
  const currentDate = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(today)
  const currentDay = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(today)
  const capitalizedDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1)

  return (
    <section className="panel active" id="panel-overview">
      <div className="greeting-bar">
        <div>
          <div className="greeting-eyebrow">Tableau de bord</div>
          <h1 className="greeting-title">
            Bonjour, <em>Administrateur</em>
          </h1>
        </div>
        <div className="greeting-date">
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, textAlign: 'right' }}>{currentDate}</div>
          <div style={{ textTransform: 'capitalize', letterSpacing: '0.1em' }}>{capitalizedDay}</div>
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`kpi-card${kpi.label === 'En attente validation' ? ' alert' : kpi.label === 'Fiches en révision' ? ' warn-card' : ''}`}>
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
              <div className="card-label">Statistiques</div>
              <div className="card-title">Évolution des inscriptions</div>
            </div>
            <div className="chart-period-btns">
              <button type="button" className="period-btn active">7j</button>
              <button type="button" className="period-btn">30j</button>
              <button type="button" className="period-btn">3m</button>
            </div>
          </div>
          <div className="chart-container">
            <div className="chart-bars">
              <span className="chart-bar" style={{ width: '72%' }} />
              <span className="chart-bar" style={{ width: '54%' }} />
              <span className="chart-bar" style={{ width: '83%' }} />
              <span className="chart-bar" style={{ width: '41%' }} />
            </div>
          </div>
        </div>

        <div className="card admin-quick-panel">
          <div className="card" style={{ padding: '1.25rem 1.5rem', border: 'none', borderBottom: '1px solid var(--stroke)' }}>
            <div className="card-label">Accès rapides</div>
            <div className="card-title">Actions prioritaires</div>
          </div>
          <div className="quick-actions">
            <Link to="/admin/peintres" className="quick-action-item">
              <div className="qa-icon">👤</div>
              <div>
                <div className="qa-label">Valider les peintres</div>
                <div className="qa-sub">7 en attente</div>
              </div>
              <span className="qa-badge">Urgent</span>
              <div className="qa-arrow" />
            </Link>
            <a href="#" className="quick-action-item">
              <div className="qa-icon">◧</div>
              <div>
                <div className="qa-label">Modérer les fiches</div>
                <div className="qa-sub">3 soumissions</div>
              </div>
              <div className="qa-arrow" />
            </a>
            <a href="#" className="quick-action-item">
              <div className="qa-icon">⚑</div>
              <div>
                <div className="qa-label">Alertes modération</div>
                <div className="qa-sub">2 signalements</div>
              </div>
              <div className="qa-arrow" />
            </a>
            <a href="#" className="quick-action-item">
              <div className="qa-icon">📊</div>
              <div>
                <div className="qa-label">Exporter les données</div>
                <div className="qa-sub">CSV / JSON</div>
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
            <a href="#" className="card-action">
              Tout voir →
            </a>
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

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-label">Modération</div>
              <div className="card-title">Fiches en révision</div>
            </div>
            <a href="#" className="card-action">
              Tout voir →
            </a>
          </div>
          <div className="moderation-list">
            {moderationRows.map((row) => (
              <div key={row.title} className="mod-item">
                <div className="mod-color-swatch" style={{ background: row.color }} />
                <div className="mod-info">
                  <div className="mod-title">{row.title}</div>
                  <div className="mod-author">{row.author}</div>
                  <div style={{ marginTop: '0.35rem' }}>
                    <span className={`badge ${row.badgeClass}`}>{row.badge}</span>
                  </div>
                </div>
                <div className="mod-actions">
                  <button type="button" className="mod-btn view" title="Voir">👁</button>
                  <button type="button" className="mod-btn approve" title="Approuver">✓</button>
                  <button type="button" className="mod-btn reject" title="Rejeter">✕</button>
                </div>
              </div>
            ))}
          </div>

          <div className="admin-alerts">
            <div className="card-label" style={{ margin: '1.25rem 0 0.75rem' }}>Alertes récentes</div>
            <div className="admin-alert">
              <span className="admin-alert-icon danger">⚑</span>
              <div>
                <strong>Contenu dupliqué détecté</strong>
                <span> — "Bleu de Prusse" par 2 auteurs</span>
                <div className="admin-alert-time">Il y a 3h</div>
              </div>
            </div>
            <div className="admin-alert">
              <span className="admin-alert-icon warn">⚐</span>
              <div>
                <strong>Compte suspect</strong>
                <span> — 14 fiches en 1h par un même utilisateur</span>
                <div className="admin-alert-time">Il y a 1j</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
