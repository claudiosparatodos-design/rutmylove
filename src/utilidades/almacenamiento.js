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

/* Lo único que la página recuerda entre visitas es la bolsa de
   mensajes de "para cuando me extrañes", para no repetirle ninguno
   hasta que los haya visto todos. Las flores abiertas no se guardan:
   cada visita empieza el jardín de cero.

   Esto se ocupa de dos cosas al arrancar:
     · borrar restos de versiones anteriores que ya no se usan
     · atender el  ?reiniciar  de la dirección, que vacía la bolsa
       de mensajes para poder probar desde el principio

   Lo de ?reiniciar se busca en tres sitios porque, si la página va
   dentro de un marco (una vista previa, por ejemplo), la dirección
   de arriba no siempre le llega. */

const OBSOLETAS = ['descubiertas']

export function prepararMemoria() {
  try {
    OBSOLETAS.forEach((clave) => window.localStorage.removeItem(PREFIJO + clave))

    const propia = window.location.href
    const dePapa = window.self !== window.top ? document.referrer || '' : ''
    if (![propia, dePapa].some((d) => /[?&#]reiniciar\b/.test(d))) return

    Object.keys(window.localStorage)
      .filter((k) => k.startsWith(PREFIJO))
      .forEach((k) => window.localStorage.removeItem(k))

    // Quitamos el parámetro para que ella nunca vea ese trozo raro
    const url = new URL(propia)
    url.searchParams.delete('reiniciar')
    if (url.hash === '#reiniciar') url.hash = ''
    window.history.replaceState(null, '', url.pathname + url.search + url.hash)
  } catch {
    /* sin memoria disponible: no hay nada que borrar */
  }
}
