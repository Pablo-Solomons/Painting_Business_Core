// ─── Draw command types ────────────────────────────────────────────────
export type DrawCommand =
  | { action: 'setBg';       color: string }
  | { action: 'setColor';    color: string }
  | { action: 'setSize';     size: number }
  | { action: 'setOpacity';  opacity: number }
  | { action: 'clear' }
  | { action: 'line';        x1: number; y1: number; x2: number; y2: number }
  | { action: 'circle';      cx: number; cy: number; r: number }
  | { action: 'rect';        x: number; y: number; w: number; h: number }
  | { action: 'fill';        x: number; y: number; color: string }
  | { action: 'dot';         x: number; y: number }
  | { action: 'spray';       x: number; y: number; radius: number; density: number }

// ─── Context types ──────────────────────────────────────────────────────
export type AIContext = {
  type: 'fiche' | 'roadmap'
  title: string
  summary: string
  tags?: string[]
  category?: string
  tool?: string
  level?: string
}

// ─── Build prompt for the AI ────────────────────────────────────────────
function buildPrompt(ctx: AIContext): string {
  const tagStr = ctx.tags?.length ? ctx.tags.join(', ') : 'art, peinture'
  const catStr = ctx.category ?? 'peinture'
  const toolStr = ctx.tool ?? 'technique mixte'

  return `Tu es un artiste peintre assistant qui doit illustrer une fiche ou un parcours d'apprentissage artistique.
Tu dessines sur un canvas de 640×480 pixels en utilisant des commandes JSON simples.

CONTEXTE :
- Type: ${ctx.type === 'fiche' ? "Fiche technique d'art" : 'Roadmap / Parcours d\'apprentissage'}
- Titre: "${ctx.title}"
- Résumé: "${ctx.summary}"
- Catégorie: ${catStr}
- Technique/Outil: ${toolStr}
- Tags: ${tagStr}

INSTRUCTIONS CRÉATIVES :
- Génère une composition originale, abstraite ou semi-figurative, qui évoque le thème
- Varie les formes, couleurs, tailles et opacités tout au long du dessin
- Chaque dessin doit être différent des précédents
- Inspire-toi du résumé pour choisir les couleurs dominantes

RÈGLES STRICTES :
- Réponds UNIQUEMENT avec un tableau JSON valide, rien d'autre.
- Utilise des coordonnées adaptées à un canvas 640×480.
- Commence toujours par définir le fond (setBg), la couleur (setColor) et la taille (setSize). Tu peux aussi régler l'opacité (setOpacity) de 0.0 à 1.0.
- Utilise entre 12 et 25 commandes (ni trop peu, ni trop long).
- Ne mets aucune explication, aucun commentaire, rien que le JSON.
- Varie les couleurs (hexadécimaux comme "#ff5500") à chaque changement.
- Ne reproduis PAS la structure exacte de l'exemple — fais preuve d'originalité.

COMMANDES DISPONIBLES :
{"action": "setBg", "color": "#hex"}       → Couleur de fond du canvas
{"action": "setColor", "color": "#hex"}    → Couleur du pinceau (change-la souvent)
{"action": "setSize", "size": 8}           → Taille du trait (2-48)
{"action": "setOpacity", "opacity": 0.8}   → Opacité du trait (0.1 à 1.0)
{"action": "clear"}                        → Efface le canvas
{"action": "line", "x1": 100, "y1": 100, "x2": 500, "y2": 300}
{"action": "circle", "cx": 320, "cy": 240, "r": 80}
{"action": "rect", "x": 100, "y": 100, "w": 200, "h": 150}
{"action": "fill", "x": 320, "y": 240, "color": "#ff0000"}
{"action": "dot", "x": 320, "y": 240}
{"action": "spray", "x": 320, "y": 240, "radius": 50, "density": 30}

Exemple (ne copie pas exactement, fais différent) :
[{"action":"setBg","color":"#1a1a2e"},{"action":"setColor","color":"#e94560"},{"action":"setSize","size":6},{"action":"setOpacity","opacity":0.9},{"action":"circle","cx":320,"cy":240,"r":100},{"action":"setColor","color":"#533483"},{"action":"setSize","size":3},{"action":"line","x1":100,"y1":400,"x2":540,"y2":100},{"action":"setColor","color":"#f5a623"},{"action":"setOpacity","opacity":0.5},{"action":"spray","x":320,"y":200,"radius":80,"density":15}]

Génère maintenant TA composition (uniquement le tableau JSON, sois original) :`
}

// ─── Extract JSON from LLM response ─────────────────────────────────────
function extractJson(raw: string): string {
  // Try to find a JSON array in the response
  const match = raw.match(/\[\s*\{[\s\S]*\}\s*\]/)
  if (match) return match[0]

  // Try to find a JSON array after removing markdown code fences
  const noFence = raw.replace(/```json\s*/gi, '').replace(/```\s*$/g, '').trim()
  if (noFence.startsWith('[')) return noFence

  return raw
}

