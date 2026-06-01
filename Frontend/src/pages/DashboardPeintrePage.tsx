import { useMemo, useState } from 'react'
import { PainterShell } from '../components/PainterShell'

const ficheRows = [
  { title: 'Bleu de Prusse', code: 'PB27', swatches: ['#1a3a5c', '#2a5c8a', '#3d7aad', '#1a2d44'], category: 'Huile · Acryl', status: '● Publié', statusClass: 'badge-published', views: '892', modified: 'Auj. 14h' },
  { title: 'Jaune de Naples', code: 'PY41', swatches: ['#d4a847', '#c8922a', '#b07820', '#e8c870'], category: 'Huile', status: '◐ Révision', statusClass: 'badge-review', views: '541', modified: 'Hier 09h' },
  { title: 'Alizarine Cramoisie', code: 'PR83', swatches: ['#8c1a1a', '#a02020', '#c43030', '#6b1010'], category: 'Tous médiums', status: '● Publié', statusClass: 'badge-published', views: '728', modified: '3 mai' },
  { title: 'Terre de Sienne', code: 'PBr7', swatches: ['#7a4a1a', '#9a6020', '#b87830', '#5a3010'], category: 'Aquarelle', status: '○ Brouillon', statusClass: 'badge-draft', views: '—', modified: '30 avr.' },
  { title: 'Vert Émeraude', code: 'PG18', swatches: ['#2a6644', '#3d8c5c', '#4aaa70', '#1a4a30'], category: 'Huile · Aqua.', status: '● Publié', statusClass: 'badge-published', views: '384', modified: '28 avr.' },
  { title: 'Blanc de Titane', code: 'PW6', swatches: ['#f5f0e8', '#e8e0d0', '#d8cfc0', '#ffffff'], category: 'Acrylique', status: '○ Brouillon', statusClass: 'badge-draft', views: '—', modified: '25 avr.' },
]

const roadmapCards = [
  { num: '01', title: "Peinture à l'huile", desc: 'Du dessin préparatoire à la finition vernissée, pour débutants et intermédiaires.', progress: 80, steps: '8 / 10 étapes', badge: '● Publié', badgeClass: 'badge-published' },
  { num: '02', title: 'Aquarelle débutant', desc: "Pigments granuleux, contrôle de l'eau, lavis et réserves.", progress: 60, steps: '6 / 10 étapes', badge: '◐ Révision', badgeClass: 'badge-review' },
  { num: '03', title: 'Théorie des couleurs', desc: 'Cercle chromatique, harmonies, contrastes et mélanges en pratique.', progress: 30, steps: '3 / 10 étapes', badge: '○ Brouillon', badgeClass: 'badge-draft' },
]

const notifications = [
  { icon: '👁', title: 'Bleu de Prusse', strong: '892 vues', sub: 'Votre fiche la plus populaire ce mois', time: 'Il y a 2h', unread: true },
  { icon: '⭑', title: '47 personnes', strong: 'ont ajouté vos fiches en favoris cette semaine', sub: 'En hausse de 28% vs semaine dernière', time: 'Hier', unread: true },
  { icon: '✔', title: 'Votre fiche Alizarine Cramoisie', strong: 'a été approuvée par la modération', sub: 'Elle est maintenant visible publiquement', time: 'Il y a 2j', unread: true },
  { icon: '💬', title: 'Nouveau commentaire sur Jaune de Naples', strong: '', sub: '« Merci pour les infos sur la toxicité, très utile ! »', time: 'Il y a 3j', unread: false },
  { icon: '🏅', title: 'Vous avez débloqué le badge', strong: '"Artisan confirmé"', sub: 'Score contributeur atteint : 72 points', time: 'Il y a 5j', unread: false },
]

const topFiches = [
  { color: '#1a3a5c', name: 'Bleu de Prusse', views: '892 vues' },
  { color: '#8c1a1a', name: 'Alizarine Cramoisie', views: '728 vues' },
  { color: '#d4a847', name: 'Jaune de Naples', views: '541 vues' },
  { color: '#2a6644', name: 'Vert Émeraude', views: '384 vues' },
  { color: '#7a4a1a', name: 'Terre de Sienne', views: '271 vues' },
]

