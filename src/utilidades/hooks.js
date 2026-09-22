import { useEffect, useState, useRef } from 'react'

/* ¿El visitante pidió menos movimiento? */
export function useMenosMovimiento() {
  const [reducido, setReducido] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const leer = () => setReducido(mq.matches)
    leer()
    mq.addEventListener('change', leer)
    return () => mq.removeEventListener('change', leer)
  }, [])
  return reducido
}

/* Consulta de medios genérica. */
export function useMedia(consulta) {
  const [activo, setActivo] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(consulta)
    const leer = () => setActivo(mq.matches)
    leer()
    mq.addEventListener('change', leer)
    return () => mq.removeEventListener('change', leer)
  }, [consulta])
  return activo
}

/* ¿Es un dispositivo de puntero fino (mouse) o táctil? */
export function usePunteroFino() {
  return useMedia('(hover: hover) and (pointer: fine)')
}

/* Bloquea el scroll del fondo mientras hay algo abierto encima. */
export function useBloquearScroll(activo) {
  useEffect(() => {
    if (!activo) return
    const y = window.scrollY
    const { body } = document
    const anchoBarra = window.innerWidth - document.documentElement.clientWidth
    body.classList.add('sin-scroll')
    body.style.top = `-${y}px`
    body.style.position = 'fixed'
    body.style.width = '100%'
    if (anchoBarra > 0) body.style.paddingRight = `${anchoBarra}px`
    return () => {
      body.classList.remove('sin-scroll')
      body.style.top = ''
      body.style.position = ''
      body.style.width = ''
      body.style.paddingRight = ''
      window.scrollTo(0, y)
    }
  }, [activo])
}

/* Cierra con la tecla Escape. */
export function useEscape(activo, alCerrar) {
  useEffect(() => {
    if (!activo) return
    const alTeclear = (e) => { if (e.key === 'Escape') alCerrar() }
    window.addEventListener('keydown', alTeclear)
    return () => window.removeEventListener('keydown', alTeclear)
  }, [activo, alCerrar])
}

/* Aparición al llegar: marca un elemento como visible cuando entra en
   pantalla Y TAMBIÉN si ya quedó por encima.

   Esto último importa: con IntersectionObserver, si alguien salta de
   golpe al final de la página, los textos que se saltó no llegan a
   "intersecar" nunca y se quedarían invisibles para siempre. */
export function useAparicion(margen = 0.88) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible) return
    const mirar = () => {
      const el = ref.current
      if (!el) return
      if (el.getBoundingClientRect().top < window.innerHeight * margen) {
        setVisible(true)
      }
    }
    mirar()
    window.addEventListener('scroll', mirar, { passive: true })
    window.addEventListener('resize', mirar)
    return () => {
      window.removeEventListener('scroll', mirar)
      window.removeEventListener('resize', mirar)
    }
  }, [visible, margen])

  return [ref, visible]
}
