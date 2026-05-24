'use client'
import { useState, useEffect, useCallback } from 'react'

const PIN = '1434'
const SESSION_KEY = 'hq_unlocked'
const SESSION_TTL = 4 * 60 * 60 * 1000 // 4 hours

// ─── Card data ────────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 'reglas',
    icon: '📋',
    title: 'Reglas de Operación',
    subtitle: 'REGLAS_DE_EJECUCION_v1.1.md · 25 reglas',
    color: '#d4ff00',
    endpoint: '/api/reglas',
    description: 'Arquitectura Colmena, deploy Vercel, SSH RPi, transcripción, lista negra IA, protocolo HO Castle.',
  },
  {
    id: 'transcripcion',
    icon: '🎙️',
    title: 'Transcripción Audio/Video',
    subtitle: 'Pipeline A (limpio) · Pipeline B (problemático)',
    color: '#ffb800',
    endpoint: '/api/transcripcion',
    description: 'Whisper local para Zoom/Meet. ffmpeg + Whisper API para HDMI, juzgados, cancelación de fase.',
  },
  {
    id: 'rpi',
    icon: '🍓',
    title: 'Acceso RPi',
    subtitle: '192.168.1.91 · pvrolo · SSH desde Beach House',
    color: '#ff6b6b',
    endpoint: '/api/rpi',
    description: 'Método SSH único que funciona. Bloque PowerShell completo listo para pegar.',
  },
  {
    id: 'busqueda',
    icon: '🔍',
    title: 'Motores de Búsqueda',
    subtitle: 'conversation_search · recent_chats',
    color: '#44ff88',
    endpoint: '/api/busqueda',
    description: 'Cuándo usar cada herramienta. Reglas de query, paginación, casos de borde.',
  },
  {
    id: 'rde-rpi',
    icon: '🐝',
    title: 'Reglas de Ejecución — RPi',
    subtitle: 'REGLAS_DE_EJECUCION_RPI_v1.md · 16 reglas + notas',
    color: '#a78bfa',
    endpoint: '/api/rde-rpi',
    description: 'Reglas de construcción de apps, arquitectura Colmena, listeners TCP, patrones de error, lecciones aprendidas.',
  },
  {
    id: 'rde-cloud',
    icon: '☁️',
    title: 'Reglas de Ejecución — Cloud',
    subtitle: 'REGLAS_DE_EJECUCION_CLOUD_v1.md',
    color: '#60a5fa',
    endpoint: '/api/rde-cloud',
    description: 'Deploy autónomo, arquitectura híbrida, env vars via API, flujo SPEC→CODE→GITHUB→VERCEL.',
  },
]

