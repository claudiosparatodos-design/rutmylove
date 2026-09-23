import { useId, useMemo } from 'react'
import { motion } from 'motion/react'
import { SUAVE } from '../utilidades/animaciones'

/* ════════════════════════════════════════════════════════════
   Flor  —  una sola flor SVG, dibujada a mano con matemáticas.

   Props:
     tipo      cuál de las seis flores dibujar
     apertura  0 = capullo cerrado   ·   1 = flor completamente abierta
     tamano    ancho: un número de píxeles o cualquier medida CSS
               (por ejemplo 'clamp(96px, 26vw, 132px)')
     tallo     dibuja tallo y hojas debajo
     respirar  movimiento vivo muy leve (úsalo con cuidado)
   ════════════════════════════════════════════════════════════ */

/* Cada flor tiene su propio amarillo para que las cinco del jardín
   se distingan entre sí sin romper la paleta. */
const PALETAS = {
  sol:         { tip: '#FDF0BE', medio: '#F6CE5A', base: '#E6AE2E', centro: '#C08A2E', polen: '#A9741F' },
  mantequilla: { tip: '#FFF6D8', medio: '#FADD93', base: '#EEC65F', centro: '#CFA043', polen: '#B08833' },
  miel:        { tip: '#FCE7A4', medio: '#F0BB43', base: '#DC9E22', centro: '#B07C22', polen: '#8F6417' },
  limon:       { tip: '#FFFAE2', medio: '#F8E19A', base: '#EFCB63', centro: '#C9A552', polen: '#A98B41' },
  ambar:       { tip: '#FBDE9B', medio: '#EFB43C', base: '#D79A22', centro: '#AE7A1E', polen: '#8B6015' },
  trigo:       { tip: '#FFF1C6', medio: '#F4D36E', base: '#E2B13E', centro: '#B98E30', polen: '#957020' },
}

/* Geometría de cada tipo de flor.
   corona = un anillo de pétalos.  Una flor puede tener dos anillos. */
const TIPOS = {
  /* ✿ muchos pétalos finos — tipo margarita */
  margarita: {
    paleta: 'sol',
    coronas: [{ n: 14, largo: 43, ancho: 6.6, punta: 0.9, giro: 0, forma: 'fina' }],
    centro: 7,
  },
  /* ✿ seis pétalos anchos y redondos */
  tulipan: {
    paleta: 'mantequilla',
    coronas: [{ n: 6, largo: 39, ancho: 18, punta: 0.55, giro: 0, forma: 'redonda' }],
    centro: 8.5,
  },
  /* ✿ dos anillos superpuestos — tipo ranúnculo */
  ranunculo: {
    paleta: 'miel',
    coronas: [
      { n: 9, largo: 41, ancho: 13, punta: 0.62, giro: 0, forma: 'redonda' },
      { n: 9, largo: 26, ancho: 10.5, punta: 0.6, giro: 20, forma: 'redonda', tono: 0.88 },
    ],
    centro: 6.5,
  },
  /* ✿ cinco pétalos en punta — tipo estrella */
  estrella: {
    paleta: 'limon',
    coronas: [{ n: 5, largo: 45, ancho: 15.5, punta: 1, forma: 'punta', giro: 0 }],
    centro: 8,
  },
  /* ✿ pompón denso de pétalos pequeños */
  pompon: {
    paleta: 'ambar',
    coronas: [
      { n: 10, largo: 35, ancho: 14, punta: 0.5, giro: 0, forma: 'redonda' },
      { n: 10, largo: 24, ancho: 11, punta: 0.5, giro: 18, forma: 'redonda', tono: 0.9 },
      { n: 7, largo: 14, ancho: 8, punta: 0.5, giro: 9, forma: 'redonda', tono: 0.8 },
    ],
    centro: 5,
  },
  /* ✿ ocho pétalos en punta con una corona pequeña dentro */
  cosmos: {
    paleta: 'trigo',
    coronas: [
      { n: 8, largo: 45, ancho: 12.5, punta: 1, giro: 0, forma: 'punta' },
      { n: 8, largo: 17, ancho: 7, punta: 0.5, giro: 22.5, forma: 'redonda', tono: 0.86 },
    ],
    centro: 6,
  },
  /* ✿ la flor de la historia: la del principio y la del final */
  primavera: {
    paleta: 'sol',
    coronas: [
      { n: 8, largo: 44, ancho: 15, punta: 0.68, giro: 0, forma: 'redonda' },
      { n: 8, largo: 28, ancho: 11, punta: 0.62, giro: 22.5, forma: 'redonda', tono: 0.9 },
    ],
    centro: 7.5,
  },
}

