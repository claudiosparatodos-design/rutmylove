import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import Intro from './pantallas/Intro'
import Jardin, { FLORES } from './pantallas/Jardin'
import Final from './pantallas/Final'
import Panel from './componentes/Panel'
import PetalosFlotantes from './componentes/PetalosFlotantes'
import MusicaAmbiental from './componentes/MusicaAmbiental'

import RegaloCancion from './regalos/RegaloCancion'
import RegaloFrases from './regalos/RegaloFrases'
import RegaloAlbum from './regalos/RegaloAlbum'
import RegaloCarta from './regalos/RegaloCarta'
import RegaloExtranar from './regalos/RegaloExtranar'

import { leer, guardar } from './utilidades/almacenamiento'
import { cambioDePantalla } from './utilidades/animaciones'
import { FRASES_TEXTOS, EXTRANAR_TEXTOS, REGALOS, JARDIN } from './contenido'

/* Qué componente vive dentro de cada flor. */
const CONTENIDO_DE_FLOR = {
  cancion:  { componente: RegaloCancion,  titulo: REGALOS.cancion.nombre,  icono: REGALOS.cancion.icono },
  frases:   { componente: RegaloFrases,   titulo: FRASES_TEXTOS.titulo,    icono: REGALOS.frases.icono },
  album:    { componente: RegaloAlbum,    titulo: REGALOS.album.nombre,    icono: REGALOS.album.icono },
  carta:    { componente: RegaloCarta,    titulo: REGALOS.carta.nombre,    icono: REGALOS.carta.icono },
  extranar: { componente: RegaloExtranar, titulo: EXTRANAR_TEXTOS.titulo,  icono: REGALOS.extranar.icono },
}

const TODAS = FLORES.map((f) => f.clave)

/* Cómo entra y sale cada pantalla completa. */
const movimiento = {
  initial: cambioDePantalla.inicial,
  animate: cambioDePantalla.animar,
  exit: cambioDePantalla.salir,
}

export default function App() {
  const [etapa, setEtapa] = useState('intro')          // intro · jardin · final
  const [abierta, setAbierta] = useState(null)         // flor abierta ahora mismo
  const [descubiertas, setDescubiertas] = useState(() => {
    const previas = leer('descubiertas', [])
    return Array.isArray(previas) ? previas.filter((c) => TODAS.includes(c)) : []
  })

  useEffect(() => { guardar('descubiertas', descubiertas) }, [descubiertas])

  const completo = useMemo(
    () => TODAS.every((clave) => descubiertas.includes(clave)),
    [descubiertas],
  )

  const abrirFlor = useCallback((clave) => {
    setAbierta(clave)
    setDescubiertas((previas) =>
      previas.includes(clave) ? previas : [...previas, clave],
    )
  }, [])

  const cerrarFlor = useCallback(() => setAbierta(null), [])

  const irA = useCallback((siguiente) => {
    setAbierta(null)
    setEtapa(siguiente)
  }, [])

  const alJardin = useCallback(() => irA('jardin'), [irA])
  const alFinal = useCallback(() => irA('final'), [irA])

  const regalo = abierta ? CONTENIDO_DE_FLOR[abierta] : null
  const Cuerpo = regalo?.componente

  return (
    <>
      <div className="fondo" aria-hidden="true">
        <span className="fondo__luz fondo__luz--alta" />
        <span className="fondo__luz fondo__luz--baja" />
      </div>
      <PetalosFlotantes />

      <main>
        {/* Cada pantalla empieza desde arriba, justo cuando la
            anterior ha terminado de irse. */}
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          {etapa === 'intro' && (
            <motion.div key="intro" {...movimiento}>
              <Intro alContinuar={alJardin} />
            </motion.div>
          )}

          {etapa === 'jardin' && (
            <motion.div key="jardin" {...movimiento}>
              <Jardin
                descubiertas={descubiertas}
                alAbrir={abrirFlor}
                completo={completo}
                alFinal={alFinal}
              />
            </motion.div>
          )}

          {etapa === 'final' && (
            <motion.div key="final" {...movimiento}>
              <Final alVolver={alJardin} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {regalo && (
          <Panel
            key={abierta}
            abierto
            alCerrar={cerrarFlor}
            titulo={regalo.titulo}
            icono={regalo.icono}
          >
            <Cuerpo />
          </Panel>
        )}
      </AnimatePresence>

      <MusicaAmbiental />

      {/* Aviso para lectores de pantalla cuando se abre la última
          pantalla: el cambio visual por sí solo no se anuncia. */}
      {etapa === 'jardin' && completo && (
        <span className="solo-lectores" role="status">
          {JARDIN.desbloqueoNota}
        </span>
      )}
    </>
  )
}

