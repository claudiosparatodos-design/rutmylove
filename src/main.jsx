import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'

import './estilos/fuentes.css'
import './estilos/tokens.css'
import './estilos/base.css'
import './estilos/componentes.css'
import './estilos/pantallas.css'
import './estilos/regalos.css'

import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* reducedMotion="user": si el sistema pide menos movimiento,
        Motion deja de mover y escalar cosas por su cuenta. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
