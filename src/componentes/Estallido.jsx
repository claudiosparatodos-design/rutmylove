import { useMemo } from 'react'
import { motion } from 'motion/react'
import { ENTRADA } from '../utilidades/animaciones'

/* Corazones y pétalos que salen del botón "TE AMO".
   Dura poco más de un segundo y desaparece: es un guiño, no confeti. */

const TONOS = ['#F6CE5A', '#FADD93', '#EFCB63', '#E6AE2E']

export default function Estallido({ cantidad = 16 }) {
  const chispas = useMemo(
    () =>
      Array.from({ length: cantidad }, (_, i) => {
        const angulo = (i / cantidad) * Math.PI * 2 + Math.random() * 0.4
        const radio = 70 + Math.random() * 110
        return {
          id: i,
          x: Math.cos(angulo) * radio,
          y: Math.sin(angulo) * radio * 0.82 - 30,
          giro: (Math.random() * 2 - 1) * 180,
          escala: 0.55 + Math.random() * 0.6,
          demora: Math.random() * 0.12,
          corazon: i % 4 === 0,
          tono: TONOS[i % TONOS.length],
        }
      }),
    [cantidad],
  )

  return (
    <div className="estallido" aria-hidden="true">
      {chispas.map((c) => (
        <motion.span
          key={c.id}
          className="chispa"
          initial={{ x: 0, y: 0, scale: 0.2, opacity: 0, rotate: 0 }}
          animate={{
            x: c.x,
            y: c.y,
            scale: c.escala,
            opacity: [0, 1, 1, 0],
            rotate: c.giro,
          }}
          transition={{
            duration: 1.25,
            delay: c.demora,
            ease: ENTRADA,
            opacity: { times: [0, 0.16, 0.6, 1], duration: 1.25, delay: c.demora },
          }}
        >
          {c.corazon ? (
            <svg viewBox="0 0 20 18" width="13" height="12">
              <path
                d="M10 17.2 1.9 9.4C-.5 7 .3 2.9 3.6 1.6 5.9.7 8.4 1.6 10 3.6c1.6-2 4.1-2.9 6.4-2 3.3 1.3 4.1 5.4 1.7 7.8L10 17.2Z"
                fill="#D98F86"
                opacity="0.78"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 16 18" width="12" height="13">
              <path d="M8 0 C 13 5, 14 12, 8 18 C 2 12, 3 5, 8 0 Z" fill={c.tono} />
            </svg>
          )}
        </motion.span>
      ))}
    </div>
  )
}
