import { motion } from 'motion/react'
import Flor from '../componentes/Flor'
import Titulo from '../componentes/Titulo'
import { FINAL } from '../contenido'
import { ENTRADA } from '../utilidades/animaciones'
import { useAparicion } from '../utilidades/hooks'

/* PANTALLA FINAL — la flor que floreció.
   La misma flor que en la primera pantalla era un capullo, ahora abierta.
   Los textos van apareciendo conforme ella baja: así lee a su ritmo. */

const revelar = {
  oculto: { opacity: 0, y: 26, filter: 'blur(7px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.05, ease: ENTRADA },
  },
}

/* Un trozo de la carta final que aparece al llegar a él. */
function Aparece({ children, className = '', retraso = 0, como = motion.p }) {
  const Como = como
  const [ref, visible] = useAparicion()
  return (
    <Como
      ref={ref}
      className={className}
      variants={revelar}
      initial="oculto"
      animate={visible ? 'visible' : 'oculto'}
      transition={{ delay: retraso }}
    >
      {children}
    </Como>
  )
}

export default function Final({ alVolver }) {
  return (
    <section className="pantalla final">
      <div className="limite final__centro">
        <motion.div
          className="final__flor"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: ENTRADA, delay: 0.15 }}
        >
          <Flor tipo="primavera" apertura={1} tamano={168} respirar />
        </motion.div>

        <Aparece className="susurro final__sorpresa" retraso={0.75}>
          {FINAL.sorpresa}
        </Aparece>

        <Aparece como={motion.div} retraso={0.95}>
          <Titulo como="h1" className="display final__feliz">
            {FINAL.feliz}
          </Titulo>
        </Aparece>

        <div className="final__parrafos">
          <Aparece className="cuerpo final__parrafo">{FINAL.parrafo1}</Aparece>
          <Aparece className="cuerpo final__parrafo">{FINAL.parrafo2}</Aparece>
        </div>

        <Aparece className="display final__teamo">{FINAL.teAmo}</Aparece>

        <Aparece como={motion.div} className="final__separador">
          <span aria-hidden="true" />
          <Flor tipo="margarita" apertura={1} tamano={26} />
          <span aria-hidden="true" />
        </Aparece>

        <Aparece className="cuerpo final__mil">{FINAL.milFlores}</Aparece>

        {/* El mensaje más personal, al final de todo, en voz baja. */}
        <Aparece como={motion.figure} className="notita">
          <blockquote className="notita__texto">{FINAL.nota}</blockquote>
        </Aparece>

        <Aparece como={motion.div}>
          <motion.button
            type="button"
            className="final__volver"
            onClick={alVolver}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {FINAL.volver}
          </motion.button>
        </Aparece>
      </div>
    </section>
  )
}
