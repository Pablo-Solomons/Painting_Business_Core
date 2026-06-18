import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('')
  console.log('╔══════════════════════════════════════════════╗')
  console.log('║        🎨 AI PAINT — REQUÊTE REÇUE          ║')
  console.log('╚══════════════════════════════════════════════╝')

  let prompt: string
  try {
    const body = await request.json()
    prompt = body.prompt
    if (!prompt) {
      console.log('❌ Pas de prompt')
      return NextResponse.json({ error: 'Prompt requis' }, { status: 400 })
    }
    console.log(`📝 Prompt: ${prompt.length} car.`)
  } catch {
    console.log('❌ JSON invalide')
    return NextResponse.json({ error: 'JSON invalide' }, { status: 400 })
  }

  async function callAPI(url: string, body: string, apiKey: string): Promise<string> {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 120_000)
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body,
        signal: controller.signal,
      })
      const text = await res.text()
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 500)}`)
      return text
    } finally {
      clearTimeout(timer)
    }
  }

  const groqKey = process.env.NEXT_PUBLIC_GROQ_API_KEY
  console.log(`🔑 Groq: ${groqKey ? 'trouvée' : 'MANQUANTE'}`)

  if (groqKey) {
    try {
      console.log('📡 → Groq (llama-3.3-70b-versatile) [fetch natif]...')
      console.time('groq')
      const raw = await callAPI(
        'https://api.groq.com/openai/v1/chat/completions',
        JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], temperature: 0.9, max_tokens: 2048 }),
        groqKey,
      )
      console.timeEnd('groq')
      const content = JSON.parse(raw).choices?.[0]?.message?.content
      if (content) {
        console.log(`✅ Groq OK — ${content.length} car.`)
        console.log('╚══════════════════════════════════════════════╝')
        return NextResponse.json({ content })
      }
      console.log('⚠️ Groq: réponse vide')
    } catch (e: unknown) {
      console.log(`❌ Groq: ${e instanceof Error ? `${e.name}: ${e.message}` : String(e)}`.slice(0, 300))
    }
  }

  console.log('❌ Aucun service IA disponible')
  console.log('╚══════════════════════════════════════════════╝')
  return NextResponse.json({ error: 'Aucun service IA disponible' }, { status: 503 })
}