// ─── PIN Screen ───────────────────────────────────────────────────────────────
function PinScreen({ onUnlock }) {
  const [digits, setDigits] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleDigit = useCallback((d) => {
    if (digits.length >= 4) return
    const next = digits + d
    setDigits(next)
    setError(false)

    if (next.length === 4) {
      setTimeout(() => {
        if (next === PIN) {
          onUnlock()
        } else {
          setShake(true)
          setError(true)
          setTimeout(() => { setShake(false); setDigits('') }, 600)
        }
      }, 80)
    }
  }, [digits, onUnlock])

  const handleDel = useCallback(() => {
    setDigits(d => d.slice(0, -1))
    setError(false)
  }, [])

  useEffect(() => {
    function onKey(e) {
      if (e.key >= '0' && e.key <= '9') handleDigit(e.key)
      if (e.key === 'Backspace') handleDel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleDigit, handleDel])

  const KEYS = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    [null,'0','⌫'],
  ]

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, background: 'var(--bg)',
    }}>
      <div style={{
        width: '100%', maxWidth: 320,
        animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🐝</div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.3em',
            color: 'var(--text3)', marginBottom: 8, textTransform: 'uppercase',
          }}>
            La Colmena · HQ
          </div>
          <h1 style={{
            fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22,
            color: 'var(--text)', marginBottom: 6,
          }}>
            Cuartel General
          </h1>
          <p style={{ color: 'var(--text3)', fontSize: 13, fontFamily: 'var(--mono)' }}>
            Ingresa PIN para continuar
          </p>
        </div>

        {/* Dots */}
        <div style={{
          display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 40,
          transform: shake ? 'translateX(0)' : 'none',
          animation: shake ? 'shakeX 0.4s ease' : 'none',
        }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              width: 14, height: 14, borderRadius: '50%',
              background: i < digits.length
                ? (error ? 'var(--red)' : 'var(--accent)')
                : 'var(--bg4)',
              border: `2px solid ${i < digits.length
                ? (error ? 'var(--red)' : 'var(--accent)')
                : 'var(--border2)'}`,
              transition: 'all 0.15s ease',
              transform: i < digits.length ? 'scale(1.1)' : 'scale(1)',
            }} />
          ))}
        </div>

        {/* Keypad */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {KEYS.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              {row.map((key, ki) => (
                key === null ? (
                  <div key={ki} style={{ width: 80, height: 64 }} />
                ) : (
                  <button
                    key={ki}
                    onClick={() => key === '⌫' ? handleDel() : handleDigit(key)}
                    style={{
                      width: 80, height: 64,
                      background: key === '⌫' ? 'var(--bg3)' : 'var(--bg2)',
                      border: `1px solid var(--border)`,
                      borderRadius: 14,
                      color: key === '⌫' ? 'var(--text2)' : 'var(--text)',
                      fontFamily: key === '⌫' ? 'system-ui' : 'var(--mono)',
                      fontSize: key === '⌫' ? 20 : 22,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.1s ease',
                      userSelect: 'none',
                    }}
                    onMouseDown={e => e.currentTarget.style.background = 'var(--bg4)'}
                    onMouseUp={e => e.currentTarget.style.background = key === '⌫' ? 'var(--bg3)' : 'var(--bg2)'}
                    onMouseLeave={e => e.currentTarget.style.background = key === '⌫' ? 'var(--bg3)' : 'var(--bg2)'}
                  >
                    {key}
                  </button>
                )
              ))}
            </div>
          ))}
        </div>

        {error && (
          <div style={{
            textAlign: 'center', marginTop: 20,
            fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--red)',
            animation: 'fadeIn 0.2s ease',
          }}>
            PIN incorrecto
          </div>
        )}
      </div>

      <style>{`
        @keyframes shakeX {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  )
}

// ─── Card Modal — full content + copy ─────────────────────────────────────────
function CardModal({ card, onClose }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch(card.endpoint)
      .then(r => r.json())
      .then(d => { setContent(d.content); setLoading(false) })
      .catch(() => { setContent('Error cargando contenido.'); setLoading(false) })
  }, [card.endpoint])

  function handleCopy() {
    if (!content) return
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Close on backdrop click or Escape
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.88)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        zIndex: 100, backdropFilter: 'blur(6px)',
      }}
    >
      <div style={{
        background: 'var(--bg2)',
        border: `1px solid var(--border)`,
        borderTop: `2px solid ${card.color}`,
        borderRadius: '20px 20px 0 0',
        width: '100%', maxWidth: 680,
        maxHeight: '88vh',
        display: 'flex', flexDirection: 'column',
        animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
      }}>
        {/* Modal header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>{card.icon}</span>
            <div>
              <div style={{
                fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 17,
                color: 'var(--text)',
              }}>{card.title}</div>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)',
                marginTop: 2,
              }}>{card.subtitle}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handleCopy}
              disabled={loading || !content}
              style={{
                background: copied ? 'rgba(68,255,136,0.15)' : `rgba(${card.color === '#d4ff00' ? '212,255,0' : card.color === '#ffb800' ? '255,184,0' : card.color === '#ff6b6b' ? '255,107,107' : '68,255,136'},0.1)`,
                border: `1px solid ${copied ? 'var(--green)' : card.color}`,
                borderRadius: 8, padding: '8px 16px',
                color: copied ? 'var(--green)' : card.color,
                fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 13,
                cursor: loading ? 'default' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {copied ? '✓ Copiado' : '📋 Copiar todo'}
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'var(--bg3)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '8px 12px',
                color: 'var(--text2)', cursor: 'pointer',
                fontFamily: 'var(--mono)', fontSize: 13,
              }}
            >✕</button>
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex: 1, overflowY: 'auto',
          padding: '20px 24px',
        }}>
          {loading ? (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              height: 120, color: 'var(--text3)', fontFamily: 'var(--mono)', fontSize: 13,
            }}>
              <span style={{ animation: 'blink 1s ease infinite' }}>cargando...</span>
            </div>
          ) : (
            <pre style={{
              fontFamily: 'var(--mono)', fontSize: 13, lineHeight: 1.7,
              color: 'var(--text)', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              margin: 0,
            }}>
              {content}
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard() {
  const [activeCard, setActiveCard] = useState(null)
  const [copied, setCopied] = useState(null) // card id being quick-copied

  function quickCopy(card, e) {
    e.stopPropagation()
    fetch(card.endpoint)
      .then(r => r.json())
      .then(d => {
        navigator.clipboard.writeText(d.content)
        setCopied(card.id)
        setTimeout(() => setCopied(null), 2000)
      })
  }

  const now = new Date()
  const timeStr = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
  const dateStr = now.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '0 0 40px' }}>
      {/* Header bar */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>🐝</span>
          <div>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700,
              color: 'var(--accent)', letterSpacing: '0.05em',
            }}>HQ</div>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>La Colmena · Cuartel General</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--text2)' }}>{timeStr}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'capitalize' }}>{dateStr}</div>
        </div>
      </div>

      {/* Version badge */}
      <div style={{ padding: '12px 24px 0' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)',
            background: 'var(--bg3)', border: '1px solid var(--border)',
            padding: '2px 8px', borderRadius: 4, letterSpacing: '0.1em',
          }}>MVP v1.1</span>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)',
            background: 'rgba(212,255,0,0.08)', border: '1px solid rgba(212,255,0,0.2)',
            padding: '2px 8px', borderRadius: 4,
          }}>6 módulos activos</span>
        </div>
      </div>

      {/* Intro */}
      <div style={{ padding: '16px 24px 24px' }}>
        <p style={{
          fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text3)',
          lineHeight: 1.6, maxWidth: 540,
        }}>
          Contexto operativo para duendes. Haz <code style={{ color: 'var(--text2)' }}>web_fetch</code> a los endpoints{' '}
          <code style={{ color: 'var(--accent)' }}>/api/*</code> o abre una tarjeta y copia el bloque.
        </p>
      </div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 16, padding: '0 24px',
        maxWidth: 1000, margin: '0 auto',
      }}>
        {CARDS.map(card => (
          <div
            key={card.id}
            onClick={() => setActiveCard(card)}
            style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderLeft: `3px solid ${card.color}`,
              borderRadius: 14,
              padding: 20,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--bg3)'
              e.currentTarget.style.borderColor = 'var(--border2)'
              e.currentTarget.style.borderLeftColor = card.color
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--bg2)'
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.borderLeftColor = card.color
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {/* Card header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 28 }}>{card.icon}</span>
                <div>
                  <div style={{
                    fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15,
                    color: 'var(--text)', lineHeight: 1.2,
                  }}>{card.title}</div>
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)',
                    marginTop: 3, lineHeight: 1.4,
                  }}>{card.subtitle}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p style={{
              fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text2)',
              lineHeight: 1.6, marginBottom: 16,
            }}>
              {card.description}
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }} onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setActiveCard(card)}
                style={{
                  flex: 1,
                  background: 'var(--bg4)', border: '1px solid var(--border2)',
                  borderRadius: 8, padding: '8px 12px',
                  color: 'var(--text2)', fontFamily: 'var(--mono)',
                  fontSize: 12, cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = card.color }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.borderColor = 'var(--border2)' }}
              >
                📖 Ver
              </button>
              <button
                onClick={e => quickCopy(card, e)}
                style={{
                  flex: 1,
                  background: copied === card.id ? 'rgba(68,255,136,0.1)' : 'var(--bg4)',
                  border: `1px solid ${copied === card.id ? 'var(--green)' : 'var(--border2)'}`,
                  borderRadius: 8, padding: '8px 12px',
                  color: copied === card.id ? 'var(--green)' : 'var(--text2)',
                  fontFamily: 'var(--mono)', fontSize: 12,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {copied === card.id ? '✓ Copiado' : '📋 Copiar'}
              </button>
              <a
                href={card.endpoint}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  background: 'var(--bg4)', border: '1px solid var(--border2)',
                  borderRadius: 8, padding: '8px 10px',
                  color: 'var(--text3)', fontFamily: 'var(--mono)',
                  fontSize: 12, textDecoration: 'none',
                  display: 'flex', alignItems: 'center',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = card.color; e.currentTarget.style.borderColor = card.color }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.borderColor = 'var(--border2)' }}
                title="Abrir endpoint directo"
              >
                ↗
              </a>
            </div>

            {/* Endpoint label */}
            <div style={{
              marginTop: 12, paddingTop: 12,
              borderTop: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)',
              }}>GET</span>
              <code style={{
                fontFamily: 'var(--mono)', fontSize: 10,
                color: card.color, opacity: 0.8,
              }}>{card.endpoint}</code>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)',
          letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>
          hq.duendes.app · La Colmena v2 · {new Date().getFullYear()}
        </p>
      </div>

      {/* Modal */}
      {activeCard && (
        <CardModal card={activeCard} onClose={() => setActiveCard(null)} />
      )}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function HQ() {
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY)
      if (stored) {
        const { ts } = JSON.parse(stored)
        if (Date.now() - ts < SESSION_TTL) setUnlocked(true)
      }
    } catch {}
  }, [])

  function handleUnlock() {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ts: Date.now() }))
    } catch {}
    setUnlocked(true)
  }

  if (!unlocked) return <PinScreen onUnlock={handleUnlock} />
  return <Dashboard />
}
