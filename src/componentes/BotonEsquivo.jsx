import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { usePunteroFino } from '../utilidades/hooks'

/* ══════════════════════════════════════════════════════════════
   El botón "NO TE AMO".

   Con mouse: huye cuando el cursor se acerca, y con más ganas
   cuanto más cerca esté.
   Con dedo: se aparta en cuanto detecta el intento de tocarlo.

   A cada intento le queda menos espacio, hasta que se rinde y
   termina escondido detrás de "TE AMO".

   Cómo elige a dónde ir: mira todos los huecos donde cabe dentro
   de su zona sin pisar "TE AMO", y se queda con el que esté más
   lejos del dedo o del cursor, prefiriendo los cercanos para que
   el movimiento se vea como un deslizamiento y no como un salto.

   Dos reglas que no se rompen nunca:
     · No sale de su zona, así que jamás provoca scroll horizontal.
     · Mientras se pueda jugar con él, no se posa encima de
       "TE AMO": si lo hiciera, ella apuntaría al "NO" y acabaría
       pulsando el "SÍ" sin querer.
   ══════════════════════════════════════════════════════════════ */

const INTENTOS_MAXIMOS = 7      // tras estos, se rinde
const RADIO_DE_ALERTA = 155     // a qué distancia (px) empieza a huir
const INTENTOS_PARA_BURLA = 3   // cuándo aparece el mensajito
const AIRE = 8                  // separación mínima con "TE AMO"
const PASO = 9                  // finura de la rejilla de huecos
const APEGO = 0.34              // cuánto prefiere los huecos cercanos

