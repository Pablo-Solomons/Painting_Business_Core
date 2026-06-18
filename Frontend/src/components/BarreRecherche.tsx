'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { DemoFiche, DemoRoadmap } from '@/types/content'

type SearchResult = {
  type: 'fiche' | 'roadmap'
  slug: string
  title: string
  subtitle: string
}

type Props = {
  fiches: DemoFiche[]
  roadmaps: DemoRoadmap[]
  placeholder?: string
}

export default function BarreRecherche({ fiches, roadmaps, placeholder = 'Rechercher…' }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    const q = query.trim().toLowerCase()
    if (!q) {
      setResults([])
      setIsOpen(false)
      return
    }

    debounceRef.current = setTimeout(() => {
      const hits: SearchResult[] = []

      // Search in fiches
      for (const f of fiches) {
        let match = false
        match ||= f.title.toLowerCase().includes(q)
        match ||= f.question.toLowerCase().includes(q)
        match ||= f.summary.toLowerCase().includes(q)
        match ||= f.tags.some((t) => t.toLowerCase().includes(q))
        match ||= f.category.toLowerCase().includes(q)
        match ||= f.tool.toLowerCase().includes(q)
        match ||= f.sections.some((s) =>
          s.title.toLowerCase().includes(q) ||
          s.paragraphs.some((p) => p.toLowerCase().includes(q))
        )
        if (match) {
          hits.push({ type: 'fiche', slug: f.slug, title: f.title, subtitle: f.question })
        }
      }

      // Search in roadmaps
      for (const r of roadmaps) {
        let match = false
        match ||= r.title.toLowerCase().includes(q)
        match ||= r.summary.toLowerCase().includes(q)
        match ||= r.steps.some((s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
        )
        if (match) {
          hits.push({ type: 'roadmap', slug: r.slug, title: r.title, subtitle: r.summary })
        }
      }

      setResults(hits.slice(0, 12))
      setIsOpen(hits.length > 0)
      setFocusedIndex(-1)
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, fiches, roadmaps])

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || results.length === 0) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
      } else if (e.key === 'Enter' && focusedIndex >= 0) {
        e.preventDefault()
        const item = results[focusedIndex]
        if (item) {
          window.location.href = item.type === 'fiche' ? `/fiches/${item.slug}` : `/roadmaps/${item.slug}`
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false)
        inputRef.current?.blur()
      }
    },
    [isOpen, results, focusedIndex],
  )

  const ficheCount = results.filter((r) => r.type === 'fiche').length
  const roadmapCount = results.filter((r) => r.type === 'roadmap').length

  return (
    <div ref={wrapperRef} style={{ position: 'relative', maxWidth: 480, width: '100%' }}>
      <div
        className="search-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: '#fffdfa',
          border: '1px solid rgba(42,32,25,0.15)',
          padding: '0 0.75rem',
          height: '2.6rem',
        }}
      >
        <span style={{ color: '#7b6b5d', fontSize: '1rem', lineHeight: 1 }}>⌕</span>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (results.length > 0) setIsOpen(true) }}
          style={{
            border: 'none',
            background: 'transparent',
            flex: 1,
            outline: 'none',
            fontSize: '0.88rem',
            fontFamily: 'inherit',
            color: '#2a2019',
          }}
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setResults([]); setIsOpen(false); inputRef.current?.focus() }}
            style={{
              border: 'none', background: 'transparent', cursor: 'pointer',
              color: '#7b6b5d', fontSize: '0.85rem', padding: 0, lineHeight: 1,
            }}
            aria-label="Effacer la recherche"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 500,
            background: '#fffdfa',
            border: '1px solid rgba(42,32,25,0.15)',
            borderTop: 'none',
            boxShadow: '0 8px 32px rgba(32,23,18,0.18)',
            maxHeight: 420,
            overflow: 'auto',
          }}
        >
          {/* Group: Fiches */}
          {ficheCount > 0 && (
            <>
              <div style={{
                padding: '0.5rem 0.75rem 0.25rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#9d6a3b',
              }}>
                Fiches ({ficheCount})
              </div>
              {results.filter((r) => r.type === 'fiche').map((item, i) => {
                const idx = results.indexOf(item)
                return (
                  <Link
                    key={`fiche-${item.slug}`}
                    href={`/fiches/${item.slug}`}
                    style={{
                      display: 'block',
                      padding: '0.45rem 0.75rem',
                      textDecoration: 'none',
                      color: '#2a2019',
                      background: focusedIndex === idx ? 'rgba(157,106,59,0.08)' : 'transparent',
                      borderLeft: focusedIndex === idx ? '3px solid #9d6a3b' : '3px solid transparent',
                    }}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    onClick={() => setIsOpen(false)}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#7b6b5d', marginTop: '0.1rem', lineHeight: 1.3 }}>{item.subtitle}</div>
                  </Link>
                )
              })}
            </>
          )}

          {/* Group: Roadmaps */}
          {roadmapCount > 0 && (
            <>
              <div style={{
                padding: '0.5rem 0.75rem 0.25rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#4a7c59',
                borderTop: '1px solid rgba(42,32,25,0.08)',
                marginTop: '0.25rem',
              }}>
                Roadmaps ({roadmapCount})
              </div>
              {results.filter((r) => r.type === 'roadmap').map((item, i) => {
                const idx = results.indexOf(item)
                return (
                  <Link
                    key={`roadmap-${item.slug}`}
                    href={`/roadmaps/${item.slug}`}
                    style={{
                      display: 'block',
                      padding: '0.45rem 0.75rem',
                      textDecoration: 'none',
                      color: '#2a2019',
                      background: focusedIndex === idx ? 'rgba(74,124,89,0.08)' : 'transparent',
                      borderLeft: focusedIndex === idx ? '3px solid #4a7c59' : '3px solid transparent',
                    }}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    onClick={() => setIsOpen(false)}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#7b6b5d', marginTop: '0.1rem', lineHeight: 1.3 }}>{item.subtitle}</div>
                  </Link>
                )
              })}
            </>
          )}
        </div>
      )}
    </div>
  )
}
