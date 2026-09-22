import { useMemo } from 'react'
import { useMenosMovimiento, useMedia } from '../utilidades/hooks'

/* Pétalos amarillos a la deriva.
   Pocos y lentos a propósito: son ambiente, no una lluvia.
   Todo se anima con transform/opacity para no costar batería. */

const FORMAS = [
  'M8 0 C 13 5, 14 12, 8 18 C 2 12, 3 5, 8 0 Z',
  'M8 0 C 15 6, 13 14, 8 18 C 3 14, 1 6, 8 0 Z',
  'M8 1 C 12 6, 12 13, 8 17 C 4 13, 4 6, 8 1 Z',
]

const TONOS = ['#F6CE5A', '#FADD93', '#EFCB63', '#F0BB43']

function sembrar(cantidad) {
  return Array.from({ length: cantidad }, (_, i) => ({
    id: i,
    izq: 4 + Math.random() * 92,
    escala: 0.5 + Math.random() * 0.75,
    duracion: 18 + Math.random() * 16,
    retraso: -Math.random() * 30,
    deriva: (Math.random() * 2 - 1) * 90,
    giro: (Math.random() * 2 - 1) * 260,
    forma: FORMAS[i % FORMAS.length],
    tono: TONOS[i % TONOS.length],
    opacidad: 0.22 + Math.random() * 0.24,
  }))
}

export default function PetalosFlotantes({ cantidad }) {
  const reducido = useMenosMovimiento()
  const esAncho = useMedia('(min-width: 768px)')
  const total = cantidad ?? (esAncho ? 8 : 5)

  const petalos = useMemo(() => sembrar(total), [total])

  if (reducido) return null

  return (
    <div className="petalos" aria-hidden="true">
      {petalos.map((p) => (
        <span
          key={p.id}
          className="petalo"
          style={{
            left: `${p.izq}%`,
            animationDuration: `${p.duracion}s`,
            animationDelay: `${p.retraso}s`,
            '--deriva': `${p.deriva}px`,
            '--giro': `${p.giro}deg`,
            '--escala': p.escala,
            '--opacidad': p.opacidad,
          }}
        >
          <svg viewBox="0 0 16 18" width="16" height="18">
            <path d={p.forma} fill={p.tono} />
          </svg>
        </span>
      ))}
    </div>
  )
}
