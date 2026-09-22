import { forwardRef } from 'react'
import { motion } from 'motion/react'
import { resorteVivo, tacto, roce } from '../utilidades/animaciones'

/* Botón con la microinteracción de toda la página.
   variante: 'principal' | 'suave' */
const Boton = forwardRef(function Boton(
  { variante = 'principal', className = '', children, ...resto },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      type="button"
      className={`boton boton--${variante} ${className}`}
      whileHover={roce}
      whileTap={tacto}
      transition={resorteVivo}
      {...resto}
    >
      <span className="boton__texto">{children}</span>
    </motion.button>
  )
})

export default Boton
