import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MENSAJES_EXTRANAR, EXTRANAR_TEXTOS } from '../contenido'
import { barajar } from '../utilidades/medios'
import { leer, guardar } from '../utilidades/almacenamiento'
import { ENTRADA, SALIDA, resorteSuave } from '../utilidades/animaciones'

/* FLOR 5 — Para cuando me extrañes.
   Un mensaje distinto cada vez. Llevamos una bolsa barajada guardada
   en el navegador: no repite ninguno hasta que ella los haya visto
   todos, aunque vuelva a la página días después. */

const CLAVE = 'bolsa-extranar'

function bolsaNueva() {
  return barajar(MENSAJES_EXTRANAR.map((_, i) => i))
}

export default function RegaloExtranar() {
  const [mensaje, setMensaje] = useState(null)
  const [turno, setTurno] = useState(0)
  const bolsa = useRef(null)

  useEffect(() => {
    const guardada = leer(CLAVE, null)
    const valida =
      Array.isArray(guardada) &&
      guardada.every((i) => Number.isInteger(i) && i >= 0 && i < MENSAJES_EXTRANAR.length)
    bolsa.current = valida && guardada.length > 0 ? guardada : bolsaNueva()
  }, [])

  const sacarUno = useCallback(() => {
    if (!MENSAJES_EXTRANAR.length) return
    if (!bolsa.current || bolsa.current.length === 0) bolsa.current = bolsaNueva()
    const indice = bolsa.current.shift()
    guardar(CLAVE, bolsa.current)
    setMensaje(MENSAJES_EXTRANAR[indice])
    setTurno((t) => t + 1)
  }, [])

  const empezo = mensaje !== null

  return (
    <div className="extranar">
      <div className="cielo" aria-hidden="true">
        <span className="cielo__halo" />
        <svg viewBox="0 0 48 48" width="44" height="44" className="cielo__luna">
          <path
            d="M31.5 6.5a18 18 0 1 0 10 27.8A14.6 14.6 0 0 1 31.5 6.5Z"
            fill="var(--amarillo-claro)"
          />
          <path
            d="M31.5 6.5a18 18 0 0 0-8.9 33.6A20.4 20.4 0 0 1 31.5 6.5Z"
            fill="var(--amarillo)"
            opacity="0.45"
          />
        </svg>
        <span className="cielo__estrella cielo__estrella--a" />
        <span className="cielo__estrella cielo__estrella--b" />
        <span className="cielo__estrella cielo__estrella--c" />
      </div>

      <p className="display extranar__titulo">{EXTRANAR_TEXTOS.titulo}</p>
      <p className="cuerpo extranar__subtitulo">{EXTRANAR_TEXTOS.subtitulo}</p>

      <div className="extranar__escenario">
        <AnimatePresence mode="wait">
          {empezo && (
            <motion.blockquote
              key={turno}
              className="sobre"
              initial={{ opacity: 0, y: 24, scale: 0.95, filter: 'blur(9px)' }}
              animate={{
                opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
                transition: { duration: 0.85, ease: ENTRADA },
              }}
              exit={{
                opacity: 0, y: -14, scale: 0.98, filter: 'blur(5px)',
                transition: { duration: 0.3, ease: SALIDA },
              }}
            >
              {mensaje}
            </motion.blockquote>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        type="button"
        className="boton boton--principal"
        onClick={sacarUno}
        whileHover={{ scale: 1.022, y: -1 }}
        whileTap={{ scale: 0.965 }}
        transition={resorteSuave}
      >
        <span className="boton__texto">
          {empezo ? EXTRANAR_TEXTOS.botonOtra : EXTRANAR_TEXTOS.boton}
        </span>
      </motion.button>
    </div>
  )
}
