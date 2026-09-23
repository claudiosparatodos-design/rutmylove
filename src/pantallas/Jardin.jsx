import { motion, AnimatePresence } from 'motion/react'
import Flor from '../componentes/Flor'
import Titulo from '../componentes/Titulo'
import { JARDIN, REGALOS } from '../contenido'
import { aparecer, enCascada, ENTRADA, resorteSuave } from '../utilidades/animaciones'

/* PANTALLA 2 — el jardín.
   Cinco flores distintas. Cada una guarda un regalo.
   Las que ya abrió quedan florecidas; las que no, siguen en capullo. */

export const FLORES = [
  { clave: 'cancion',  tipo: 'margarita', ...REGALOS.cancion,    desfase: 0 },
  { clave: 'frases',   tipo: 'tulipan',   ...REGALOS.frases,     desfase: -14 },
  { clave: 'album',    tipo: 'ranunculo', ...REGALOS.album,      desfase: 6 },
  { clave: 'carta',    tipo: 'estrella',  ...REGALOS.carta,      desfase: -10 },
  { clave: 'cancionMas', tipo: 'cosmos',  ...REGALOS.cancionMas, desfase: 10 },
  { clave: 'extranar', tipo: 'pompon',    ...REGALOS.extranar,   desfase: -4 },
]

export default function Jardin({ descubiertas, alAbrir, completo, alFinal }) {
  return (
    <motion.section
      className="pantalla jardin"
      variants={enCascada(0.1, 0.15)}
      initial="oculto"
      animate="visible"
    >
      <div className="limite-ancho">
        <motion.div variants={aparecer}>
          <Titulo como="h1" className="display jardin__titulo">
            {JARDIN.titulo}
          </Titulo>
        </motion.div>
        <motion.p variants={aparecer} className="cuerpo jardin__subtitulo">
          {JARDIN.subtitulo}
        </motion.p>
        {/* La pista solo hace falta la primera vez */}
        <div className="jardin__hueco-pista">
          <AnimatePresence>
            {descubiertas.length === 0 && (
              <motion.p
                key="pista"
                className="etiqueta jardin__pista"
                variants={aparecer}
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
              >
                {JARDIN.pista}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.ul variants={enCascada(0.09, 0.15)} className="jardin__lista">
          {FLORES.map((flor) => {
            const abierta = descubiertas.includes(flor.clave)
            return (
              <motion.li
                key={flor.clave}
                variants={aparecer}
                className="jardin__celda"
                style={{ '--desfase': `${flor.desfase}px` }}
              >
                <motion.button
                  type="button"
                  className={`flor-boton ${abierta ? 'esta-abierta' : ''}`}
                  onClick={() => alAbrir(flor.clave)}
                  whileHover={{ y: -7, scale: 1.035 }}
                  whileTap={{ scale: 0.955 }}
                  transition={resorteSuave}
                  aria-label={`${flor.nombre}${abierta ? ' (ya la abriste)' : ''}`}
                >
                  <span className="flor-boton__halo" aria-hidden="true" />
                  <span className="flor-boton__flor">
                    <Flor
                      tipo={flor.tipo}
                      apertura={abierta ? 1 : 0.34}
                      tamano="var(--flor-tam)"
                      tallo
                    />
                  </span>
                  <span className="flor-boton__nombre">
                    {flor.nombre}{'\u00A0'}
                    <span className="flor-boton__icono" aria-hidden="true">
                      {flor.icono}
                    </span>
                  </span>
                </motion.button>
              </motion.li>
            )
          })}
        </motion.ul>

        {/* Cuando ya abrió las cinco, algo florece al final del jardín.
            Nunca bloquea nada: simplemente aparece. */}
        <div className="jardin__cierre">
          <AnimatePresence>
            {completo && (
              <motion.button
                key="desbloqueo"
                type="button"
                className="desbloqueo"
                onClick={alFinal}
                initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.1, ease: ENTRADA, delay: 0.45 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Flor tipo="primavera" apertura={1} tamano={48} respirar />
                <span className="desbloqueo__texto">
                  <span className="desbloqueo__titulo">{JARDIN.desbloqueo}</span>
                  <span className="desbloqueo__nota">{JARDIN.desbloqueoNota}</span>
                </span>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    d="M9 5l7 7-7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}
