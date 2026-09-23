/* localStorage a prueba de todo: en modo privado, con cookies bloqueadas
   o dentro de un iframe puede fallar, y la página debe seguir funcionando. */

const PREFIJO = 'jardin:'

export function leer(clave, porDefecto) {
  try {
    const crudo = window.localStorage.getItem(PREFIJO + clave)
    if (crudo == null) return porDefecto
    return JSON.parse(crudo)
  } catch {
    return porDefecto
  }
}

export function guardar(clave, valor) {
  try {
    window.localStorage.setItem(PREFIJO + clave, JSON.stringify(valor))
  } catch {
    /* sin memoria: la sesión sigue igual, solo no se recuerda */
  }
}

/* Borra todo lo que la página recuerda: las flores ya descubiertas y
   la bolsa de mensajes. Sirve para probar la experiencia desde cero.

   Se dispara poniendo  ?reiniciar  al final de la dirección.

   Miramos en tres sitios porque, si la página va dentro de un marco
   (una vista previa, por ejemplo), la dirección de arriba no siempre
   le llega: su propia dirección, el trozo tras la almohadilla, y como
   último recurso la página que la incrustó. */
export function reiniciarSiSePide() {
  try {
    const propia = window.location.href
    const dePapa = window.self !== window.top ? document.referrer || '' : ''
    const loPide = [propia, dePapa].some((d) => /[?&#]reiniciar\b/.test(d))
    if (!loPide) return

    Object.keys(window.localStorage)
      .filter((k) => k.startsWith(PREFIJO))
      .forEach((k) => window.localStorage.removeItem(k))

    // Quitamos el parámetro de nuestra propia dirección para que ella
    // nunca vea ese trozo raro en el enlace.
    const url = new URL(propia)
    url.searchParams.delete('reiniciar')
    if (url.hash === '#reiniciar') url.hash = ''
    window.history.replaceState(null, '', url.pathname + url.search + url.hash)
  } catch {
    /* sin memoria disponible: no hay nada que borrar */
  }
}
