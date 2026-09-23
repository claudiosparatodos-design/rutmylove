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
   la bolsa de mensajes. Útil para probar la experiencia desde cero.

   Se dispara abriendo la página con  ?reiniciar  al final de la
   dirección. Después se quita solo de la barra para que ella nunca
   vea ese trozo raro en el enlace. */
export function reiniciarSiSePide() {
  try {
    const url = new URL(window.location.href)
    if (!url.searchParams.has('reiniciar')) return
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith(PREFIJO))
      .forEach((k) => window.localStorage.removeItem(k))
    url.searchParams.delete('reiniciar')
    window.history.replaceState(null, '', url.pathname + url.search + url.hash)
  } catch {
    /* sin memoria disponible: no hay nada que borrar */
  }
}