export default function BotonEsquivo({ etiqueta, zonaRef, refugioRef, onIntento, onRendicion }) {
  const botonRef = useRef(null)
  const [intentos, setIntentos] = useState(0)
  const [rendido, setRendido] = useState(false)
  const conMouse = usePunteroFino()

  /* Resortes: nunca da saltos, siempre se desliza. */
  const xCruda = useMotionValue(0)
  const yCruda = useMotionValue(0)
  const x = useSpring(xCruda, { stiffness: 190, damping: 21, mass: 0.85 })
  const y = useSpring(yCruda, { stiffness: 190, damping: 21, mass: 0.85 })

  /* Cuánta libertad le queda: 1 al principio, 0 cuando se rinde. */
  const libertad = Math.max(0, 1 - intentos / INTENTOS_MAXIMOS)

  /* Busca el mejor hueco libre para huir de (px, py).
     saltoMinimo obliga a que se mueva de verdad, no que tiemble. */
  const buscarHueco = useCallback(
    (px, py, saltoMinimo = 0, paso = PASO) => {
      const zona = zonaRef.current
      const boton = botonRef.current
      if (!zona || !boton) return null

      const z = zona.getBoundingClientRect()
      const b = boton.getBoundingClientRect()
      const ahoraX = x.get()
      const ahoraY = y.get()

      // Dónde está su sitio de reposo, sin el transform actual
      const reposoIzq = b.left - ahoraX
      const reposoArr = b.top - ahoraY

      const borde = 6
      const minX = z.left + borde - reposoIzq
      const maxX = z.right - borde - b.width - reposoIzq
      const minY = z.top + borde - reposoArr
      const maxY = z.bottom - borde - b.height - reposoArr

      // Cuanta menos libertad, menos espacio alrededor de su sitio
      const loX = Math.min(0, minX) * libertad
      const hiX = Math.max(0, maxX) * libertad
      const loY = Math.min(0, minY) * libertad
      const hiY = Math.max(0, maxY) * libertad

      const r = refugioRef?.current?.getBoundingClientRect()
      const pisaRefugio = (nx, ny) => {
        if (!r) return false
        const l = reposoIzq + nx
        const t = reposoArr + ny
        return (
          l + b.width > r.left - AIRE && l < r.right + AIRE &&
          t + b.height > r.top - AIRE && t < r.bottom + AIRE
        )
      }

      let mejor = null
      let mejorNota = -Infinity

      for (let ny = loY; ny <= hiY + 0.01; ny += paso) {
        for (let nx = loX; nx <= hiX + 0.01; nx += paso) {
          if (pisaRefugio(nx, ny)) continue
          const salto = Math.hypot(nx - ahoraX, ny - ahoraY)
          if (salto < saltoMinimo) continue
          const cx = reposoIzq + nx + b.width / 2
          const cy = reposoArr + ny + b.height / 2
          // Lejos del dedo, pero sin irse al otro extremo de golpe
          const nota = Math.hypot(cx - px, cy - py) - APEGO * salto
          if (nota > mejorNota) { mejorNota = nota; mejor = { nx, ny } }
        }
      }
      return mejor
    },
    [zonaRef, refugioRef, libertad, x, y],
  )

  const escapar = useCallback(
    (px, py, saltoMinimo = 0) => {
      // Si con el salto exigido no hay hueco, se conforma con cualquiera;
      // y si la rejilla es demasiado gruesa, la afina. Como último
      // recurso vuelve a su sitio de reposo, que siempre está libre.
      const sitio =
        buscarHueco(px, py, saltoMinimo) ??
        buscarHueco(px, py, 0) ??
        buscarHueco(px, py, 0, 3) ??
        { nx: 0, ny: 0 }
      xCruda.set(sitio.nx)
      yCruda.set(sitio.ny)
      return true
    },
    [buscarHueco, xCruda, yCruda],
  )

  const contarIntento = useCallback(() => {
    setIntentos((n) => {
      const siguiente = n + 1
      if (siguiente >= INTENTOS_MAXIMOS) setRendido(true)
      onIntento?.(siguiente)
      return siguiente
    })
  }, [onIntento])

  /* ── Con mouse: reacciona a la cercanía del cursor ── */
  useEffect(() => {
    if (!conMouse || rendido) return
    let pendiente = false
    let ultimo = { x: 0, y: 0 }
    let huyendo = false

    const procesar = () => {
      pendiente = false
      const boton = botonRef.current
      if (!boton) return
      const b = boton.getBoundingClientRect()
      const dist = Math.hypot(
        b.left + b.width / 2 - ultimo.x,
        b.top + b.height / 2 - ultimo.y,
      )

      if (dist < RADIO_DE_ALERTA) {
        // Cuanto más cerca esté el cursor, más lejos quiere irse
        const cercania = 1 - dist / RADIO_DE_ALERTA
        escapar(ultimo.x, ultimo.y, 14 + cercania * 46)
        if (!huyendo) { huyendo = true; contarIntento() }
      } else if (dist > RADIO_DE_ALERTA * 1.45) {
        huyendo = false
      }
    }

    const alMover = (e) => {
      ultimo = { x: e.clientX, y: e.clientY }
      if (!pendiente) { pendiente = true; requestAnimationFrame(procesar) }
    }

    window.addEventListener('pointermove', alMover, { passive: true })
    return () => window.removeEventListener('pointermove', alMover)
  }, [conMouse, rendido, escapar, contarIntento])

  /* Se esconde detrás de "TE AMO", asomándose apenas por arriba. */
  const esconderse = useCallback(() => {
    const boton = botonRef.current
    const refugio = refugioRef?.current
    if (!boton || !refugio) return
    const b = boton.getBoundingClientRect()
    const r = refugio.getBoundingClientRect()
    xCruda.set(r.left + r.width / 2 - (b.left + b.width / 2) + x.get())
    yCruda.set(r.top + r.height / 2 - (b.top + b.height / 2) + y.get() - 13)
  }, [refugioRef, x, y, xCruda, yCruda])

  useEffect(() => {
    if (!rendido) return
    esconderse()
    onRendicion?.()
  }, [rendido, esconderse, onRendicion])

  /* Al cambiar el tamaño de la ventana lo recolocamos: así nunca
     queda fuera de su zona ni encima de "TE AMO". */
  useEffect(() => {
    const alRedimensionar = () => {
      if (rendido) esconderse()
      else { xCruda.set(0); yCruda.set(0) }
    }
    window.addEventListener('resize', alRedimensionar)
    window.addEventListener('orientationchange', alRedimensionar)
    return () => {
      window.removeEventListener('resize', alRedimensionar)
      window.removeEventListener('orientationchange', alRedimensionar)
    }
  }, [rendido, esconderse, xCruda, yCruda])

  /* ── Con dedo (y como red de seguridad con mouse): al intentar
        tocarlo, se aparta antes de que el toque llegue a nada. ── */
  const alIntentarTocar = (e) => {
    if (rendido) return
    e.preventDefault()
    e.stopPropagation()
    const b = botonRef.current?.getBoundingClientRect()
    const px = e.clientX ?? (b ? b.left + b.width / 2 : 0)
    const py = e.clientY ?? (b ? b.top + b.height / 2 : 0)
    escapar(px, py, 42)
    contarIntento()
  }

  return (
    <motion.button
      ref={botonRef}
      type="button"
      aria-hidden={rendido ? 'true' : undefined}
      tabIndex={-1}
      className={`boton boton--suave boton--esquivo ${rendido ? 'esta-rendido' : ''}`}
      style={{ x, y }}
      animate={{ scale: rendido ? 0.82 : 1, opacity: rendido ? 0.7 : 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      onPointerDown={alIntentarTocar}
      onClick={(e) => e.preventDefault()}
    >
      <span className="boton__texto">{etiqueta}</span>
    </motion.button>
  )
}

export { INTENTOS_PARA_BURLA }
