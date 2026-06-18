'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useDemoStore } from '@/context/DemoStoreContext'

export function FloatingQuestionWidget() {
  const { askQuestion } = useDemoStore()
  const [isOpen, setIsOpen] = useState(false)
  
  // Position & size state
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [size, setSize] = useState({ width: 360, height: 380 })
  
  // Dragging & resizing state
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  
  // Form state
  const [questionText, setQuestionText] = useState('')
  const [visitorName, setVisitorName] = useState('')
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Refs for tracking mouse offsets
  const dragStart = useRef({ x: 0, y: 0 })
  const initialPos = useRef({ x: 0, y: 0 })
  const resizeStart = useRef({ x: 0, y: 0 })
  const initialSize = useRef({ width: 0, height: 0 })

  // Initialize position to right corner when opened
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      setPosition({
        x: window.innerWidth - size.width - 40,
        y: window.innerHeight - size.height - 120,
      })
    }
  }, [isOpen])

  // Mouse move / up handlers for drag and resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.current.x
        const dy = e.clientY - dragStart.current.y
        setPosition({
          x: Math.max(10, Math.min(window.innerWidth - size.width - 10, initialPos.current.x + dx)),
          y: Math.max(10, Math.min(window.innerHeight - size.height - 10, initialPos.current.y + dy)),
        })
      } else if (isResizing) {
        const dx = e.clientX - resizeStart.current.x
        const dy = e.clientY - resizeStart.current.y
        setSize({
          width: Math.max(300, Math.min(700, initialSize.current.width + dx)),
          height: Math.max(280, Math.min(500, initialSize.current.height + dy)),
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isResizing, size, position])

  function handleQuestionSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!questionText.trim()) return

    try {
      askQuestion(questionText, visitorName)
      setQuestionText('')
      setVisitorName('')
      setFormMessage({ type: 'success', text: 'Votre question a été enregistrée !' })
      setTimeout(() => setFormMessage(null), 4000)
    } catch {
      setFormMessage({ type: 'error', text: 'Erreur lors de la soumission.' })
    }
  }

  const handleDragStart = (e: React.MouseEvent) => {
    // Prevent dragging if clicking input elements or close button
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLButtonElement
    ) {
      return
    }
    
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    initialPos.current = { ...position }
  }

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    resizeStart.current = { x: e.clientX, y: e.clientY }
    initialSize.current = { ...size }
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          title="Poser une question aux peintres"
          style={{
            position: 'fixed',
            bottom: '6.25rem', // Stacked above the PaintCanvas button (which is at bottom: 2rem)
            right: '2rem',
            zIndex: 190,
            width: '3.25rem',
            height: '3.25rem',
            borderRadius: '50%',
            background: 'var(--canvas)',
            border: '1.5px solid var(--ochre)',
            color: 'var(--ochre-light)',
            fontSize: '1.35rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(42,32,25,0.35)',
            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--ochre)'
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.transform = 'scale(1.1) rotate(-10deg)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--canvas)'
            e.currentTarget.style.color = 'var(--ochre-light)'
            e.currentTarget.style.transform = 'scale(1) rotate(0)'
          }}
        >
          ❓
        </button>
      )}

      {/* Floating Widget Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${size.width}px`,
            height: `${size.height}px`,
            zIndex: 400,
            background: 'var(--surface)',
            border: '1px solid var(--stroke-strong)',
            borderRadius: '8px',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: "'DM Sans', sans-serif",
            color: 'var(--bone)',
            userSelect: isDragging ? 'none' : 'auto',
          }}
        >
          {/* Draggable Titlebar */}
          <div
            onMouseDown={handleDragStart}
            style={{
              padding: '0.75rem 1rem',
              background: 'var(--canvas)',
              color: 'var(--ochre-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'move',
              borderBottom: '1px solid rgba(248,241,231,0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
              <span>❓</span>
              <span style={{ fontFamily: 'Playfair Display, serif' }}>Poser une question</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              title="Fermer"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(248,241,231,0.5)',
                fontSize: '1rem',
                cursor: 'pointer',
                padding: '0 0.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(248,241,231,0.5)'}
            >
              ✕
            </button>
          </div>

          {/* Form Content Area */}
          <div
            style={{
              flex: 1,
              padding: '1.2rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
            }}
          >
            <form onSubmit={handleQuestionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', height: '100%' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                <span>Votre question *</span>
                <textarea
                  required
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.8rem',
                    border: '1px solid var(--stroke)',
                    borderRadius: '4px',
                    background: '#fff',
                    resize: 'none',
                    fontFamily: 'inherit',
                    fontSize: '0.85rem',
                  }}
                  placeholder="Ex: Comment préparer un support en bois ?"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                />
              </label>
              
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                <span>Votre nom (optionnel)</span>
                <input
                  type="text"
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.8rem',
                    border: '1px solid var(--stroke)',
                    borderRadius: '4px',
                    background: '#fff',
                    fontSize: '0.85rem',
                  }}
                  placeholder="Ex: Léonard"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                />
              </label>

              <button
                type="submit"
                style={{
                  marginTop: 'auto',
                  width: '100%',
                  padding: '0.75rem',
                  background: 'var(--ochre)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--sienna)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--ochre)'}
              >
                Envoyer ma question
              </button>

              {formMessage && (
                <div
                  style={{
                    padding: '0.6rem 0.8rem',
                    fontSize: '0.78rem',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: formMessage.type === 'success' ? '#4a7c59' : '#8c2a2a',
                    color: formMessage.type === 'success' ? '#1f3a25' : '#4a1515',
                    background: formMessage.type === 'success' ? '#eef7f0' : '#fcedcd',
                    textAlign: 'center',
                  }}
                >
                  {formMessage.text}
                </div>
              )}
            </form>
          </div>

          {/* Resize handle in bottom right corner */}
          <div
            onMouseDown={handleResizeStart}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '16px',
              height: '16px',
              cursor: 'se-resize',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              padding: '0 2px 2px 0',
              opacity: 0.5,
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8">
              <path d="M6 0 L8 0 L8 8 L0 8 L0 6 L4 6 L4 4 L6 4 Z" fill="var(--muted)" />
            </svg>
          </div>
        </div>
      )}
    </>
  )
}