/* Dibuja un pétalo que nace en (0,0) y crece hacia arriba. */
function trazarPetalo(largo, ancho, punta, forma) {
  const L = -largo
  const a = ancho
  if (forma === 'punta') {
    // Hombros bajos y remate afilado
    return `M0 0 C ${-a} ${L * 0.3}, ${-a * 0.62} ${L * 0.72}, 0 ${L}
            C ${a * 0.62} ${L * 0.72}, ${a} ${L * 0.3}, 0 0 Z`
  }
  if (forma === 'fina') {
    // Pétalo alargado con la punta apenas redondeada
    return `M0 0 C ${-a} ${L * 0.34}, ${-a * 1.05} ${L * 0.82}, 0 ${L}
            C ${a * 1.05} ${L * 0.82}, ${a} ${L * 0.34}, 0 0 Z`
  }
  // 'redonda': cuchara ancha con la punta muy suave
  const p = 0.55 + punta * 0.45
  return `M0 0 C ${-a} ${L * 0.26}, ${-a * 1.18} ${L * p}, 0 ${L}
          C ${a * 1.18} ${L * p}, ${a} ${L * 0.26}, 0 0 Z`
}

function mezclar(hex, factor) {
  // Oscurece un color hacia el ámbar para los anillos interiores
  const n = parseInt(hex.slice(1), 16)
  const r = Math.round(((n >> 16) & 255) * factor)
  const g = Math.round(((n >> 8) & 255) * factor)
  const b = Math.round((n & 255) * factor)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export default function Flor({
  tipo = 'primavera',
  apertura = 1,
  tamano = 120,
  tallo = false,
  respirar = false,
  className = '',
  style,
  ...resto
}) {
  const id = useId().replace(/[:]/g, '')
  const receta = TIPOS[tipo] ?? TIPOS.primavera
  const color = PALETAS[receta.paleta]

  /* La apertura controla tres cosas a la vez:
     el largo del pétalo, su ancho y cuánto está girado hacia adentro.
     Con esas tres, un mismo dibujo pasa de capullo a flor abierta. */
  const a = Math.min(1, Math.max(0, apertura))
  const escalaY = 0.20 + 0.80 * a
  const escalaX = 0.34 + 0.66 * a
  const torsion = (1 - a) * 16
  const verdor = Math.max(0, 1 - a * 1.5) // el cáliz verde se esconde al abrir
  // Un capullo cerrado no es una flor pequeña: es otra silueta.
  // La dibujamos encima y se disuelve conforme la flor abre.
  const capullo = Math.max(0, 1 - a / 0.55)

  const petalos = useMemo(() => {
    const salida = []
    receta.coronas.forEach((corona, ci) => {
      const paso = 360 / corona.n
      for (let i = 0; i < corona.n; i++) {
        salida.push({
          clave: `${ci}-${i}`,
          anillo: ci,
          angulo: i * paso + (corona.giro || 0),
          d: trazarPetalo(corona.largo, corona.ancho, corona.punta, corona.forma),
          tono: corona.tono ?? 1,
        })
      }
    })
    return salida
  }, [receta])

  const alto = tallo ? 134 : 104

  return (
    <motion.svg
      viewBox={`-52 -54 104 ${alto}`}
      className={className}
      style={{
        width: typeof tamano === 'number' ? `${tamano}px` : tamano,
        height: 'auto',
        aspectRatio: `104 / ${alto}`,
        overflow: 'visible',
        display: 'block',
        ...style,
      }}
      aria-hidden="true"
      focusable="false"
      animate={respirar ? { scale: [1, 1.018, 1] } : undefined}
      transition={
        respirar
          ? { duration: 7, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
      {...resto}
    >
      <defs>
        {receta.coronas.map((_, ci) => {
          const t = receta.coronas[ci].tono ?? 1
          return (
            <linearGradient
              key={ci}
              id={`petalo-${id}-${ci}`}
              x1="0.5" y1="1" x2="0.5" y2="0"
            >
              <stop offset="0%" stopColor={mezclar(color.base, t)} />
              <stop offset="52%" stopColor={mezclar(color.medio, t)} />
              <stop offset="100%" stopColor={mezclar(color.tip, Math.min(1, t + 0.05))} />
            </linearGradient>
          )
        })}
        <linearGradient id={`capullo-${id}`} x1="0.5" y1="1" x2="0.38" y2="0">
          <stop offset="0%" stopColor={color.base} />
          <stop offset="58%" stopColor={color.medio} />
          <stop offset="100%" stopColor={color.tip} />
        </linearGradient>
        <radialGradient id={`centro-${id}`} cx="0.42" cy="0.36" r="0.72">
          <stop offset="0%" stopColor={color.centro} stopOpacity="0.82" />
          <stop offset="100%" stopColor={color.polen} />
        </radialGradient>
      </defs>

      {/* Tallo y hojas */}
      {tallo && (
        <g opacity="0.95">
          <path
            d="M0 4 C 1.5 22, -1.2 44, 0.4 70"
            fill="none"
            stroke="var(--verde-hondo)"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M0.2 38 C -11 34, -17.5 42, -19.5 50.5 C -10 52.5, -2 47.5, 0.2 38 Z"
            fill="var(--verde)"
            opacity="0.42"
          />
          <path
            d="M0.4 54 C 9.5 51, 15 57, 16.6 63.5 C 8.5 65.5, 2 61.5, 0.4 54 Z"
            fill="var(--verde)"
            opacity="0.32"
          />
        </g>
      )}

      {/* Cáliz verde: solo se ve mientras la flor está cerrada */}
      {verdor > 0.01 && (
        <g opacity={verdor * 0.75}>
          {[-34, 0, 34].map((ang) => (
            <path
              key={ang}
              transform={`rotate(${ang + 180})`}
              d="M0 0 C -6 -8, -5 -18, 0 -24 C 5 -18, 6 -8, 0 0 Z"
              fill="var(--verde)"
            />
          ))}
        </g>
      )}

      {/* Los pétalos, anillo por anillo */}
      {petalos.map((p) => (
        <path
          key={p.clave}
          d={p.d}
          fill={`url(#petalo-${id}-${p.anillo})`}
          stroke={mezclar(color.base, 0.97)}
          strokeWidth="0.45"
          strokeOpacity="0.28"
          style={{
            transform: `rotate(${p.angulo + torsion}deg) scale(${escalaX}, ${escalaY})`,
            transformOrigin: '0px 0px',
            transition: `transform 0.9s cubic-bezier(${SUAVE.join(',')})`,
          }}
        />
      ))}

      {/* Corazón de la flor */}
      <circle
        r={receta.centro * (0.62 + 0.38 * a)}
        fill={`url(#centro-${id})`}
        style={{
          transition: `r 0.9s cubic-bezier(${SUAVE.join(',')})`,
        }}
      />
      {/* Polen: puntitos dorados, solo cuando ya abrió */}
      {a > 0.55 && (
        <g opacity={(a - 0.55) / 0.45} fill={color.tip} fillOpacity="0.55">
          {[0, 72, 144, 216, 288].map((ang, i) => (
            <circle
              key={ang}
              r="0.9"
              cx={Math.cos(((ang + 18) * Math.PI) / 180) * receta.centro * 0.5}
              cy={Math.sin(((ang + 18) * Math.PI) / 180) * receta.centro * 0.5}
              opacity={0.6 + (i % 2) * 0.3}
            />
          ))}
        </g>
      )}
      {/* El capullo: tapa los pétalos mientras la flor está cerrada */}
      {capullo > 0.01 && (
        <g
          opacity={capullo}
          style={{
            transition: `opacity 0.9s cubic-bezier(${SUAVE.join(',')})`,
            transformOrigin: '0px 0px',
          }}
        >
          <path
            d="M0 -34 C 13 -27, 16.5 -10, 11 2 C 6.5 10, -6.5 10, -11 2 C -16.5 -10, -13 -27, 0 -34 Z"
            fill={`url(#capullo-${id})`}
            stroke={mezclar(color.base, 0.92)}
            strokeWidth="0.5"
            strokeOpacity="0.35"
          />
          {/* El pliegue por donde se abrirá */}
          <path
            d="M0 -32 C 5.5 -24, 6.5 -9, 4 1 C 2 4.5, -2 4.5, -4 1 C -6.5 -9, -5.5 -24, 0 -32 Z"
            fill={color.tip}
            opacity="0.3"
          />
          <path
            d="M0 -10 C 8.5 -7, 12.5 0, 13 7.5 C 5 8.5, -0.5 3, 0 -10 Z"
            fill="var(--verde)"
            opacity="0.62"
          />
          <path
            d="M0 -10 C -8.5 -7, -12.5 0, -13 7.5 C -5 8.5, 0.5 3, 0 -10 Z"
            fill="var(--verde-hondo)"
            opacity="0.4"
          />
        </g>
      )}
    </motion.svg>
  )
}
