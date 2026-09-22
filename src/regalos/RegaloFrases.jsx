import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FRASES, FRASE_FINAL, FRASES_TEXTOS } from '../contenido'
import { ENTRADA, SALIDA, resorteSuave } from '../utilidades/animaciones'

/* FLOR 2 — Cosas que amo de ti.
   Una frase a la vez. Las anteriores se quedan abajo, más tenues,
   como un montoncito de notas que ella va juntando. */

export default function RegaloFrases() {
  const [abiertas, setAbiertas] = useState([])
  const quedan = abiertas.length < FRASES.length
  const empezo = abiertas.length > 0

  const abrirOtra = () => {
    // La comprobación va dentro del actualizador: si llegan dos toques
    // muy seguidos, el segundo no puede colar una frase que no existe.
    setAbiertas((previas) =>
      previas.length >= FRASES.length ? previas : [...previas, FRASES[previas.length]],
    )
  }

  const actual = abiertas[abiertas.length - 1]
  const guardadas = abiertas.slice(0, -1)

  return (
    <div className="frases">
      <div className="frases__escenario">
        <AnimatePresence mode="popLayout" initial={false}>
          {!empezo && (
            <motion.p
              key="invitacion"
              className="display frases__invitacion"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: ENTRADA } }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.28, ease: SALIDA } }}
            >
              {FRASES_TEXTOS.invitacion}
            </motion.p>
          )}

          {actual && (
            <motion.blockquote
              key={abiertas.length}
              className="tarjeta"
              initial={{ opacity: 0, y: 30, scale: 0.94, rotate: -1.2, filter: 'blur(8px)' }}
              animate={{
                opacity: 1, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)',
                transition: { duration: 0.72, ease: ENTRADA },
              }}
              exit={{
                opacity: 0, y: -18, scale: 0.97,
                transition: { duration: 0.26, ease: SALIDA },
              }}
            >
              <span className="tarjeta__flor" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <g fill="var(--amarillo)">
                    <ellipse cx="12" cy="6" rx="3.4" ry="4.6" />
                    <ellipse cx="12" cy="18" rx="3.4" ry="4.6" />
                    <ellipse cx="6" cy="12" rx="4.6" ry="3.4" />
                    <ellipse cx="18" cy="12" rx="4.6" ry="3.4" />
                  </g>
                  <circle cx="12" cy="12" r="2.6" fill="var(--dorado)" />
                </svg>
              </span>
              <p className="tarjeta__texto">{actual}</p>
              <span className="tarjeta__conteo">
                {abiertas.length} de {FRASES.length}
              </span>
            </motion.blockquote>
          )}
        </AnimatePresence>
      </div>

      <div className="frases__pie">
        <AnimatePresence mode="wait">
          {quedan ? (
            <motion.button
              key="abrir"
              type="button"
              className="boton boton--principal"
              onClick={abrirOtra}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              whileHover={{ scale: 1.022, y: -1 }}
              whileTap={{ scale: 0.965 }}
              transition={resorteSuave}
            >
              <span className="boton__texto">
                {empezo ? FRASES_TEXTOS.boton : FRASES_TEXTOS.primerBoton}
              </span>
            </motion.button>
          ) : (
            <motion.p
              key="fin"
              className="cuerpo frases__fin"
              initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: ENTRADA, delay: 0.25 }}
            >
              {FRASE_FINAL}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      {/* Las que ya leyó, debajo del botón, como notas que va juntando */}
      {guardadas.length > 0 && (
        <motion.ul className="frases__guardadas" layout>
          <AnimatePresence initial={false}>
            {guardadas.slice().reverse().map((frase, i) => (
              <motion.li
                key={frase + i}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5, ease: ENTRADA }}
              >
                {frase}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  )
}
