import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Boton from '../componentes/Boton'
import BotonEsquivo, { INTENTOS_PARA_BURLA } from '../componentes/BotonEsquivo'
import Flor from '../componentes/Flor'
import Titulo from '../componentes/Titulo'
import Estallido from '../componentes/Estallido'
import { INTRO } from '../contenido'
import { aparecer, enCascada, ENTRADA, resorteVivo } from '../utilidades/animaciones'

/* PANTALLA 1 — la puerta de entrada.
   Limpia, con mucho aire, y una sola flor todavía cerrada abajo:
   es la misma que florecerá al final de todo. */

export default function Intro({ alContinuar }) {
  const zona = useRef(null)
  const refugio = useRef(null)
  const [intentos, setIntentos] = useState(0)
  const [aceptado, setAceptado] = useState(false)

  const decirQueSi = () => {
    if (aceptado) return
    setAceptado(true)
  }

  /* Le damos su momento al estallido antes de cambiar de pantalla. */
  useEffect(() => {
    if (!aceptado) return
    const t = setTimeout(alContinuar, 1150)
    return () => clearTimeout(t)
  }, [aceptado, alContinuar])

  return (
    <motion.section
      className="pantalla intro"
      variants={enCascada(0.16, 0.25)}
      initial="oculto"
      animate="visible"
    >
      <div className="limite intro__centro">
        <motion.div variants={aparecer}>
          <Titulo className="display intro__saludo">{INTRO.saludo}</Titulo>
        </motion.div>

        <motion.p variants={aparecer} className="cuerpo intro__linea">
          {INTRO.linea1}
        </motion.p>

        <motion.p variants={aparecer} className="cuerpo intro__linea intro__linea--regla">
          {INTRO.linea2}
        </motion.p>

        <motion.p variants={aparecer} className="susurro intro__nota">
          {INTRO.nota}
        </motion.p>

        {/* Zona de juego: el botón esquivo nunca sale de aquí. */}
        <motion.div variants={aparecer} className="arena" ref={zona}>
          <div className="arena__centro">
            <div className="arena__pila">
              <AnimatePresence>
                {aceptado && <Estallido key="estallido" />}
              </AnimatePresence>

              <Boton
                ref={refugio}
                variante="principal"
                className="boton--grande"
                onClick={decirQueSi}
                animate={aceptado ? { scale: [1, 1.12, 1] } : {}}
                transition={aceptado ? { duration: 0.6, ease: ENTRADA } : resorteVivo}
              >
                {INTRO.botonSi}
              </Boton>
            </div>
          </div>

          {!aceptado && (
            <BotonEsquivo
              etiqueta={INTRO.botonNo}
              zonaRef={zona}
              refugioRef={refugio}
              onIntento={setIntentos}
            />
          )}
        </motion.div>

        <div className="burla__hueco" aria-live="polite">
          <AnimatePresence>
            {intentos >= INTENTOS_PARA_BURLA && !aceptado && (
              <motion.p
                key="burla"
                className="susurro burla"
                initial={{ opacity: 0, y: 8, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.7, ease: ENTRADA }}
              >
                {INTRO.burla}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* La flor del principio: todavía es un capullo. */}
      <motion.div
        variants={aparecer}
        className="intro__capullo"
        animate={aceptado ? { opacity: 0, y: 16 } : undefined}
        transition={{ duration: 0.7, ease: ENTRADA }}
      >
        <Flor tipo="primavera" apertura={aceptado ? 0.32 : 0.08} tamano={64} tallo />
      </motion.div>
    </motion.section>
  )
}
