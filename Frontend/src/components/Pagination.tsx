'use client'

// STUB BCaaS — Composant de pagination générique
// Ce composant est un stub non fonctionnel décrit dans le rapport.

import { type ReactElement } from 'react'

type PaginationProps = {
  currentPage?: number
  totalPages?: number
}

export default function Pagination({ currentPage = 1, totalPages = 1 }: PaginationProps): ReactElement {
  return (
    <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center', padding: '1rem 0', color: '#7b6b5d', fontFamily: 'DM Mono, monospace', fontSize: '0.7rem' }}>
      Pagination — Stub ({currentPage}/{totalPages})
    </div>
  )
}