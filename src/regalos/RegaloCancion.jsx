import { motion } from 'motion/react'
import FichaCancion from '../componentes/FichaCancion'
import { CANCION } from '../contenido'
import { enParrafos } from '../utilidades/medios'
import { aparecer, enCascada } from '../utilidades/animaciones'

/* FLOR 1 — Una canción para ti.
   La canción y, debajo, la dedicatoria. */

export default function RegaloCancion() {
  const parrafos = enParrafos(CANCION.dedicatoria)

  return (
    <motion.div variants={enCascada(0.12, 0.05)} initial="oculto" animate="visible">
      <motion.div variants={aparecer}>
        <FichaCancion cancion={CANCION} />
      </motion.div>

      <motion.div variants={aparecer} className="dedicatoria">
        <span className="dedicatoria__comilla" aria-hidden="true">&ldquo;</span>
        {parrafos.map((p, i) => (
          <p key={i} className="dedicatoria__parrafo">{p}</p>
        ))}
      </motion.div>
    </motion.div>
  )
}