// ─── Call AI via notre API Route proxy ──────────────────────────────────
async function callGroq(prompt: string): Promise<string> {
  const response = await fetch('/api/ai/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error ?? `API error ${response.status}`)
  }

  const data = await response.json()
  const content: string = data.content ?? ''
  if (!content) {
    throw new Error('Réponse vide de l\'API')
  }
  return content
}

// ─── Parse LLM response into DrawCommands ───────────────────────────────
function parseCommands(rawContent: string): DrawCommand[] {
  const cleaned = extractJson(rawContent)
  const parsed = JSON.parse(cleaned)

  if (!Array.isArray(parsed)) {
    throw new Error('La réponse n\'est pas un tableau de commandes')
  }

  // Validate each command
  const validActions = new Set(['setBg', 'setColor', 'setSize', 'setOpacity', 'clear', 'line', 'circle', 'rect', 'fill', 'dot', 'spray'])
  for (const cmd of parsed) {
    if (!cmd.action || !validActions.has(cmd.action)) {
      throw new Error(`Action inconnue: ${cmd.action}`)
    }
  }

  return parsed as DrawCommand[]
}

// ─── Generate a random hex color ────────────────────────────────────────
function randHex(): string {
  const hue = Math.floor(Math.random() * 360)
  const sat = 30 + Math.floor(Math.random() * 60) // 30-90%
  const lig = 25 + Math.floor(Math.random() * 50) // 25-75%
  return `hsl(${hue}, ${sat}%, ${lig}%)`
}

function randHexBg(): string {
  const hue = Math.floor(Math.random() * 360)
  const sat = 10 + Math.floor(Math.random() * 25) // 10-35%
  const lig = 85 + Math.floor(Math.random() * 12) // 85-97%
  return `hsl(${hue}, ${sat}%, ${lig}%)`
}

// ─── Fallback: random commands when API fails ───────────────────────────
function getFallbackCommands(_ctx: AIContext): DrawCommand[] {
  const numCommands = 12 + Math.floor(Math.random() * 14) // 12-25
  const cmds: DrawCommand[] = []

  // Always start with background
  cmds.push({ action: 'setBg', color: randHexBg() })

  const actions: DrawCommand['action'][] = ['line', 'circle', 'rect', 'dot', 'spray']

  for (let i = 0; i < numCommands; i++) {
    // Randomly insert style changes
    if (Math.random() < 0.35) {
      cmds.push({ action: 'setColor', color: randHex() })
    }
    if (Math.random() < 0.25) {
      cmds.push({ action: 'setSize', size: 2 + Math.floor(Math.random() * 30) })
    }
    if (Math.random() < 0.15) {
      cmds.push({ action: 'setOpacity', opacity: 0.2 + Math.random() * 0.8 })
    }

    const action = actions[Math.floor(Math.random() * actions.length)]
    const x = Math.floor(Math.random() * 540) + 50   // 50-590
    const y = Math.floor(Math.random() * 380) + 50   // 50-430

    switch (action) {
      case 'line':
        cmds.push({ action: 'line', x1: x, y1: y, x2: x + Math.floor(Math.random() * 300 - 150), y2: y + Math.floor(Math.random() * 300 - 150) })
        break
      case 'circle':
        cmds.push({ action: 'circle', cx: x, cy: y, r: 20 + Math.floor(Math.random() * 100) })
        break
      case 'rect':
        cmds.push({ action: 'rect', x: x, y: y, w: 30 + Math.floor(Math.random() * 180), h: 30 + Math.floor(Math.random() * 180) })
        break
      case 'dot':
        cmds.push({ action: 'dot', x, y })
        break
      case 'spray':
        cmds.push({ action: 'spray', x, y, radius: 20 + Math.floor(Math.random() * 80), density: 15 + Math.floor(Math.random() * 35) })
        break
    }
  }

  return cmds
}

// ─── Main export ────────────────────────────────────────────────────────
export async function generatePaintCommands(ctx: AIContext): Promise<DrawCommand[]> {
  try {
    const prompt = buildPrompt(ctx)
    console.log(`[aiPaint] 📤 Envoi du prompt au serveur (${prompt.length} car.)`)
    const rawContent = await callGroq(prompt)
    console.log(`[aiPaint] 📥 Réponse brute reçue (${rawContent.length} car.)`)
    const commands = parseCommands(rawContent)
    console.log(`[aiPaint] ✅ ${commands.length} commandes générées pour "${ctx.title}"`)
    return commands
  } catch (error) {
    console.warn(`[aiPaint] ❌ Erreur, utilisation du fallback :`, error)
    return getFallbackCommands(ctx)
  }
}
