import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { MUSICA_AMBIENTAL } from '../contenido'
import { resolverImagen } from '../utilidades/medios'
import { resorteSuave } from '../utilidades/animaciones'

/* Música de fondo — solo aparece si hay un archivo configurado
   en contenido.js, y NUNCA suena sola: siempre la enciende ella. */

export default function MusicaAmbiental() {
  const audio = useRef(null)
  const [sonando, setSonando] = useState(false)

  useEffect(() => {
    if (audio.current) audio.current.volume = MUSICA_AMBIENTAL.volumen ?? 0.25
  }, [])

  if (!MUSICA_AMBIENTAL.archivo) return null

  const alternar = async () => {
    const el = audio.current
    if (!el) return
    try {
      if (sonando) { el.pause(); setSonando(false) }
      else { await el.play(); setSonando(true) }
    } catch {
      // Si el navegador lo impide, el botón simplemente no cambia de estado
      setSonando(false)
    }
  }

  return (
    <>
      <audio
        ref={audio}
        src={resolverImagen(MUSICA_AMBIENTAL.archivo)}
        loop
        preload="none"
      />
      <motion.button
        type="button"
        className={`musica ${sonando ? 'esta-sonando' : ''}`}
        onClick={alternar}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.93 }}
        transition={resorteSuave}
        aria-pressed={sonando}
        aria-label={sonando ? 'Apagar la música' : 'Poner música'}
      >
        <span className="musica__ondas" aria-hidden="true">
          <span /><span /><span />
        </span>
      </motion.button>
    </>
  )
}
