import { useState } from 'react'
import { motion } from 'motion/react'
import FichaCancion from '../componentes/FichaCancion'
import { CANCION_MAS } from '../contenido'
import { enParrafos, resolverImagen } from '../utilidades/medios'
import { aparecer, enCascada, resorteSuave } from '../utilidades/animaciones'

/* FLOR 5 — Una canción más.
   Primero suena la canción, después el texto, y al final aparece
   el cartel de la película como cierre. */

function Cartel({ pelicula }) {
  const [cargado, setCargado] = useState(false)
  const src = resolverImagen(pelicula.cartel)

  return (
    <motion.figure
      className="pelicula"
      whileHover={{ y: -4 }}
      transition={resorteSuave}
    >
      <div className="pelicula__cartel">
        {!cargado && src && <span className="pelicula__esqueleto" aria-hidden="true" />}
        {src ? (
          <img
            src={src}
            alt={`Cartel de la película ${pelicula.titulo}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setCargado(true)}
            onError={() => setCargado(true)}
            style={{ opacity: cargado ? 1 : 0 }}
          />
        ) : null}
      </div>

      <figcaption className="pelicula__ficha">
        <p className="etiqueta">{pelicula.antesala}</p>
        <p className="display pelicula__titulo">{pelicula.titulo}</p>
        {pelicula.detalle && <p className="susurro">{pelicula.detalle}</p>}
      </figcaption>
    </motion.figure>
  )
}

export default function RegaloPelicula() {
  const parrafos = enParrafos(CANCION_MAS.texto)
  const { pelicula } = CANCION_MAS

  return (
    <motion.div
      className="mas"
      variants={enCascada(0.1, 0.05)}
      initial="oculto"
      animate="visible"
    >
      <motion.h3 variants={aparecer} className="display mas__titulo">
        {CANCION_MAS.titulo}
      </motion.h3>

      <motion.div variants={aparecer}>
        <FichaCancion cancion={CANCION_MAS.cancion} etiqueta="Escúchala" />
      </motion.div>

      <motion.div variants={aparecer} className="mas__texto">
        {parrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </motion.div>

      <motion.div variants={aparecer} className="mas__separador" aria-hidden="true">
        <span />
      </motion.div>

      <motion.div variants={aparecer}>
        <Cartel pelicula={pelicula} />
      </motion.div>

      {pelicula.donde && (
        <motion.p variants={aparecer} className="susurro mas__donde">
          {pelicula.donde}
        </motion.p>
      )}
    </motion.div>
  )
}
