'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { generatePaintCommands, type AIContext, type DrawCommand } from '@/lib/aiPaintService'
import { useDemoStore } from '@/context/DemoStoreContext'

// ─── Palettes de couleurs artistiques ───────────────────────────────────────────
const PALETTES = {
  terres: {
    label: 'Terres & Tradition',
    colors: ['#201712', '#3f2c22', '#5b3221', '#9d6a3b', '#d6b189', '#eadfce', '#e6d9c7', '#7b6b5d', '#7a2a1a', '#b05a2a']
  },
  impressionniste: {
    label: 'Impressionnisme',
    colors: ['#2a4a6a', '#4a7aaa', '#8abadf', '#6a7662', '#a0b08a', '#c8b45a', '#d44a2a', '#e8884a', '#fffdfa', '#f8f1e7']
  },
  pop: {
    label: 'Pop / Moderne',
    colors: ['#ff0055', '#ff5500', '#ffcc00', '#33cc33', '#0099ff', '#7700ff', '#ff00ff', '#000000', '#888888', '#ffffff']
  },
  monochrome: {
    label: 'Monochrome',
    colors: ['#000000', '#222222', '#444444', '#666666', '#888888', '#aaaaaa', '#cccccc', '#eeeeee', '#ffffff', '#eadfce']
  }
} as const

type PaletteType = keyof typeof PALETTES

const TOOLS = [
  { id: 'pencil',      label: 'Crayon',       icon: '✏️',   desc: 'Trait fin et précis' },
  { id: 'brush',       label: 'Pinceau',      icon: '🖌️',   desc: 'Trait fluide classique' },
  { id: 'calligraphy', label: 'Calligraphie', icon: '🖋️',   desc: 'Plume plate biseautée' },
  { id: 'spray',       label: 'Aérographe',   icon: '💨',   desc: 'Spray moucheté texturé' },
  { id: 'highlighter', label: 'Surligneur',   icon: '🖍️',   desc: 'Trait large semi-transparent' },
  { id: 'eraser',      label: 'Gomme',        icon: '⬜',   desc: 'Gommer la peinture' },
  { id: 'fill',        label: 'Remplir',      icon: '🪣',   desc: 'Remplir une zone' },
  { id: 'line',        label: 'Ligne',        icon: '╱',    desc: 'Ligne droite' },
  { id: 'rect',        label: 'Rectangle',    icon: '▭',    desc: 'Dessiner un rectangle' },
  { id: 'circle',      label: 'Cercle',       icon: '○',    desc: 'Dessiner un cercle' },
  { id: 'triangle',    label: 'Triangle',     icon: '▲',    desc: 'Dessiner un triangle' },
] as const

const SIZES = [2, 4, 8, 14, 22, 32, 48]

function hexToRgba(hex: string): [number, number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b, 255]
}

function floodFill(ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: string) {
  const canvas = ctx.canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  const idx = (Math.round(y) * canvas.width + Math.round(x)) * 4
  const target = [data[idx], data[idx+1], data[idx+2], data[idx+3]]
  const fill = hexToRgba(fillColor)
  if (target.every((v, i) => v === fill[i])) return

  const stack = [[Math.round(x), Math.round(y)]]
  const w = canvas.width, h = canvas.height
  const visited = new Uint8Array(w * h)

  function match(i: number) {
    return data[i] === target[0] && data[i+1] === target[1] && data[i+2] === target[2] && data[i+3] === target[3]
  }
  function paint(px: number, py: number) {
    const i = (py * w + px) * 4
    data[i] = fill[0]; data[i+1] = fill[1]; data[i+2] = fill[2]; data[i+3] = fill[3]
  }

  while (stack.length) {
    const [cx, cy] = stack.pop()!
    if (cx < 0 || cy < 0 || cx >= w || cy >= h) continue
    const vi = cy * w + cx
    if (visited[vi]) continue
    visited[vi] = 1
    if (!match((cy * w + cx) * 4)) continue
    paint(cx, cy)
    stack.push([cx+1,cy],[cx-1,cy],[cx,cy+1],[cx,cy-1])
  }
  ctx.putImageData(imageData, 0, 0)
}

