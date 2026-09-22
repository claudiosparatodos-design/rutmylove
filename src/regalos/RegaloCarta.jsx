import { motion } from 'motion/react'
import Titulo from '../componentes/Titulo'
import { CARTA, NOMBRES } from '../contenido'
import { enParrafos } from '../utilidades/medios'
import { ENTRADA } from '../utilidades/animaciones'

/* FLOR 4 — Una carta para ti.
   Una hoja de papel de verdad. El texto no aparece de golpe:
   se va revelando párrafo por párrafo, como si se escribiera sola. */

const revelarLinea = {
  oculto: { opacity: 0, y: 12, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.95, ease: ENTRADA },
  },
}

export default function RegaloCarta() {
  const parrafos = enParrafos(CARTA.texto)

  return (
    <motion.article
      className="carta"
      initial={{ opacity: 0, y: 26, rotateX: 5 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.85, ease: ENTRADA }}
    >
      <div className="carta__hoja">
        <motion.header
          className="carta__encabezado"
          variants={revelarLinea}
          initial="oculto"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <Titulo className="display carta__para">{CARTA.encabezado}</Titulo>
          <span className="carta__filete" aria-hidden="true" />
        </motion.header>

        <motion.div
          className="carta__texto"
          initial="oculto"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.42, delayChildren: 0.62 } },
          }}
        >
          {parrafos.map((p, i) => (
            <motion.p key={i} variants={revelarLinea}>
              {p}
            </motion.p>
          ))}
        </motion.div>

        <motion.footer
          className="carta__firma"
          variants={revelarLinea}
          initial="oculto"
          animate="visible"
          transition={{ delay: 0.62 + parrafos.length * 0.42 }}
        >
          <p className="carta__despedida">{CARTA.despedida}</p>
          <p className="display carta__nombre">{NOMBRES.tu}</p>
        </motion.footer>
      </div>
    </motion.article>
  )
}
