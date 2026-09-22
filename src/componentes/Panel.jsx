import { useCallback, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { useBloquearScroll, useEscape, useMedia } from '../utilidades/hooks'
import { ENTRADA, SALIDA } from '../utilidades/animaciones'

/* Panel donde se abre cada regalo.
   En teléfono sube desde abajo como una hoja; en computadora
   aparece centrado con una escala mínima. En los dos casos el
   fondo se difumina en lugar de oscurecerse de golpe. */

export default function Panel({ abierto, alCerrar, titulo, icono, children }) {
  const hoja = useRef(null)
  const esAncho = useMedia('(min-width: 768px)')

  useBloquearScroll(abierto)
  useEscape(abierto, alCerrar)

  /* El foco entra al panel al abrirlo y vuelve a su sitio al cerrarlo. */
  useEffect(() => {
    if (!abierto) return
    const anterior = document.activeElement
    const t = setTimeout(() => hoja.current?.focus(), 60)
    return () => {
      clearTimeout(t)
      if (anterior instanceof HTMLElement) anterior.focus()
    }
  }, [abierto])

  const alFondo = useCallback(
    (e) => { if (e.target === e.currentTarget) alCerrar() },
    [alCerrar],
  )

  const movimiento = esAncho
    ? {
        initial: { opacity: 0, scale: 0.955, y: 18 },
        animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.62, ease: ENTRADA } },
        exit: { opacity: 0, scale: 0.975, y: 10, transition: { duration: 0.32, ease: SALIDA } },
      }
    : {
        initial: { y: '100%' },
        animate: { y: 0, transition: { type: 'spring', stiffness: 260, damping: 32, mass: 0.9 } },
        exit: { y: '100%', transition: { duration: 0.34, ease: SALIDA } },
      }

  return (
    <motion.div
      className="velo"
      onMouseDown={alFondo}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.42, ease: ENTRADA } }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: SALIDA } }}
    >
      <motion.section
        ref={hoja}
        className="panel"
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        tabIndex={-1}
        {...movimiento}
      >
        <header className="panel__cabeza">
          <span className="panel__agarre" aria-hidden="true" />
          <p className="panel__titulo">
            {titulo} {icono && <span aria-hidden="true">{icono}</span>}
          </p>
          <button
            type="button"
            className="panel__cerrar"
            onClick={alCerrar}
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="panel__cuerpo">{children}</div>
      </motion.section>
    </motion.div>
  )
}
