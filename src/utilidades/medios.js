/* Resuelve la ruta de una imagen escrita en contenido.js.
   Acepta:  "fotos/x.jpg"  ·  "/fotos/x.jpg"  ·  "https://..."  ·  "data:..."
   y la deja funcionando aunque el sitio viva en una subcarpeta. */
export function resolverImagen(ruta) {
  if (!ruta || typeof ruta !== 'string') return ''
  const limpia = ruta.trim()
  if (!limpia) return ''
  if (/^(https?:|data:|blob:)/i.test(limpia)) return limpia
  const base = import.meta.env.BASE_URL || '/'
  return base.replace(/\/$/, '') + '/' + limpia.replace(/^\//, '')
}

/* Convierte un texto con líneas en blanco en una lista de párrafos. */
export function enParrafos(texto) {
  if (!texto) return []
  return String(texto)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}

/* Baraja una copia del arreglo (Fisher–Yates). */
export function barajar(lista) {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

/* Deja el emoji final de un título a menor tamaño que las letras:
   así acompaña al texto en vez de gritar por encima de él. */
export function partirEmojiFinal(texto) {
  const m = String(texto ?? '').match(
    /^([\s\S]*?)\s*([\p{Extended_Pictographic}️‍\u{1F3FB}-\u{1F3FF}]+)$/u,
  )
  return m ? { texto: m[1], emoji: m[2] } : { texto: String(texto ?? ''), emoji: '' }
}
