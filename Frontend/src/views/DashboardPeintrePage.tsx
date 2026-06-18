'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { PainterShell } from '../components/PainterShell'
import { useDemoStore } from '@/context/DemoStoreContext'
import {
  emptyFicheForm,
  emptyRoadmapForm,
  ficheToForm,
  roadmapToForm,
  statusMeta,
  type FicheFormInput,
  type RoadmapFormInput,
} from '@/types/content'
import { countRoadmapFiches } from '@/lib/roadmapUtils'

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
  const {
    session,
    updateProfile,
    getMyFiches,
    getMyRoadmaps,
    getFicheBySlug,
    getRoadmapBySlug,
    saveFicheDraft,
    submitFicheForReview,
    saveRoadmapDraft,
    submitRoadmapForReview,
    fiches,
    publishedFiches,
    questions,
  } = useDemoStore()

  const [activePanel, setActivePanel] = useState('overview')
  const [search, setSearch] = useState('')
  const [editingRoadmapSlug, setEditingRoadmapSlug] = useState<string | null>(null)
  const [editingFicheSlug, setEditingFicheSlug] = useState<string | null>(null)
  const [answeringQuestionId, setAnsweringQuestionId] = useState<string | null>(null)
  const [answeringQuestionType, setAnsweringQuestionType] = useState<'fiche' | 'roadmap' | null>(null)
  const [form, setForm] = useState<FicheFormInput>(emptyFicheForm())
  const [roadmapForm, setRoadmapForm] = useState<RoadmapFormInput>(emptyRoadmapForm())
  const [editorMessage, setEditorMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const [roadmapEditorMessage, setRoadmapEditorMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  const myFiches = session ? getMyFiches(session.userId) : []
  const myRoadmaps = session ? getMyRoadmaps(session.userId) : []
  const editingFiche = editingFicheSlug ? getFicheBySlug(editingFicheSlug) : null
  const editingRoadmap = editingRoadmapSlug ? getRoadmapBySlug(editingRoadmapSlug) : null

  const linkableFiches = useMemo(() => {
    const slugs = new Set<string>()
    publishedFiches.forEach((f) => slugs.add(f.slug))
    myFiches.forEach((f) => slugs.add(f.slug))
    return fiches.filter((f) => slugs.has(f.slug))
  }, [fiches, myFiches, publishedFiches])

  const roadmapCards = myRoadmaps.map((roadmap, index) => {
    const meta = statusMeta(roadmap.status)
    const progress = roadmap.steps.length > 0
      ? Math.round((roadmap.steps.filter((s) => s.ficheSlugs.length > 0).length / roadmap.steps.length) * 100)
      : 0
    return {
      slug: roadmap.slug,
      num: String(index + 1).padStart(2, '0'),
      title: roadmap.title,
      desc: roadmap.summary,
      progress,
      steps: `${roadmap.steps.length} étapes · ${countRoadmapFiches(roadmap)} fiches`,
      badge: meta.label,
      badgeClass: meta.className,
    }
  })

  const ficheRows = myFiches.map((fiche) => {
    const meta = statusMeta(fiche.status)
    return {
      slug: fiche.slug,
      title: fiche.title,
      code: fiche.pigmentCode ?? fiche.category,
      swatches: fiche.swatch ?? ['#36261f', '#7d5534', '#d8b089', '#1f1813'],
      category: fiche.tool,
      status: meta.label,
      statusClass: meta.className,
      views: '—',
      modified: new Date(fiche.updatedAt).toLocaleDateString('fr-FR'),
    }
  })

  function openEditor(slug?: string) {
    setEditorMessage(null)
    setAnsweringQuestionId(null)
    setAnsweringQuestionType(null)
    if (slug) {
      const fiche = getFicheBySlug(slug)
      if (fiche) {
        setEditingFicheSlug(slug)
        setForm(ficheToForm(fiche))
      }
    } else {
      setEditingFicheSlug(null)
      setForm(emptyFicheForm())
    }
    setActivePanel('editeur')
  }

  function openEditorForQuestion(questionText: string, questionId: string) {
    setEditorMessage(null)
    setEditingFicheSlug(null)
    setAnsweringQuestionId(questionId)
    setAnsweringQuestionType('fiche')
    setForm({
      ...emptyFicheForm(),
      question: questionText,
      title: questionText.replace('?', '').replace("Comment ", "").replace("Qu'est-ce que ", "").replace("Est-ce qu'on peut ", "").replace("Est-ce que ", ""),
    })
    setActivePanel('editeur')
  }

  function updateForm(field: keyof FicheFormInput, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSaveDraft() {
    const result = saveFicheDraft(form, editingFicheSlug ?? undefined, answeringQuestionType === 'fiche' ? answeringQuestionId ?? undefined : undefined)
    if (!result.ok) {
      setEditorMessage({ type: 'error', text: result.error })
      return
    }
    setEditingFicheSlug(result.slug)
    setAnsweringQuestionId(null)
    setAnsweringQuestionType(null)
    setEditorMessage({ type: 'success', text: 'Brouillon enregistré.' })
  }

  function handleSubmitForReview() {
    const result = submitFicheForReview(form, editingFicheSlug ?? undefined, answeringQuestionType === 'fiche' ? answeringQuestionId ?? undefined : undefined)
    if (!result.ok) {
      setEditorMessage({ type: 'error', text: result.error })
      return
    }
    setEditingFicheSlug(result.slug)
    setAnsweringQuestionId(null)
    setAnsweringQuestionType(null)
    setEditorMessage({
      type: 'success',
      text: 'Fiche soumise à modération. Un administrateur doit l’approuver pour publication.',
    })
    setActivePanel('fiches')
  }

  function openRoadmapEditor(slug?: string) {
    setRoadmapEditorMessage(null)
    setAnsweringQuestionId(null)
    setAnsweringQuestionType(null)
    if (slug) {
      const roadmap = getRoadmapBySlug(slug)
      if (roadmap) {
        setEditingRoadmapSlug(slug)
        setRoadmapForm(roadmapToForm(roadmap))
      }
    } else {
      setEditingRoadmapSlug(null)
      setRoadmapForm(emptyRoadmapForm())
    }
    setActivePanel('roadmap-editor')
  }

  function openRoadmapEditorForQuestion(questionText: string, questionId: string) {
    setRoadmapEditorMessage(null)
    setEditingRoadmapSlug(null)
    setAnsweringQuestionId(questionId)
    setAnsweringQuestionType('roadmap')
    setRoadmapForm({
      ...emptyRoadmapForm(),
      title: questionText.replace('?', '').replace("Comment ", "").replace("Qu'est-ce que ", "").replace("Est-ce qu'on peut ", "").replace("Est-ce que ", ""),
      summary: `Parcours rédigé en réponse à la question : "${questionText}"`,
    })
    setActivePanel('roadmap-editor')
  }

  function updateRoadmapField(field: keyof Omit<RoadmapFormInput, 'steps'>, value: string) {
    setRoadmapForm((current) => ({ ...current, [field]: value }))
  }

  function updateRoadmapStep(index: number, field: 'title' | 'description', value: string) {
    setRoadmapForm((current) => ({
      ...current,
      steps: current.steps.map((step, i) => (i === index ? { ...step, [field]: value } : step)),
    }))
  }

  function addFicheToStep(stepIndex: number, ficheSlug: string) {
    if (!ficheSlug) return
    setRoadmapForm((current) => ({
      ...current,
      steps: current.steps.map((step, i) =>
        i === stepIndex && !step.ficheSlugs.includes(ficheSlug)
          ? { ...step, ficheSlugs: [...step.ficheSlugs, ficheSlug] }
          : step,
      ),
    }))
  }

  function removeFicheFromStep(stepIndex: number, ficheSlug: string) {
    setRoadmapForm((current) => ({
      ...current,
      steps: current.steps.map((step, i) =>
        i === stepIndex ? { ...step, ficheSlugs: step.ficheSlugs.filter((s) => s !== ficheSlug) } : step,
      ),
    }))
  }

  function addRoadmapStep() {
    setRoadmapForm((current) => ({
      ...current,
      steps: [...current.steps, { title: '', description: '', ficheSlugs: [] }],
    }))
  }

  function removeRoadmapStep(index: number) {
    setRoadmapForm((current) => ({
      ...current,
      steps: current.steps.filter((_, i) => i !== index),
    }))
  }

  function handleSaveRoadmapDraft() {
    const result = saveRoadmapDraft(roadmapForm, editingRoadmapSlug ?? undefined, answeringQuestionType === 'roadmap' ? answeringQuestionId ?? undefined : undefined)
    if (!result.ok) {
      setRoadmapEditorMessage({ type: 'error', text: result.error })
      return
    }
    setEditingRoadmapSlug(result.slug)
    setAnsweringQuestionId(null)
    setAnsweringQuestionType(null)
    setRoadmapEditorMessage({ type: 'success', text: 'Brouillon enregistré.' })
  }

  function handleSubmitRoadmapForReview() {
    const result = submitRoadmapForReview(roadmapForm, editingRoadmapSlug ?? undefined, answeringQuestionType === 'roadmap' ? answeringQuestionId ?? undefined : undefined)
    if (!result.ok) {
      setRoadmapEditorMessage({ type: 'error', text: result.error })
      return
    }
    setEditingRoadmapSlug(result.slug)
    setAnsweringQuestionId(null)
    setAnsweringQuestionType(null)
    setRoadmapEditorMessage({
      type: 'success',
      text: 'Roadmap soumise à modération. Un administrateur doit l’approuver pour publication.',
    })
    setActivePanel('roadmaps')
  }

  const filteredFiches = useMemo(
    () => ficheRows.filter((row) => row.title.toLowerCase().includes(search.toLowerCase()) || row.code.toLowerCase().includes(search.toLowerCase()) || row.category.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  return (
    <PainterShell activePanel={activePanel} onNavigate={(panel) => (panel === 'editeur' ? openEditor() : setActivePanel(panel))}>
      <section className={`panel ${activePanel === 'overview' ? 'active' : ''}`} id="panel-overview">
        <div className="overview-hero">
          <div className="overview-welcome">
            <div className="welcome-text">
              <div className="welcome-eyebrow">Espace peintre</div>
              <h1 className="welcome-title">
                Bonjour, <em>{session?.name?.split(' ')[0] ?? 'Peintre'}.</em>
              </h1>
              <div className="welcome-date">Mardi 6 mai 2025 — Voici un aperçu de votre activité</div>
            </div>

            <div className="hero-pills">
              <span>{questions.filter((q) => q.status === 'pending').length} questions en attente</span>
              <span>3 fiches en révision</span>
              <span>72 points contributeur</span>
            </div>
          </div>

          <div className="overview-hero-card">
            <div className="overview-hero-card-head">
              <div>
                <div className="overview-hero-card-eyebrow">Vue rapide</div>
                <div className="overview-hero-card-title">Votre atelier aujourd'hui</div>
              </div>
              <div className="overview-hero-card-badge">Actif</div>
            </div>

            <div className="overview-hero-card-grid">
              <div>
                <span>À publier</span>
                <strong>2 fiches prêtes</strong>
              </div>
              <div>
                <span>En attente</span>
                <strong>1 roadmap</strong>
              </div>
              <div>
                <span>Questions</span>
                <strong>{questions.filter((q) => q.status === 'pending').length} en attente</strong>
              </div>
              <div>
                <span>Lectures</span>
                <strong>892 vues</strong>
              </div>
            </div>

            <button type="button" className="overview-hero-cta" onClick={() => openEditor()}>
              Ouvrir l'éditeur
            </button>
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
                <button type="button" className="qa-btn" onClick={() => openEditor()}>
                  <span className="qa-icon">📝</span>
                  <div><div>Nouvelle fiche</div><div className="qa-desc">Article de connaissance sur un sujet précis</div></div>
                  <div className="qa-arrow" />
                </button>
                <button type="button" className="qa-btn" onClick={() => openRoadmapEditor()}>
                  <span className="qa-icon">🗺</span>
                  <div><div>Créer une roadmap</div><div className="qa-desc">Parcours guidé par discipline</div></div>
                  <div className="qa-arrow" />
                </button>
                <button type="button" className="qa-btn" onClick={() => setActivePanel('questions')}>
                  <span className="qa-icon">❓</span>
                  <div><div>Questions visiteurs</div><div className="qa-desc">{questions.filter((q) => q.status === 'pending').length} questions en attente</div></div>
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
          <h2 className="section-title-main">Mes <em>fiches</em></h2>
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
          <button type="button" className="topbar-btn" onClick={() => openEditor()}>+ Nouvelle fiche</button>
        </div>

        <table className="content-table" id="fiches-table">
          <thead>
            <tr>
              <th>Titre / Catégorie</th>
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
              <tr key={row.slug} onClick={() => openEditor(row.slug)}>
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
                <td><div className="row-actions"><button type="button" className="row-btn" onClick={(event) => { event.stopPropagation(); openEditor(row.slug) }}>Éditer</button><button type="button" className="row-btn danger" onClick={(event) => event.stopPropagation()}>Archiver</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={`panel ${activePanel === 'editeur' ? 'active' : ''}`} id="panel-editeur">
        <div className="section-head" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
          <div>
            <div className="section-eyebrow">Rédaction</div>
            <h2 className="section-title-main">Éditeur de <em>fiche</em></h2>
          </div>
        </div>

        <div className="editor-layout">
          {editorMessage ? (
            <div className={`form-message form-message--${editorMessage.type}`} style={{ gridColumn: '1 / -1' }} role="alert">
              {editorMessage.text}
            </div>
          ) : null}

          <div className="editor-main">
            <div className="editor-section">
              <div className="editor-section-head"><span className="editor-section-label">Identité</span></div>
              <div className="editor-section-body">
                <div className="field-group">
                  <label className="field-label">Question que répond la fiche</label>
                  <input className="field-input" type="text" placeholder="ex. Qu'est-ce que le glacis ?" value={form.question} onChange={(e) => updateForm('question', e.target.value)} />
                </div>
                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">Titre</label>
                    <input className="field-input" type="text" placeholder="ex. Le glacis" value={form.title} onChange={(e) => updateForm('title', e.target.value)} />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Catégorie</label>
                    <select className="field-select" value={form.category} onChange={(e) => updateForm('category', e.target.value)}>
                      <option>Technique</option>
                      <option>Pigment</option>
                      <option>Médium</option>
                      <option>Support</option>
                    </select>
                  </div>
                </div>
                <div className="field-row-3">
                  <div className="field-group">
                    <label className="field-label">Médium / outil</label>
                    <input className="field-input" type="text" placeholder="ex. Peinture à l'huile" value={form.tool} onChange={(e) => updateForm('tool', e.target.value)} />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Niveau</label>
                    <select className="field-select" value={form.level} onChange={(e) => updateForm('level', e.target.value)}>
                      <option>Débutant</option>
                      <option>Intermédiaire</option>
                      <option>Avancé</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">Durée de lecture</label>
                    <input className="field-input" type="text" placeholder="ex. 12 min" value={form.duration} onChange={(e) => updateForm('duration', e.target.value)} />
                  </div>
                </div>
                <div className="field-group">
                  <label className="field-label">Résumé</label>
                  <textarea className="field-textarea" placeholder="En une phrase, de quoi parle cette fiche ?" value={form.summary} onChange={(e) => updateForm('summary', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="editor-section">
              <div className="editor-section-head"><span className="editor-section-label">Contenu de l'article</span></div>
              <div className="editor-section-body">
                <div className="field-group">
                  <label className="field-label">Section — titre</label>
                  <input className="field-input" type="text" placeholder="ex. Principe du glacis" value={form.sectionTitle} onChange={(e) => updateForm('sectionTitle', e.target.value)} />
                </div>
                <div className="field-group">
                  <label className="field-label">Corps</label>
                  <textarea className="field-textarea" placeholder="Rédigez le contenu de la fiche…" style={{ minHeight: 140 }} value={form.sectionBody} onChange={(e) => updateForm('sectionBody', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="editor-section">
              <div className="editor-section-head"><span className="editor-section-label">Tags</span></div>
              <div className="editor-section-body">
                <div className="field-group">
                  <label className="field-label">Tags (séparés par des virgules)</label>
                  <input className="field-input" type="text" placeholder="ex. huile, glacis, technique" value={form.tags} onChange={(e) => updateForm('tags', e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="editor-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-card-head">Publication</div>
              <div className="sidebar-card-body">
                <button type="button" className="publish-btn" onClick={handleSubmitForReview}>
                  Soumettre à modération <span style={{ fontSize: '0.8rem' }}>→</span>
                </button>
                <button type="button" className="save-draft-btn" onClick={handleSaveDraft}>Enregistrer le brouillon</button>
              </div>
            </div>

            <div className="sidebar-card">
              <div className="sidebar-card-head">Informations</div>
              <div className="sidebar-card-body">
                <div className="meta-row">
                  <span className="meta-key">Statut</span>
                  <span className="meta-val">
                    <span className={`badge ${statusMeta(editingFiche?.status ?? 'draft').className}`}>
                      {statusMeta(editingFiche?.status ?? 'draft').label}
                    </span>
                  </span>
                </div>
                <div className="meta-row"><span className="meta-key">Auteur</span><span className="meta-val">{session?.name ?? '—'}</span></div>
                {editingFicheSlug ? (
                  <div className="meta-row"><span className="meta-key">Slug</span><span className="meta-val">{editingFicheSlug}</span></div>
                ) : null}
              </div>
            </div>

            <div className="sidebar-card">
              <div className="sidebar-card-head">Visibilité</div>
              <div className="sidebar-card-body">
                <div style={{ fontSize: '0.72rem', color: 'var(--bone-muted)', lineHeight: 1.5 }}>
                  La fiche sera visible publiquement uniquement après approbation par un administrateur.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`panel ${activePanel === 'roadmaps' ? 'active' : ''}`} id="panel-roadmaps">
        <div className="section-head"><div className="section-eyebrow">Parcours</div><h2 className="section-title-main">Mes <em>roadmaps</em></h2></div>
        <div className="roadmap-grid-cards">
          {roadmapCards.map((card) => (
            <button
              key={card.slug}
              type="button"
              className="roadmap-card-item"
              style={{ cursor: 'pointer', textAlign: 'left', width: '100%' }}
              onClick={() => openRoadmapEditor(card.slug)}
            >
              <div className="roadmap-card-num">{card.num}</div>
              <div className="roadmap-card-title">{card.title}</div>
              <div className="roadmap-card-desc">{card.desc}</div>
              <div className="roadmap-progress"><div className="roadmap-progress-bar"><div className="roadmap-progress-fill" style={{ width: `${card.progress}%` }} /></div><span className="roadmap-progress-label">{card.progress}%</span></div>
              <div className="roadmap-card-footer"><span className="roadmap-steps-count">{card.steps}</span><span className={`badge ${card.badgeClass}`}>{card.badge}</span><div className="roadmap-card-arrow" /></div>
            </button>
          ))}
          <button type="button" className="roadmap-new-card" onClick={() => openRoadmapEditor()}>
            <div className="roadmap-new-plus">+</div>
            <div className="roadmap-new-label">Créer une nouvelle roadmap</div>
          </button>
        </div>
      </section>

      <section className={`panel ${activePanel === 'roadmap-editor' ? 'active' : ''}`} id="panel-roadmap-editor">
        <div className="section-head" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div>
            <div className="section-eyebrow">Parcours</div>
            <h2 className="section-title-main">Éditeur de <em>roadmap</em></h2>
          </div>
          <button type="button" className="topbar-btn" onClick={() => setActivePanel('roadmaps')}>← Retour</button>
        </div>

        <div className="editor-layout">
          {roadmapEditorMessage ? (
              <div className={`form-message form-message--${roadmapEditorMessage.type}`} style={{ gridColumn: '1 / -1' }} role="alert">
                {roadmapEditorMessage.text}
              </div>
            ) : null}

            <div className="editor-main">
              <div className="editor-section">
                <div className="editor-section-head"><span className="editor-section-label">Programme</span></div>
                <div className="editor-section-body">
                  <div className="field-group">
                    <label className="field-label">Titre du parcours</label>
                    <input className="field-input" type="text" value={roadmapForm.title} onChange={(e) => updateRoadmapField('title', e.target.value)} />
                  </div>
                  <div className="field-row-3">
                    <div className="field-group">
                      <label className="field-label">Public</label>
                      <input className="field-input" type="text" value={roadmapForm.audience} onChange={(e) => updateRoadmapField('audience', e.target.value)} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Durée</label>
                      <input className="field-input" type="text" value={roadmapForm.duration} onChange={(e) => updateRoadmapField('duration', e.target.value)} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Niveau</label>
                      <input className="field-input" type="text" value={roadmapForm.level} onChange={(e) => updateRoadmapField('level', e.target.value)} />
                    </div>
                  </div>
                  <div className="field-group">
                    <label className="field-label">Objectif</label>
                    <textarea className="field-textarea" value={roadmapForm.summary} onChange={(e) => updateRoadmapField('summary', e.target.value)} />
                  </div>
                </div>
              </div>

              {roadmapForm.steps.map((step, index) => (
                <div key={`step-${index}`} className="editor-section">
                  <div className="editor-section-head">
                    <span className="editor-section-label">Étape {index + 1}</span>
                    {roadmapForm.steps.length > 2 && (
                      <button type="button" className="row-btn danger" style={{ marginLeft: 'auto', fontSize: '0.7rem' }} onClick={() => removeRoadmapStep(index)}>× Supprimer</button>
                    )}
                  </div>
                  <div className="editor-section-body">
                    <div className="field-group">
                      <label className="field-label">Titre de l&apos;étape</label>
                      <input className="field-input" type="text" value={step.title} onChange={(e) => updateRoadmapStep(index, 'title', e.target.value)} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Description de l&apos;étape</label>
                      <textarea className="field-textarea" value={step.description} onChange={(e) => updateRoadmapStep(index, 'description', e.target.value)} style={{ minHeight: 70 }} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Fiches référencées (lues indépendamment)</label>
                      <div className="tags-wrap">
                        {step.ficheSlugs.length > 0 ? step.ficheSlugs.map((ficheSlug) => {
                          const linked = fiches.find((f) => f.slug === ficheSlug)
                          return linked ? (
                            <div key={ficheSlug} className="tag-chip">
                              {linked.title}
                              <button type="button" onClick={() => removeFicheFromStep(index, ficheSlug)}>×</button>
                            </div>
                          ) : null
                        }) : (
                          <span style={{ fontSize: '0.78rem', color: 'var(--bone-muted)' }}>Aucune fiche liée</span>
                        )}
                      </div>
                      <select
                        className="field-select"
                        style={{ marginTop: '0.75rem' }}
                        value=""
                        onChange={(e) => addFicheToStep(index, e.target.value)}
                      >
                        <option value="">+ Ajouter une fiche existante…</option>
                        {linkableFiches.map((f) => (
                          <option key={f.slug} value={f.slug}>{f.title} — {f.category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="topbar-btn" style={{ marginTop: '1rem', width: '100%' }} onClick={addRoadmapStep}>+ Ajouter une étape</button>
            </div>

            <div className="editor-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-card-head">Publication</div>
                <div className="sidebar-card-body">
                  <button type="button" className="publish-btn" onClick={handleSubmitRoadmapForReview}>
                    Soumettre à modération <span style={{ fontSize: '0.8rem' }}>→</span>
                  </button>
                  <button type="button" className="save-draft-btn" onClick={handleSaveRoadmapDraft}>Enregistrer le brouillon</button>
                </div>
              </div>
              <div className="sidebar-card">
                <div className="sidebar-card-head">Structure</div>
                <div className="sidebar-card-body">
                  <div className="meta-row"><span className="meta-key">Étapes</span><span className="meta-val">{roadmapForm.steps.length}</span></div>
                  <div className="meta-row"><span className="meta-key">Fiches liées</span><span className="meta-val">{roadmapForm.steps.reduce((n, s) => n + s.ficheSlugs.length, 0)}</span></div>
                </div>
              </div>
              <div className="sidebar-card">
                <div className="sidebar-card-head">Informations</div>
                <div className="sidebar-card-body">
                  <div className="meta-row">
                    <span className="meta-key">Statut</span>
                    <span className="meta-val">
                      <span className={`badge ${statusMeta(editingRoadmap?.status ?? 'draft').className}`}>
                        {statusMeta(editingRoadmap?.status ?? 'draft').label}
                      </span>
                    </span>
                  </div>
                  {editingRoadmapSlug ? (
                    <div className="meta-row"><span className="meta-key">Slug</span><span className="meta-val">{editingRoadmapSlug}</span></div>
                  ) : null}
                </div>
              </div>
            </div>
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

      <section className={`panel ${activePanel === 'questions' ? 'active' : ''}`} id="panel-questions">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Échanges</div>
            <h2 className="section-title-main">Questions des <em>visiteurs</em></h2>
          </div>
        </div>

        <div className="card" style={{ marginTop: '1.5rem' }}>
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="card-title" style={{ fontSize: '1.1rem' }}>Questions en attente de fiches explicatives</div>
            <div className="hero-pills" style={{ margin: 0 }}>
              <span>{questions.filter((q) => q.status === 'pending').length} en attente</span>
            </div>
          </div>
          <div className="card-body">
            {questions.length === 0 ? (
              <div style={{ color: 'var(--bone-muted)', fontStyle: 'italic', padding: '2rem', textAlign: 'center' }}>
                Aucune question pour le moment.
              </div>
            ) : (
              <table className="content-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--stroke)', textAlign: 'left' }}>
                    <th style={{ padding: '0.8rem' }}>Question / Auteur</th>
                    <th style={{ padding: '0.8rem' }}>Statut</th>
                    <th style={{ padding: '0.8rem' }}>Date</th>
                    <th style={{ padding: '0.8rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q) => {
                    const dateStr = new Date(q.createdAt).toLocaleDateString('fr-FR')
                    return (
                      <tr key={q.id} style={{ borderBottom: '1px solid var(--stroke)', verticalAlign: 'middle' }}>
                        <td style={{ padding: '1rem 0.8rem' }}>
                          <strong style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', color: 'var(--bone)' }}>{q.text}</strong>
                          <br />
                          <span style={{ fontSize: '0.75rem', color: 'var(--bone-muted)', fontFamily: 'DM Mono, monospace' }}>Posée par {q.authorName || 'Visiteur Anonyme'}</span>
                        </td>
                        <td style={{ padding: '1rem 0.8rem' }}>
                          {q.status === 'answered' ? (
                            <span className="badge badge-published" style={{ background: 'rgba(74, 124, 89, 0.15)', color: '#2b5037' }}>● Répondu</span>
                          ) : (
                            <span className="badge badge-review" style={{ background: 'rgba(157, 106, 59, 0.15)', color: 'var(--ochre)' }}>○ En attente</span>
                          )}
                        </td>
                        <td style={{ padding: '1rem 0.8rem', fontFamily: 'DM Mono, monospace', fontSize: '0.8rem' }}>
                          {dateStr}
                        </td>
                        <td style={{ padding: '1rem 0.8rem', textAlign: 'right' }}>
                          {q.status === 'pending' ? (
                            <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                              <button
                                type="button"
                                className="topbar-btn"
                                style={{ fontSize: '0.72rem', padding: '0.35rem 0.7rem' }}
                                onClick={() => openEditorForQuestion(q.text, q.id)}
                              >
                                + Fiche
                              </button>
                              <button
                                type="button"
                                className="topbar-btn topbar-btn-ghost"
                                style={{ fontSize: '0.72rem', padding: '0.35rem 0.7rem', borderColor: 'var(--stroke-strong)' }}
                                onClick={() => openRoadmapEditorForQuestion(q.text, q.id)}
                              >
                                + Roadmap
                              </button>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              {q.ficheSlug ? (
                                <Link
                                  href={`/fiches/${q.ficheSlug}`}
                                  className="row-btn"
                                  style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', display: 'inline-block' }}
                                >
                                  Voir la réponse (Fiche) →
                                </Link>
                              ) : q.roadmapSlug ? (
                                <Link
                                  href={`/roadmaps/${q.roadmapSlug}`}
                                  className="row-btn"
                                  style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', display: 'inline-block' }}
                                >
                                  Voir la réponse (Roadmap) →
                                </Link>
                              ) : (
                                <span style={{ fontSize: '0.75rem', color: 'var(--bone-muted)' }}>Répondu</span>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      <section className={`panel ${activePanel === 'profil' ? 'active' : ''}`} id="panel-profil">
        <div className="section-head"><div className="section-eyebrow">Compte</div><h2 className="section-title-main">Mon <em>profil</em></h2></div>
        <div className="editor-layout">
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
              <div className="editor-section-head"><span className="editor-section-label">Disciplines</span></div>
              <div className="editor-section-body"><div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>{(session?.specialties ?? ['🎨 Peinture', '💧 Aquarelle']).map((item, index) => <button key={item} type="button" className={`discipline-chip${index < 2 ? ' selected' : ''}`}>{item}</button>)}</div></div>
            </div>
          </div>

          <div>
            <div className="sidebar-card"><div className="sidebar-card-head">Sauvegarder</div><div className="sidebar-card-body"><button type="button" className="publish-btn" onClick={() => { /* auto-saved */ }}>✓ Modifications auto-sauvegardées</button></div></div>
            <div className="sidebar-card" style={{ background: 'var(--canvas)' }}><div className="sidebar-card-head" style={{ borderColor: 'rgba(248,241,231,0.1)', color: 'var(--ochre-light)' }}>Niveau</div><div className="sidebar-card-body"><div className="progress-score" style={{ fontSize: '2rem' }}>72 pts</div><div className="progress-label" style={{ color: 'rgba(248,241,231,0.4)', fontSize: '0.72rem', marginBottom: '1rem' }}>Artisan — Niveau 3</div><div className="progress-bar-wrap"><div className="progress-bar-fill" /></div><div className="progress-bar-label">28 points pour "Maître"</div></div></div>
          </div>
        </div>
      </section>
    </PainterShell>
  )
}