// ─── PanelContent as a proper named component (stable reference) ──────────
function PanelContent({
  tool, setTool,
  color, setColor,
  bgColor, setBgColor,
  size, setSize,
  opacity, setOpacity,
  colorTarget, setColorTarget,
  activePalette, setActivePalette,
  drawCanvasRef,
  bgCanvasRef: _bgCanvasRef,
  fileInputRef,
  isOpen, setIsOpen,
  mode,
  canUndo, canRedo,
  handleUndo, handleRedo,
  handleClearCanvas,
  handleDownload,
  isAiPainting,
  aiStatusMessage,
  handleAiPaint,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: {
  tool: string
  setTool: (t: string) => void
  color: string
  setColor: (c: string) => void
  bgColor: string
  setBgColor: (c: string) => void
  size: number
  setSize: (s: number) => void
  opacity: number
  setOpacity: (o: number) => void
  colorTarget: 'fg' | 'bg'
  setColorTarget: (t: 'fg' | 'bg') => void
  activePalette: PaletteType
  setActivePalette: (p: PaletteType) => void
  drawCanvasRef: React.RefObject<HTMLCanvasElement | null>
  bgCanvasRef: React.RefObject<HTMLCanvasElement | null>
  fileInputRef: React.RefObject<HTMLInputElement | null>
  isOpen: boolean
  setIsOpen: (o: boolean) => void
  mode: 'floating' | 'panel'
  canUndo: boolean
  canRedo: boolean
  handleUndo: () => void
  handleRedo: () => void
  handleClearCanvas: () => void
  handleDownload: () => void
  isAiPainting: boolean
  aiStatusMessage: string
  handleAiPaint: () => void
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void
  onMouseUp: () => void
  onMouseLeave: () => void
  onTouchStart: (e: React.TouchEvent<HTMLCanvasElement>) => void
  onTouchMove: (e: React.TouchEvent<HTMLCanvasElement>) => void
  onTouchEnd: () => void
}) {
  // Fill bgCanvas with bgColor whenever bgColor changes or component mounts
  useEffect(() => {
    const ctx = _bgCanvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }, [bgColor, _bgCanvasRef])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#f4ece1',
      fontFamily: "'Poppins', sans-serif",
      color: '#2a2019',
    }}>
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1.2rem',
        background: '#2a2019',
        borderBottom: '2px solid rgba(42,32,25,0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🎨</span>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            color: '#d6b189',
            fontSize: '1.05rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}>
            Atelier de Création
          </span>
        </div>

        {/* Undo/Redo & Utility Actions */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <button
            onClick={handleUndo}
            disabled={!canUndo || isAiPainting}
            title="Annuler (Ctrl+Z)"
            style={{
              width: '2.1rem', height: '2.1rem',
              background: canUndo && !isAiPainting ? 'rgba(214,177,137,0.18)' : 'transparent',
              border: '1px solid rgba(214,177,137,0.25)',
              color: canUndo && !isAiPainting ? '#d6b189' : 'rgba(214,177,137,0.35)',
              cursor: canUndo && !isAiPainting ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.9rem', transition: 'background 0.2s',
            }}
          >
            ↩️
          </button>

          <button
            onClick={handleRedo}
            disabled={!canRedo || isAiPainting}
            title="Rétablir (Ctrl+Y)"
            style={{
              width: '2.1rem', height: '2.1rem',
              background: canRedo && !isAiPainting ? 'rgba(214,177,137,0.18)' : 'transparent',
              border: '1px solid rgba(214,177,137,0.25)',
              color: canRedo && !isAiPainting ? '#d6b189' : 'rgba(214,177,137,0.35)',
              cursor: canRedo && !isAiPainting ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.9rem', transition: 'background 0.2s',
            }}
          >
            ↪️
          </button>

          <div style={{ width: 1, height: '1.4rem', background: 'rgba(214,177,137,0.2)', margin: '0 0.2rem' }} />

          {/* AI Inspiration Button */}
          <button
            onClick={handleAiPaint}
            disabled={isAiPainting}
            title="Demander à l'IA de peindre une illustration inspirée de la page"
            style={{
              width: '2.1rem', height: '2.1rem',
              background: isAiPainting ? 'rgba(100,200,100,0.25)' : 'rgba(100,200,100,0.15)',
              border: '1px solid rgba(100,200,100,0.4)',
              color: isAiPainting ? '#a0e0a0' : '#7bc07b',
              cursor: isAiPainting ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.9rem', transition: 'background 0.15s',
              animation: isAiPainting ? 'pulse 1s ease-in-out infinite' : 'none',
            }}
            onMouseEnter={e => { if (!isAiPainting) e.currentTarget.style.background = 'rgba(100,200,100,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = isAiPainting ? 'rgba(100,200,100,0.25)' : 'rgba(100,200,100,0.15)'; }}
          >
            💡
          </button>

          <div style={{ width: 1, height: '1.4rem', background: 'rgba(214,177,137,0.2)', margin: '0 0.2rem' }} />

          <button
            onClick={() => fileInputRef.current?.click()}
            title="Importer une image de fond"
            style={{
              width: '2.1rem', height: '2.1rem',
              background: 'rgba(214,177,137,0.15)',
              border: '1px solid rgba(214,177,137,0.3)',
              color: '#d6b189',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.95rem', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(214,177,137,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(214,177,137,0.15)'}
          >
            🖼️
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={() => {}}
            accept="image/*"
            style={{ display: 'none' }}
          />

          <button
            onClick={handleDownload}
            title="Télécharger l'œuvre"
            style={{
              width: '2.1rem', height: '2.1rem',
              background: 'rgba(214,177,137,0.15)',
              border: '1px solid rgba(214,177,137,0.3)',
              color: '#d6b189',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.95rem', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(214,177,137,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(214,177,137,0.15)'}
          >
            ⬇️
          </button>

          <button
            onClick={handleClearCanvas}
            title="Tout effacer"
            style={{
              width: '2.1rem', height: '2.1rem',
              background: 'rgba(214,177,137,0.15)',
              border: '1px solid rgba(214,177,137,0.3)',
              color: '#d6b189',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.95rem', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(214,177,137,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(214,177,137,0.15)'}
          >
            🗑️
          </button>

          {mode === 'floating' && (
            <button
              onClick={() => setIsOpen(false)}
              title="Fermer"
              style={{
                width: '2.1rem', height: '2.1rem',
                background: 'rgba(220,100,100,0.18)',
                border: '1px solid rgba(220,100,100,0.35)',
                color: '#ff9494',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,100,100,0.35)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(220,100,100,0.18)'}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Toolbar & Settings */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '0.6rem 0.9rem',
        background: '#ebdcc5',
        borderBottom: '1px solid rgba(42,32,25,0.15)',
      }}>
        {/* Row 1: Brush styles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#5b3221', marginRight: '0.3rem', minWidth: '40px' }}>Style :</span>
          {TOOLS.map(t => (
            <button
              key={t.id}
              title={`${t.label} : ${t.desc}`}
              onClick={() => setTool(t.id)}
              style={{
                padding: '0.25rem 0.45rem',
                fontSize: '0.85rem',
                border: tool === t.id ? '2.5px solid #9d6a3b' : '1px solid rgba(42,32,25,0.22)',
                background: tool === t.id ? '#fff9f0' : 'rgba(255,255,255,0.35)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'all 0.15s',
              }}
            >
              <span>{t.icon}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: tool === t.id ? 'bold' : 'normal' }}>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Row 2: Thickness, Opacity, and Live Preview */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.2rem',
          flexWrap: 'wrap',
          borderTop: '1px dashed rgba(42,32,25,0.15)',
          paddingTop: '0.5rem',
          marginTop: '0.2rem',
        }}>
          {/* Thickness buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#5b3221', marginRight: '0.3rem' }}>Taille :</span>
            {SIZES.map(s => (
              <button
                key={s}
                title={`Épaisseur ${s}px`}
                onClick={() => setSize(s)}
                style={{
                  width: '1.9rem', height: '1.9rem',
                  border: size === s ? '2.5px solid #9d6a3b' : '1px solid rgba(42,32,25,0.22)',
                  background: size === s ? '#fff9f0' : 'rgba(255,255,255,0.35)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.1s',
                }}
              >
                <div style={{
                  width: Math.min(s * 0.7 + 1, 16),
                  height: Math.min(s * 0.7 + 1, 16),
                  borderRadius: '50%',
                  background: '#2a2019',
                }} />
              </button>
            ))}
          </div>

          {/* Opacity slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '150px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#5b3221' }}>Opacité:</span>
            <input
              type="range"
              min="1"
              max="100"
              value={opacity}
              onChange={e => setOpacity(parseInt(e.target.value))}
              style={{
                flex: 1,
                cursor: 'pointer',
                accentColor: '#9d6a3b',
              }}
            />
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', width: '30px', textAlign: 'right' }}>{opacity}%</span>
          </div>

          {/* Brush Preview Widget */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255,255,255,0.45)',
            padding: '0.25rem 0.6rem',
            border: '1px solid rgba(42,32,25,0.15)',
          }}>
            <span style={{ fontSize: '0.7rem', color: '#5b3221', fontWeight: 'bold' }}>Aperçu :</span>
            <div style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'repeating-conic-gradient(#fff 0% 25%, #ddd 0% 50%) 50% / 8px 8px',
              border: '1px solid rgba(42,32,25,0.2)',
            }}>
              <div style={{
                width: Math.max(2, Math.min(size, 28)),
                height: Math.max(2, Math.min(size, 28)),
                borderRadius: tool === 'highlighter' || tool === 'rect' ? '0' : '50%',
                background: tool === 'eraser' ? '#ffffff' : color,
                opacity: opacity / 100,
                border: tool === 'eraser' ? '1px dashed #aaa' : 'none',
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Drawing Area - Double canvas: bg underneath, draw on top */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.8rem',
        background: '#cbd2c7',
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0, rgba(0,0,0,0.02) 1px, transparent 0, transparent 50%)',
        backgroundSize: '12px 12px',
        position: 'relative',
      }}>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes aiPulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
          }
        `}</style>
        <div style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%' }}>
          {/* Background canvas (solid color) */}
          <canvas
            ref={_bgCanvasRef}
            width={640}
            height={480}
            style={{
              display: 'block',
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          />
          {/* Drawing canvas (transparent, user draws here) */}
          <canvas
            ref={drawCanvasRef}
            width={640}
            height={480}
            onMouseDown={isAiPainting ? undefined : onMouseDown}
            onMouseMove={isAiPainting ? undefined : onMouseMove}
            onMouseUp={isAiPainting ? undefined : onMouseUp}
            onMouseLeave={isAiPainting ? undefined : onMouseLeave}
            onTouchStart={isAiPainting ? undefined : onTouchStart}
            onTouchMove={isAiPainting ? undefined : onTouchMove}
            onTouchEnd={isAiPainting ? undefined : onTouchEnd}
            style={{
              cursor: isAiPainting ? 'not-allowed' : 'crosshair',
              display: 'block',
              position: 'relative',
              boxShadow: '0 4px 24px rgba(32,23,18,0.22)',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />

          {/* AI Painting Overlay */}
          {isAiPainting && aiStatusMessage && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.35)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  background: 'rgba(42,32,25,0.85)',
                  color: '#d6b189',
                  padding: '0.8rem 1.6rem',
                  borderRadius: '8px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  animation: 'aiPulse 1.5s ease-in-out infinite',
                  border: '1px solid rgba(214,177,137,0.3)',
                  maxWidth: '80%',
                }}
              >
                {aiStatusMessage}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Colors & Palette Drawer */}
      <div style={{
        padding: '0.6rem 1rem',
        background: '#ebdcc5',
        borderTop: '1px solid rgba(42,32,25,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}>
        {/* Palette Tab Selector */}
        <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#5b3221', marginRight: '0.3rem' }}>Palette :</span>
          {(Object.keys(PALETTES) as PaletteType[]).map((pKey) => (
            <button
              key={pKey}
              onClick={() => setActivePalette(pKey)}
              style={{
                padding: '0.2rem 0.5rem',
                fontSize: '0.7rem',
                cursor: 'pointer',
                border: '1px solid rgba(42,32,25,0.2)',
                background: activePalette === pKey ? '#2a2019' : 'rgba(255,255,255,0.45)',
                color: activePalette === pKey ? '#fffdfa' : '#2a2019',
                fontWeight: activePalette === pKey ? 'bold' : 'normal',
                transition: 'all 0.15s',
              }}
            >
              {PALETTES[pKey].label}
            </button>
          ))}
        </div>

        {/* Color circles & custom pickers */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          borderTop: '1px dashed rgba(42,32,25,0.15)',
          paddingTop: '0.5rem',
        }}>
          {/* Active Colors (FG/BG) Swapper */}
          <div style={{
            position: 'relative',
            width: '2.9rem',
            height: '2.3rem',
            cursor: 'pointer',
            flexShrink: 0,
            marginRight: '0.4rem',
          }}>
            {/* Background Color Indicator */}
            <div
              onClick={() => setColorTarget('bg')}
              title="Couleur d'arrière-plan (cliquer pour activer)"
              style={{
                position: 'absolute', bottom: 0, right: 0,
                width: '1.6rem', height: '1.6rem',
                background: bgColor,
                border: colorTarget === 'bg' ? '2.5px solid #9d6a3b' : '1px solid rgba(42,32,25,0.4)',
                zIndex: 1,
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              }}
            />
            {/* Foreground/Brush Color Indicator */}
            <div
              onClick={() => setColorTarget('fg')}
              title="Couleur du pinceau (cliquer pour activer)"
              style={{
                position: 'absolute', top: 0, left: 0,
                width: '1.6rem', height: '1.6rem',
                background: color,
                border: colorTarget === 'fg' ? '2.5px solid #9d6a3b' : '1px solid rgba(42,32,25,0.4)',
                zIndex: 2,
                boxShadow: '1px 2px 4px rgba(0,0,0,0.2)',
              }}
            />
          </div>

          <div style={{ width: 1, height: '1.6rem', background: 'rgba(42,32,25,0.15)', margin: '0 0.1rem' }} />

          {/* Render Active Palette Colors */}
          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {PALETTES[activePalette].colors.map(c => (
              <button
                key={c}
                title={c}
                onClick={() => {
                  if (colorTarget === 'fg') {
                    setColor(c)
                  } else {
                    setBgColor(c)
                  }
                }}
                style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  background: c,
                  border: (colorTarget === 'fg' ? color : bgColor) === c
                    ? '3px solid #9d6a3b'
                    : '1px solid rgba(42,32,25,0.3)',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  flexShrink: 0,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transform: (colorTarget === 'fg' ? color : bgColor) === c ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.1s',
                }}
              />
            ))}
          </div>

          <div style={{ width: 1, height: '1.6rem', background: 'rgba(42,32,25,0.15)', margin: '0 0.1rem' }} />

          {/* Custom Color Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <input
              type="color"
              value={colorTarget === 'fg' ? color : bgColor}
              onChange={e => {
                if (colorTarget === 'fg') {
                  setColor(e.target.value)
                } else {
                  setBgColor(e.target.value)
                }
              }}
              title="Couleur sur mesure"
              style={{
                width: '1.6rem',
                height: '1.6rem',
                border: '1px solid rgba(42,32,25,0.3)',
                padding: 0,
                cursor: 'pointer',
                background: 'transparent',
                borderRadius: '50%',
              }}
            />
            <span style={{ fontSize: '0.65rem', color: '#5b3221', fontWeight: 'bold' }}>Perso</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Floating button ──────────────────────────────────────────────────────
function FloatingButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title="Ouvrir l'atelier de dessin"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 200,
        width: '3.25rem',
        height: '3.25rem',
        borderRadius: '50%',
        background: '#9d6a3b',
        border: '1.5px solid #5b3221',
        color: '#fffdfa',
        fontSize: '1.4rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(42,32,25,0.35)',
        transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#5b3221'; e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = '#9d6a3b'; e.currentTarget.style.transform = 'scale(1) rotate(0)'; }}
    >
      🎨
    </button>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────
export default function PaintCanvas({ mode = 'floating' }: { mode?: 'floating' | 'panel' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [tool, setTool] = useState<string>('pencil')
  const [color, setColor] = useState('#9d6a3b')
  const [bgColor, setBgColor] = useState('#f8f1e7')
  const [size, setSize] = useState(8)
  const [opacity, setOpacity] = useState(100)
  const [colorTarget, setColorTarget] = useState<'fg' | 'bg'>('fg')
  const [activePalette, setActivePalette] = useState<PaletteType>('terres')

  // ─── AI Painting state ─────────────────────────────────────────────────
  const [isAiPainting, setIsAiPainting] = useState(false)
  const [aiStatusMessage, setAiStatusMessage] = useState('')
  const aiCancelRef = useRef(false)
  const { getFicheBySlug, getRoadmapBySlug } = useDemoStore()

  // ─── Detect current page context ───────────────────────────────────────
  function detectPageContext(): AIContext | null {
    if (typeof window === 'undefined') return null
    const path = window.location.pathname

    // Match /fiches/<slug>
    const ficheMatch = path.match(/^\/fiches\/([^/]+)/)
    if (ficheMatch) {
      const slug = ficheMatch[1]
      const fiche = getFicheBySlug(slug)
      if (fiche) {
        return {
          type: 'fiche',
          title: fiche.title,
          summary: fiche.summary,
          tags: fiche.tags,
          category: fiche.category,
          tool: fiche.tool,
          level: fiche.level,
        }
      }
    }

    // Match /roadmaps/<slug>
    const roadmapMatch = path.match(/^\/roadmaps\/([^/]+)/)
    if (roadmapMatch) {
      const slug = roadmapMatch[1]
      const roadmap = getRoadmapBySlug(slug)
      if (roadmap) {
        return {
          type: 'roadmap',
          title: roadmap.title,
          summary: roadmap.summary,
          tags: [], // roadmaps don't have tags
          category: roadmap.level,
          level: roadmap.level,
        }
      }
    }

    return null
  }

  // ─── Execute a single draw command on the canvas ──────────────────────
  function executeCommand(ctx: CanvasRenderingContext2D, bgCtx: CanvasRenderingContext2D, cmd: DrawCommand) {
    switch (cmd.action) {
      case 'setBg':
        bgCtx.fillStyle = cmd.color
        bgCtx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        break
      case 'setColor':
        ctx.strokeStyle = cmd.color
        ctx.fillStyle = cmd.color
        break
      case 'setSize':
        ctx.lineWidth = cmd.size
        break
      case 'setOpacity':
        ctx.globalAlpha = cmd.opacity
        break
      case 'clear':
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        break
      case 'line':
        ctx.beginPath()
        ctx.moveTo(cmd.x1, cmd.y1)
        ctx.lineTo(cmd.x2, cmd.y2)
        ctx.stroke()
        break
      case 'circle':
        ctx.beginPath()
        ctx.ellipse(cmd.cx, cmd.cy, cmd.r, cmd.r, 0, 0, Math.PI * 2)
        ctx.stroke()
        break
      case 'rect':
        ctx.strokeRect(cmd.x, cmd.y, cmd.w, cmd.h)
        break
      case 'fill':
        floodFill(ctx, cmd.x, cmd.y, cmd.color)
        break
      case 'dot': {
        const r = Math.max(ctx.lineWidth, 2) / 2
        ctx.beginPath()
        ctx.ellipse(cmd.x, cmd.y, r, r, 0, 0, Math.PI * 2)
        ctx.fill()
        break
      }
      case 'spray': {
        const density = cmd.density ?? 20
        const radius = cmd.radius ?? 30
        for (let i = 0; i < density; i++) {
          const angle = Math.random() * Math.PI * 2
          const r = Math.sqrt(Math.random()) * radius
          ctx.fillRect(cmd.x + Math.cos(angle) * r, cmd.y + Math.sin(angle) * r, 1.5, 1.5)
        }
        break
      }
    }
  }

  // ─── Animate AI painting ──────────────────────────────────────────────
  async function animateAiPaint(commands: DrawCommand[]) {
    const canvas = drawCanvasRef.current
    const bgCanvas = bgCanvasRef.current
    if (!canvas || !bgCanvas) return

    const ctx = canvas.getContext('2d')
    const bgCtx = bgCanvas.getContext('2d')
    if (!ctx || !bgCtx) return

    // Save current state for undo
    saveCanvasState()

    // Lock interaction
    setIsAiPainting(true)

    // Animate commands
    for (let i = 0; i < commands.length; i++) {
      if (aiCancelRef.current) break
      setAiStatusMessage(`L'IA peint… ${Math.round((i / commands.length) * 100)}%`)

      executeCommand(ctx, bgCtx, commands[i])

      // Delay between commands for visual effect
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200))
    }

    if (!aiCancelRef.current) {
      setAiStatusMessage('✨ Inspiration terminée !')
      await new Promise(resolve => setTimeout(resolve, 1200))
    }

    setIsAiPainting(false)
    setAiStatusMessage('')
    aiCancelRef.current = false
  }

  // ─── Handle AI Paint button ───────────────────────────────────────────
  const handleAiPaint = useCallback(async () => {
    const context = detectPageContext()
    if (!context) {
      setAiStatusMessage('ℹ️ Ouvrez une fiche ou roadmap pour utiliser l\'IA')
      setIsAiPainting(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsAiPainting(false)
      setAiStatusMessage('')
      return
    }

    aiCancelRef.current = false
    setAiStatusMessage('🤔 L\'IA réfléchit à une composition…')
    setIsAiPainting(true)

    const commands = await generatePaintCommands(context)
    await animateAiPaint(commands)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Double canvas: bg (solid color) + draw (transparent drawing layer)
  const drawCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const drawing = useRef(false)
  const lastPos = useRef<{ x: number; y: number } | null>(null)
  const startPos = useRef<{ x: number; y: number } | null>(null)
  const snapshotRef = useRef<ImageData | null>(null)

  // Undo/Redo Stacks (only for the draw canvas)
  const undoStack = useRef<ImageData[]>([])
  const redoStack = useRef<ImageData[]>([])
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  const saveCanvasState = useCallback(() => {
    const canvas = drawCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const currentImg = ctx.getImageData(0, 0, canvas.width, canvas.height)
    undoStack.current.push(currentImg)
    if (undoStack.current.length > 25) {
      undoStack.current.shift()
    }
    redoStack.current = []
    setCanUndo(true)
    setCanRedo(false)
  }, [])

  const handleUndo = useCallback(() => {
    const canvas = drawCanvasRef.current
    if (!canvas || undoStack.current.length === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const currentImg = ctx.getImageData(0, 0, canvas.width, canvas.height)
    redoStack.current.push(currentImg)
    const prevImg = undoStack.current.pop()!
    ctx.putImageData(prevImg, 0, 0)
    setCanUndo(undoStack.current.length > 0)
    setCanRedo(true)
  }, [])

  const handleRedo = useCallback(() => {
    const canvas = drawCanvasRef.current
    if (!canvas || redoStack.current.length === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const currentImg = ctx.getImageData(0, 0, canvas.width, canvas.height)
    undoStack.current.push(currentImg)
    const nextImg = redoStack.current.pop()!
    ctx.putImageData(nextImg, 0, 0)
    setCanUndo(true)
    setCanRedo(redoStack.current.length > 0)
  }, [])

  function getPos(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    const canvas = drawCanvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    }
  }

  function applyStroke(ctx: CanvasRenderingContext2D, from: { x: number; y: number }, to: { x: number; y: number }) {
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (tool === 'eraser') {
      // Eraser: destination-out removes pixels only from the draw canvas
      ctx.globalCompositeOperation = 'destination-out'
      ctx.globalAlpha = opacity / 100
      ctx.lineWidth = size * 3
      ctx.strokeStyle = '#000000'
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()
      ctx.globalCompositeOperation = 'source-over'
      return
    }

    ctx.strokeStyle = color
    ctx.globalAlpha = opacity / 100

    if (tool === 'pencil') {
      ctx.lineWidth = size
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()
    } else if (tool === 'brush') {
      ctx.lineWidth = size * 2.5
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()
    } else if (tool === 'highlighter') {
      ctx.strokeStyle = color
      ctx.lineWidth = size * 4
      ctx.lineCap = 'square'
      ctx.lineJoin = 'miter'
      ctx.globalAlpha = (opacity / 100) * 0.3
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()
    } else if (tool === 'calligraphy') {
      ctx.lineWidth = 1.5
      const dx = to.x - from.x
      const dy = to.y - from.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const steps = Math.max(Math.floor(distance), 1)
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const cx = from.x + dx * t
        const cy = from.y + dy * t
        ctx.beginPath()
        const offset = size * 1.2
        ctx.moveTo(cx - offset, cy + offset)
        ctx.lineTo(cx + offset, cy - offset)
        ctx.stroke()
      }
    } else if (tool === 'spray') {
      const radius = size * 3
      const density = Math.min(size * 4, 80)
      ctx.fillStyle = color
      const dx = to.x - from.x
      const dy = to.y - from.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const steps = Math.max(Math.floor(distance / 5), 1)
      for (let s = 0; s <= steps; s++) {
        const t = s / steps
        const cx = from.x + dx * t
        const cy = from.y + dy * t
        for (let i = 0; i < density; i++) {
          const angle = Math.random() * Math.PI * 2
          const r = Math.sqrt(Math.random()) * radius
          const sx = cx + Math.cos(angle) * r
          const sy = cy + Math.sin(angle) * r
          ctx.fillRect(sx, sy, 1.5, 1.5)
        }
      }
    }
  }

  function drawShape(ctx: CanvasRenderingContext2D, start: { x: number; y: number }, end: { x: number; y: number }) {
    if (snapshotRef.current) ctx.putImageData(snapshotRef.current, 0, 0)
    ctx.strokeStyle = color
    ctx.lineWidth = size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.globalAlpha = opacity / 100

    if (tool === 'line') {
      ctx.beginPath()
      ctx.moveTo(start.x, start.y)
      ctx.lineTo(end.x, end.y)
      ctx.stroke()
    } else if (tool === 'rect') {
      ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y)
    } else if (tool === 'circle') {
      const rx = (end.x - start.x) / 2
      const ry = (end.y - start.y) / 2
      ctx.beginPath()
      ctx.ellipse(start.x + rx, start.y + ry, Math.abs(rx), Math.abs(ry), 0, 0, Math.PI * 2)
      ctx.stroke()
    } else if (tool === 'triangle') {
      ctx.beginPath()
      ctx.moveTo(start.x + (end.x - start.x) / 2, start.y)
      ctx.lineTo(end.x, end.y)
      ctx.lineTo(start.x, end.y)
      ctx.closePath()
      ctx.stroke()
    }
  }

  function onDown(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    e.preventDefault()
    const canvas = drawCanvasRef.current!
    const ctx = canvas.getContext('2d')!
    saveCanvasState()
    const pos = getPos(e)
    if (tool === 'fill') {
      floodFill(ctx, pos.x, pos.y, color)
      return
    }
    drawing.current = true
    lastPos.current = pos
    startPos.current = pos
    if (['line', 'rect', 'circle', 'triangle'].includes(tool)) {
      snapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height)
    }
  }

  function onMove(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    e.preventDefault()
    if (!drawing.current) return
    const canvas = drawCanvasRef.current!
    const ctx = canvas.getContext('2d')!
    const pos = getPos(e)
    if (['pencil', 'brush', 'eraser', 'calligraphy', 'spray', 'highlighter'].includes(tool)) {
      applyStroke(ctx, lastPos.current!, pos)
      lastPos.current = pos
    } else {
      drawShape(ctx, startPos.current!, pos)
    }
  }

  function onUp() {
    if (!drawing.current) return
    drawing.current = false
    const canvas = drawCanvasRef.current!
    const ctx = canvas.getContext('2d')!
    const pos = lastPos.current || { x: 0, y: 0 }
    ctx.globalAlpha = opacity / 100
    if (['line', 'rect', 'circle', 'triangle'].includes(tool)) {
      drawShape(ctx, startPos.current!, pos)
    }
    ctx.globalAlpha = 1
  }

  const handleClearCanvas = useCallback(() => {
    const canvas = drawCanvasRef.current!
    const ctx = canvas.getContext('2d')!
    saveCanvasState()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [saveCanvasState])

  const handleDownload = useCallback(() => {
    const drawCanvas = drawCanvasRef.current
    const bgCanvas = bgCanvasRef.current
    if (!drawCanvas || !bgCanvas) return

    // Create a temporary canvas to compose both layers
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = drawCanvas.width
    tempCanvas.height = drawCanvas.height
    const tempCtx = tempCanvas.getContext('2d')!
    // 1. Draw background
    tempCtx.drawImage(bgCanvas, 0, 0)
    // 2. Draw drawing layer on top
    tempCtx.drawImage(drawCanvas, 0, 0)

    const link = document.createElement('a')
    link.download = 'artplastique-creation.png'
    link.href = tempCanvas.toDataURL()
    link.click()
  }, [])

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const drawCanvas = drawCanvasRef.current
        const bgCanvas = bgCanvasRef.current
        if (!drawCanvas || !bgCanvas) return
        const drawCtx = drawCanvas.getContext('2d')
        const bgCtx = bgCanvas.getContext('2d')
        if (!drawCtx || !bgCtx) return

        // Preserve drawing layer state for undo
        saveCanvasState()

        // Scale image to fit canvas while preserving aspect ratio
        const canvasRatio = drawCanvas.width / drawCanvas.height
        const imgRatio = img.width / img.height
        let drawWidth = drawCanvas.width
        let drawHeight = drawCanvas.height
        let x = 0
        let y = 0
        if (imgRatio > canvasRatio) {
          drawHeight = drawCanvas.width / imgRatio
          y = (drawCanvas.height - drawHeight) / 2
        } else {
          drawWidth = drawCanvas.height * imgRatio
          x = (drawCanvas.width - drawWidth) / 2
        }
        // Put image on bg canvas
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height)
        bgCtx.drawImage(img, x, y, drawWidth, drawHeight)
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }, [saveCanvasState])

  if (mode === 'panel') {
    return (
      <div style={{ width: '100%', height: '100%', minHeight: '520px' }}>
        <PanelContent
          tool={tool}
          setTool={setTool}
          color={color}
          setColor={setColor}
          bgColor={bgColor}
          setBgColor={setBgColor}
          size={size}
          setSize={setSize}
          opacity={opacity}
          setOpacity={setOpacity}
          colorTarget={colorTarget}
          setColorTarget={setColorTarget}
          activePalette={activePalette}
          setActivePalette={setActivePalette}
          drawCanvasRef={drawCanvasRef}
          bgCanvasRef={bgCanvasRef}
          fileInputRef={fileInputRef}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          mode={mode}
          canUndo={canUndo}
          canRedo={canRedo}
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          handleClearCanvas={handleClearCanvas}
          handleDownload={handleDownload}
          isAiPainting={isAiPainting}
          aiStatusMessage={aiStatusMessage}
          handleAiPaint={handleAiPaint}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          onTouchStart={onDown}
          onTouchMove={onMove}
          onTouchEnd={onUp}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>
    )
  }

  return (
    <>
      {!isOpen && (
        <FloatingButton onClick={() => setIsOpen(true)} />
      )}

      {isOpen && (
        <div
          ref={overlayRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'flex-end',
          }}
        >
          {/* Transparent Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              flex: 1,
              background: 'rgba(32,23,18,0.35)',
            }}
          />

          {/* Right Sliding Panel */}
          <div style={{
            width: 'min(720px, 95vw)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-8px 0 42px rgba(32,23,18,0.35)',
            animation: 'slideIn 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
          }}>
            <style>{`
              @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to   { transform: translateX(0);    opacity: 1; }
              }
            `}</style>
            <PanelContent
              tool={tool}
              setTool={setTool}
              color={color}
              setColor={setColor}
              bgColor={bgColor}
              setBgColor={setBgColor}
              size={size}
              setSize={setSize}
              opacity={opacity}
              setOpacity={setOpacity}
              colorTarget={colorTarget}
              setColorTarget={setColorTarget}
              activePalette={activePalette}
              setActivePalette={setActivePalette}
              drawCanvasRef={drawCanvasRef}
              bgCanvasRef={bgCanvasRef}
              fileInputRef={fileInputRef}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              mode={mode}
              canUndo={canUndo}
              canRedo={canRedo}
              handleUndo={handleUndo}
              handleRedo={handleRedo}
              handleClearCanvas={handleClearCanvas}
              handleDownload={handleDownload}
              isAiPainting={isAiPainting}
              aiStatusMessage={aiStatusMessage}
              handleAiPaint={handleAiPaint}
              onMouseDown={onDown}
              onMouseMove={onMove}
              onMouseUp={onUp}
              onMouseLeave={onUp}
              onTouchStart={onDown}
              onTouchMove={onMove}
              onTouchEnd={onUp}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
        </div>
      )}
    </>
  )
}
