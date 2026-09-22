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