const stats = [
  { label: 'Fiches publiées', value: '24', delta: '↑ +3 ce mois', tone: '' },
  { label: 'Vues totales', value: '4 820', delta: '↑ +12% vs mois dernier', tone: '' },
  { label: 'Favoris reçus', value: '317', delta: '↑ +28 cette semaine', tone: '' },
  { label: 'Roadmaps actives', value: '3', delta: '— En cours de révision', tone: 'down' },
]

export function DashboardPeintrePage() {
  const [activePanel, setActivePanel] = useState('overview')
  const [search, setSearch] = useState('')

  const filteredFiches = useMemo(
    () => ficheRows.filter((row) => row.title.toLowerCase().includes(search.toLowerCase()) || row.code.toLowerCase().includes(search.toLowerCase()) || row.category.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  return (
    <PainterShell activePanel={activePanel} onNavigate={setActivePanel}>
      <section className={`panel ${activePanel === 'overview' ? 'active' : ''}`} id="panel-overview">
        <div className="overview-welcome">
          <div className="welcome-text">
            <div className="welcome-eyebrow">Espace peintre</div>
            <h1 className="welcome-title">
              Bonjour, <em>Marie.</em>
            </h1>
            <div className="welcome-date">Mardi 6 mai 2025 — Voici un aperçu de votre activité</div>
          </div>
        </div>

        <div className="stats-row">
          {stats.map((item) => (
            <div key={item.label} className="stat-card">
              <div className="stat-label">{item.label}</div>
              <div className="stat-value">{item.value}</div>
              <div className={`stat-delta${item.tone === 'down' ? ' down' : ''}`}>{item.delta}</div>
            </div>
          ))}
        </div>

        <div className="overview-grid">
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-label">Historique</div>
                <div className="card-title">Activité récente</div>
              </div>
              <a href="#" className="card-action">Tout voir</a>
            </div>
            <div className="card-body">
              <div className="activity-list">
                <div className="activity-item"><div className="activity-dot green" /><div className="activity-text">Fiche <strong>Bleu de Prusse</strong> publiée avec succès</div><div className="activity-time">Il y a 2h</div></div>
                <div className="activity-item"><div className="activity-dot" /><div className="activity-text">Roadmap <strong>Aquarelle débutant</strong> — étape 3 ajoutée</div><div className="activity-time">Hier</div></div>
                <div className="activity-item"><div className="activity-dot" /><div className="activity-text">Fiche <strong>Jaune de Naples</strong> mise à jour (toxicité)</div><div className="activity-time">Il y a 3j</div></div>
                <div className="activity-item"><div className="activity-dot green" /><div className="activity-text">Brouillon <strong>Terre de Sienne naturelle</strong> enregistré</div><div className="activity-time">Il y a 4j</div></div>
                <div className="activity-item"><div className="activity-dot grey" /><div className="activity-text">Fiche <strong>Alizarine Cramoisie</strong> envoyée en révision</div><div className="activity-time">Il y a 5j</div></div>
              </div>
            </div>
          </div>

          <div>
            <div className="card" style={{ marginBottom: '1.25rem' }}>
              <div className="card-header">
                <div>
                  <div className="card-label">Créer</div>
                  <div className="card-title">Actions rapides</div>
                </div>
              </div>
              <div className="quick-actions">
                <button type="button" className="qa-btn" onClick={() => setActivePanel('editeur')}>
                  <span className="qa-icon">🎨</span>
                  <div><div>Nouvelle fiche pigment</div><div className="qa-desc">Couleur, opacité, résistance lumière…</div></div>
                  <div className="qa-arrow" />
                </button>
                <button type="button" className="qa-btn" onClick={() => setActivePanel('roadmaps')}>
                  <span className="qa-icon">🗺</span>
                  <div><div>Créer une roadmap</div><div className="qa-desc">Parcours guidé par discipline</div></div>
                  <div className="qa-arrow" />
                </button>
                <button type="button" className="qa-btn">
                  <span className="qa-icon">📥</span>
                  <div><div>Importer un lot</div><div className="qa-desc">CSV · 50 fiches max</div></div>
                  <div className="qa-arrow" />
                </button>
              </div>
            </div>

            <div className="progress-card">
              <div className="progress-title">Score contributeur</div>
              <div className="progress-score">72</div>
              <div className="progress-label">sur 100 — Niveau Artisan</div>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" />
              </div>
              <div className="progress-bar-label">28 points pour "Maître"</div>
            </div>
          </div>
        </div>
      </section>

      <section className={`panel ${activePanel === 'fiches' ? 'active' : ''}`} id="panel-fiches">
        <div className="section-head">
          <div className="section-eyebrow">Bibliothèque</div>
          <h2 className="section-title-main">Mes <em>fiches techniques</em></h2>
        </div>

        <div className="toolbar">
          <div className="search-input">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: 'var(--bone-muted)', flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input type="text" placeholder="Rechercher une fiche…" value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          <select className="filter-select"><option>Tous les statuts</option><option>Publié</option><option>Brouillon</option><option>En révision</option></select>
          <select className="filter-select"><option>Toutes catégories</option><option>Huile</option><option>Aquarelle</option><option>Acrylique</option></select>
          <button type="button" className="topbar-btn" onClick={() => setActivePanel('editeur')}>+ Nouvelle fiche</button>
        </div>

        <table className="content-table" id="fiches-table">
          <thead>
            <tr>
              <th>Pigment / Titre</th>
              <th>Palette</th>
              <th>Catégorie</th>
              <th>Statut</th>
              <th>Vues</th>
              <th>Modifié</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filteredFiches.map((row) => (
              <tr key={row.title} onClick={() => setActivePanel('editeur')}>
                <td>
                  <strong style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{row.title}</strong>
                  <br />
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', color: 'var(--bone-muted)' }}>{row.code}</span>
                </td>
                <td><div className="swatch-mini">{row.swatches.map((color) => <span key={color} style={{ background: color }} />)}</div></td>
                <td><span style={{ fontSize: '0.78rem', color: 'var(--bone-muted)' }}>{row.category}</span></td>
                <td><span className={`badge ${row.statusClass}`}>{row.status}</span></td>
                <td style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem' }}>{row.views}</td>
                <td style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', color: 'var(--bone-muted)' }}>{row.modified}</td>
                <td><div className="row-actions"><button type="button" className="row-btn" onClick={(event) => { event.stopPropagation(); setActivePanel('editeur') }}>Éditer</button><button type="button" className="row-btn danger" onClick={(event) => event.stopPropagation()}>Archiver</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={`panel ${activePanel === 'editeur' ? 'active' : ''}`} id="panel-editeur">
        <div className="section-head" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
          <div>
            <div className="section-eyebrow">Rédaction</div>
            <h2 className="section-title-main">Éditeur de <em>fiche technique</em></h2>
          </div>
        </div>

        <div className="editor-layout">
          <div className="editor-main">
            <div className="editor-section">
              <div className="editor-section-head"><span className="editor-section-label">Identité du pigment</span></div>
              <div className="editor-section-body">
                <div className="field-row">
                  <div className="field-group"><label className="field-label">Nom du pigment</label><input className="field-input" type="text" placeholder="ex. Bleu de Prusse" /></div>
                  <div className="field-group"><label className="field-label">Code pigment</label><input className="field-input" type="text" placeholder="ex. PB27" /></div>
                </div>
                <div className="field-row-3">
                  <div className="field-group"><label className="field-label">Famille de couleur</label><select className="field-select"><option>Bleu</option><option>Rouge</option><option>Jaune</option><option>Vert</option><option>Brun / Terre</option><option>Noir / Blanc</option><option>Violet</option></select></div>
                  <div className="field-group"><label className="field-label">Médiums compatibles</label><select className="field-select"><option>Huile · Acryl · Aqua.</option><option>Huile uniquement</option><option>Aquarelle uniquement</option><option>Tous médiums</option></select></div>
                  <div className="field-group"><label className="field-label">Opacité</label><select className="field-select"><option>Transparent</option><option>Semi-transparent</option><option>Semi-opaque</option><option>Opaque</option></select></div>
                </div>
                <div className="field-group"><label className="field-label">Description</label><textarea className="field-textarea" placeholder="Décrivez le pigment, son histoire, ses caractéristiques notables…" /></div>
              </div>
            </div>

            <div className="editor-section">
              <div className="editor-section-head"><span className="editor-section-label">Palette de référence</span><span style={{ fontSize: '0.72rem', color: 'var(--bone-muted)' }}>Cliquez pour choisir une teinte</span></div>
              <div className="editor-section-body">
                <div className="palette-builder" id="palette">
                  {['#1a3a5c', '#2a5c8a', '#3d7aad', '#1a2d44', '#6a9cc4'].map((color) => (
                    <div key={color} className="palette-chip" style={{ background: color }} title={color}><span className="remove-chip">×</span></div>
                  ))}
                  <button type="button" className="palette-add">+</button>
                </div>
              </div>
            </div>

            <div className="editor-section">
              <div className="editor-section-head"><span className="editor-section-label">Propriétés techniques</span></div>
              <div className="editor-section-body">
                <div className="field-row">
                  <div className="field-group"><label className="field-label">Résistance à la lumière</label><div className="rating-selector">{Array.from({ length: 5 }).map((_, index) => <span key={index} className={`rating-star${index < 4 ? ' active' : ''}`}>⭑</span>)}</div></div>
                  <div className="field-group"><label className="field-label">Toxicité</label><select className="field-select"><option>Faible (sécuritaire)</option><option>Modérée</option><option>Élevée (toxique)</option><option>Très élevée (danger)</option></select></div>
                </div>
                <div className="field-row">
                  <div className="field-group"><label className="field-label">Pouvoir couvrant</label><select className="field-select"><option>Très fort</option><option>Fort</option><option>Moyen</option><option>Faible</option></select></div>
                  <div className="field-group"><label className="field-label">Granulation (aquarelle)</label><select className="field-select"><option>Non granuleux</option><option>Légèrement granuleux</option><option>Très granuleux</option></select></div>
                </div>
                <div className="field-group"><label className="field-label">Mélanges recommandés</label><textarea className="field-textarea" placeholder="Listez les pigments qui s'accordent bien avec celui-ci…" style={{ minHeight: 70 }} /></div>
              </div>
            </div>

            <div className="editor-section">
              <div className="editor-section-head"><span className="editor-section-label">Tags</span></div>
              <div className="editor-section-body">
                <div className="tags-wrap">
                  {['Opaque', 'Traditionnel', 'Stable'].map((tag) => <div key={tag} className="tag-chip">{tag} <button type="button">×</button></div>)}
                  <input className="tags-input" placeholder="Ajouter un tag…" />
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--bone-muted)', marginTop: '0.5rem' }}>Appuyez sur Entrée pour ajouter · Cliquez × pour supprimer</div>
              </div>
            </div>
          </div>

          <div className="editor-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-card-head">Publication</div>
              <div className="sidebar-card-body">
                <button type="button" className="publish-btn">Publier la fiche <span style={{ fontSize: '0.8rem' }}>→</span></button>
                <button type="button" className="save-draft-btn">Enregistrer le brouillon</button>
              </div>
            </div>

            <div className="sidebar-card">
              <div className="sidebar-card-head">Informations</div>
              <div className="sidebar-card-body">
                <div className="meta-row"><span className="meta-key">Statut</span><span className="meta-val"><span className="badge badge-draft">Brouillon</span></span></div>
                <div className="meta-row"><span className="meta-key">Auteur</span><span className="meta-val">Marie Durand</span></div>
                <div className="meta-row"><span className="meta-key">Créée le</span><span className="meta-val">6 mai 2025</span></div>
                <div className="meta-row"><span className="meta-key">Modifiée</span><span className="meta-val">À l'instant</span></div>
              </div>
            </div>

            <div className="sidebar-card">
              <div className="sidebar-card-head">Visibilité</div>
              <div className="sidebar-card-body">
                <select className="field-select" style={{ width: '100%', marginBottom: '0.75rem' }}><option>Publique</option><option>Membres seulement</option><option>Privée (brouillon)</option></select>
                <div style={{ fontSize: '0.72rem', color: 'var(--bone-muted)', lineHeight: 1.5 }}>La fiche sera soumise à révision avant publication.</div>
              </div>
            </div>

            <div className="sidebar-card" style={{ background: 'var(--canvas)', borderColor: 'transparent' }}>
              <div className="sidebar-card-head" style={{ borderColor: 'rgba(248,241,231,0.1)', color: 'var(--ochre-light)' }}>Aperçu palette</div>
              <div className="sidebar-card-body">
                <div style={{ display: 'flex', gap: 4, marginBottom: '0.75rem' }}>
                  {['#1a3a5c', '#2a5c8a', '#3d7aad', '#1a2d44', '#6a9cc4'].map((color) => <div key={color} style={{ flex: 1, height: '2.5rem', background: color, borderRadius: 2 }} />)}
                </div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.9rem', fontWeight: 700, color: 'var(--page)', marginBottom: '0.2rem' }}>Bleu de Prusse</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: 'var(--ochre-light)', letterSpacing: '0.1em' }}>PB27</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`panel ${activePanel === 'roadmaps' ? 'active' : ''}`} id="panel-roadmaps">
        <div className="section-head"><div className="section-eyebrow">Parcours</div><h2 className="section-title-main">Mes <em>roadmaps</em></h2></div>
        <div className="roadmap-grid-cards">
          {roadmapCards.map((card) => (
            <div key={card.num} className="roadmap-card-item">
              <div className="roadmap-card-num">{card.num}</div>
              <div className="roadmap-card-title">{card.title}</div>
              <div className="roadmap-card-desc">{card.desc}</div>
              <div className="roadmap-progress"><div className="roadmap-progress-bar"><div className="roadmap-progress-fill" style={{ width: `${card.progress}%` }} /></div><span className="roadmap-progress-label">{card.progress}%</span></div>
              <div className="roadmap-card-footer"><span className="roadmap-steps-count">{card.steps}</span><span className={`badge ${card.badgeClass}`}>{card.badge}</span><div className="roadmap-card-arrow" /></div>
            </div>
          ))}
          <div className="roadmap-new-card"><div className="roadmap-new-plus">+</div><div className="roadmap-new-label">Créer une nouvelle roadmap</div></div>
        </div>
      </section>

      <section className={`panel ${activePanel === 'analytics' ? 'active' : ''}`} id="panel-analytics">
        <div className="section-head"><div className="section-eyebrow">Performance</div><h2 className="section-title-main"><em>Analytiques</em> de contenu</h2></div>
        <div className="stats-row" style={{ marginBottom: '1.5rem' }}>
          {[
            ['Vues ce mois', '1 240', '↑ +18% vs avril'],
            ['Favoris', '317', '↑ +28 cette semaine'],
            ['Partages', '84', '↑ +12%'],
            ["Taux d'engagement", '6.5%', '↑ Bon score'],
          ].map(([label, value, delta]) => (
            <div key={label} className="stat-card"><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-delta">{delta}</div></div>
          ))}
        </div>
        <div className="analytics-grid">
          <div className="card"><div className="card-header"><div><div className="card-label">Tendance</div><div className="card-title">Vues par mois</div></div></div><div className="card-body"><div className="chart-placeholder"><div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', color: 'var(--ochre)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Vues · 2025</div><div className="chart-bars">{['35%','50%','42%','68%','88%','15%','15%','15%','15%','15%','15%','15%'].map((height, index) => <div key={index} className={`chart-bar${index === 4 ? ' highlight' : ''}`} style={{ height, opacity: index >= 5 ? 0.1 : undefined }}><span className="chart-bar-label">{['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'][index]}</span></div>)}</div></div></div></div>
          <div className="card"><div className="card-header"><div><div className="card-label">Classement</div><div className="card-title">Top fiches</div></div></div><div className="card-body"><div className="top-list">{topFiches.map((item, index) => <div key={item.name} className="top-item"><span className="top-rank">0{index + 1}</span><span className="top-color" style={{ background: item.color }} /><span className="top-name">{item.name}</span><span className="top-views">{item.views}</span></div>)}</div></div></div>
        </div>
      </section>

      <section className={`panel ${activePanel === 'notifs' ? 'active' : ''}`} id="panel-notifs">
        <div className="section-head"><div className="section-eyebrow">Centre</div><h2 className="section-title-main"><em>Notifications</em></h2></div>
        <div className="card" style={{ maxWidth: 720 }}>
          <div className="card-header"><div className="card-title">Récentes</div><a href="#" className="card-action">Tout marquer comme lu</a></div>
          <div className="card-body"><div className="notif-list">{notifications.map((item) => <div key={item.time} className="notif-item">{item.unread ? <div className="unread-dot" /> : <div style={{ width: '0.45rem' }} /> }<div className="notif-icon">{item.icon}</div><div className="notif-text"><strong>{item.title}</strong>{item.strong ? <strong> {item.strong}</strong> : null}<div className="notif-sub">{item.sub}</div></div><span className="notif-time">{item.time}</span></div>)}</div></div>
        </div>
      </section>

      <section className={`panel ${activePanel === 'profil' ? 'active' : ''}`} id="panel-profil">
        <div className="section-head"><div className="section-eyebrow">Compte</div><h2 className="section-title-main">Mon <em>profil</em></h2></div>
        <div className="editor-layout">
          <div>
            <div className="editor-section">
              <div className="editor-section-head"><span className="editor-section-label">Informations personnelles</span></div>
              <div className="editor-section-body">
                <div className="field-row"><div className="field-group"><label className="field-label">Prénom</label><input className="field-input" type="text" value="Marie" readOnly /></div><div className="field-group"><label className="field-label">Nom</label><input className="field-input" type="text" value="Durand" readOnly /></div></div>
                <div className="field-group"><label className="field-label">Nom d'utilisateur</label><input className="field-input" type="text" value="marie.durand" readOnly /></div>
                <div className="field-group"><label className="field-label">Email</label><input className="field-input" type="email" value="marie.durand@email.com" readOnly /></div>
                <div className="field-group"><label className="field-label">Bio</label><textarea className="field-textarea" value="Peintre aquarelliste passionnée par les pigments naturels et l'art traditionnel. 15 ans de pratique, enseignante en atelier." readOnly /></div>
              </div>
            </div>
            <div className="editor-section">
              <div className="editor-section-head"><span className="editor-section-label">Disciplines</span></div>
              <div className="editor-section-body"><div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>{['🎨 Peinture', '💧 Aquarelle', '✏️ Dessin', '🗿 Sculpture'].map((item, index) => <button key={item} type="button" className={`discipline-chip${index < 2 ? ' selected' : ''}`}>{item}</button>)}</div></div>
            </div>
          </div>

          <div>
            <div className="sidebar-card"><div className="sidebar-card-head">Sauvegarder</div><div className="sidebar-card-body"><button type="button" className="publish-btn">Enregistrer les modifications</button></div></div>
            <div className="sidebar-card" style={{ background: 'var(--canvas)' }}><div className="sidebar-card-head" style={{ borderColor: 'rgba(248,241,231,0.1)', color: 'var(--ochre-light)' }}>Niveau</div><div className="sidebar-card-body"><div className="progress-score" style={{ fontSize: '2rem' }}>72 pts</div><div className="progress-label" style={{ color: 'rgba(248,241,231,0.4)', fontSize: '0.72rem', marginBottom: '1rem' }}>Artisan — Niveau 3</div><div className="progress-bar-wrap"><div className="progress-bar-fill" /></div><div className="progress-bar-label">28 points pour "Maître"</div></div></div>
          </div>
        </div>
      </section>
    </PainterShell>
  )
}
