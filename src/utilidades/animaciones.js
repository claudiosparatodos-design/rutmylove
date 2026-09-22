/* Curvas y resortes compartidos.
   Todo el movimiento de la página sale de aquí para que se sienta
   como una sola pieza y no como animaciones sueltas. */

/* Easing tipo Apple: arranca decidido y frena muy suave. */
export const SUAVE = [0.22, 0.61, 0.36, 1]
export const ENTRADA = [0.16, 1, 0.3, 1]
export const SALIDA = [0.4, 0, 1, 1]

/* Resortes */
export const resorteSuave = { type: 'spring', stiffness: 170, damping: 26, mass: 0.9 }
export const resorteVivo = { type: 'spring', stiffness: 320, damping: 24, mass: 0.7 }

/* Aparición progresiva: sube un poco, se enfoca y entra. */
export const aparecer = {
  oculto: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: ENTRADA },
  },
}

/* Contenedor que va soltando a sus hijos uno detrás de otro. */
export const enCascada = (retraso = 0.12, inicio = 0.1) => ({
  oculto: {},
  visible: {
    transition: { staggerChildren: retraso, delayChildren: inicio },
  },
})

/* Transición entre pantallas completas. */
export const cambioDePantalla = {
  inicial: { opacity: 0, scale: 0.985, filter: 'blur(8px)' },
  animar: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: ENTRADA },
  },
  salir: {
    opacity: 0,
    scale: 1.012,
    filter: 'blur(8px)',
    transition: { duration: 0.5, ease: SALIDA },
  },
}

/* Microinteracción estándar de los botones. */
export const tacto = { scale: 0.965 }
export const roce = { scale: 1.022, y: -1 }
