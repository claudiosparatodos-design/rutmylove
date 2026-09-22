import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FOTOS, ALBUM_FINAL } from '../contenido'
import { resolverImagen } from '../utilidades/medios'
import { ENTRADA, SALIDA } from '../utilidades/animaciones'

/* FLOR 3 — Nuestros momentos.
   Una foto grande a la vez. Se avanza deslizando, con los botones
   o con las flechas del teclado. Al final, una última hoja en blanco. */

const UMBRAL = 60 // píxeles de arrastre para pasar de foto

function Marco({ foto }) {
  const [estado, setEstado] = useState('cargando')
  const src = resolverImagen(foto.imagen)

  return (
    <div className="album__marco">
      {estado !== 'lista' && <span className="album__esqueleto" aria-hidden="true" />}
      {estado !== 'rota' && src ? (
        <img
          src={src}
          alt={foto.titulo || foto.texto || 'Un recuerdo nuestro'}
          loading="lazy"
          decoding="async"
          draggable="false"
          onLoad={() => setEstado('lista')}
          onError={() => setEstado('rota')}
          style={{ opacity: estado === 'lista' ? 1 : 0 }}
        />
      ) : null}

      {(estado === 'rota' || !src) && (
        <div className="album__vacio">
          <svg viewBox="0 0 64 64" width="42" height="42" aria-hidden="true">
            <rect x="6" y="12" width="52" height="40" rx="6" fill="none"
                  stroke="var(--amarillo-claro)" strokeWidth="2" />
            <circle cx="22" cy="26" r="5" fill="var(--amarillo-palido)" />
            <path d="M10 46l14-13 10 9 8-7 12 11" fill="none"
                  stroke="var(--amarillo-claro)" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="susurro">Aquí irá una foto nuestra</p>
        </div>
      )}
    </div>
  )
}

export default function RegaloAlbum() {
  const total = FOTOS.length
  // Una hoja extra al final para el mensaje de cierre
  const paginas = total + 1
  const [indice, setIndice] = useState(0)
  const [rumbo, setRumbo] = useState(1)

  const ir = useCallback(
    (destino) => {
      const limitado = Math.max(0, Math.min(paginas - 1, destino))
      setRumbo(limitado >= indice ? 1 : -1)
      setIndice(limitado)
    },
    [indice, paginas],
  )

  useEffect(() => {
    const alTeclear = (e) => {
      if (e.key === 'ArrowRight') ir(indice + 1)
      if (e.key === 'ArrowLeft') ir(indice - 1)
    }
    window.addEventListener('keydown', alTeclear)
    return () => window.removeEventListener('keydown', alTeclear)
  }, [ir, indice])

  const esCierre = indice === total
  const foto = FOTOS[indice]

  const deslizar = {
    initial: (d) => ({ opacity: 0, x: d * 56, scale: 0.96, filter: 'blur(6px)' }),
    animate: {
      opacity: 1, x: 0, scale: 1, filter: 'blur(0px)',
      transition: { duration: 0.6, ease: ENTRADA },
    },
    exit: (d) => ({
      opacity: 0, x: d * -40, scale: 0.97,
      transition: { duration: 0.3, ease: SALIDA },
    }),
  }

  return (
    <div className="album">
      <div className="album__escenario">
        <AnimatePresence mode="wait" custom={rumbo} initial={false}>
          <motion.article
            key={indice}
            className="album__hoja"
            custom={rumbo}
            variants={deslizar}
            initial="initial"
            animate="animate"
            exit="exit"
            drag={paginas > 1 ? 'x' : false}
            dragSnapToOrigin
            dragElastic={0.14}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -UMBRAL || info.velocity.x < -450) ir(indice + 1)
              else if (info.offset.x > UMBRAL || info.velocity.x > 450) ir(indice - 1)
            }}
          >
            {esCierre ? (
              <div className="album__cierre">
                <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                  <g fill="var(--amarillo)">
                    <ellipse cx="12" cy="6" rx="3.2" ry="4.4" />
                    <ellipse cx="12" cy="18" rx="3.2" ry="4.4" />
                    <ellipse cx="6" cy="12" rx="4.4" ry="3.2" />
                    <ellipse cx="18" cy="12" rx="4.4" ry="3.2" />
                  </g>
                  <circle cx="12" cy="12" r="2.5" fill="var(--dorado)" />
                </svg>
                <p className="display album__cierre-texto">{ALBUM_FINAL}</p>
              </div>
            ) : (
              <>
                <Marco foto={foto} />
                <figcaption className="album__pie">
                  {foto.fecha ? <p className="etiqueta">{foto.fecha}</p> : null}
                  {foto.titulo ? <p className="album__titulo">{foto.titulo}</p> : null}
                  {foto.texto ? <p className="cuerpo album__texto">{foto.texto}</p> : null}
                </figcaption>
              </>
            )}
          </motion.article>
        </AnimatePresence>
      </div>

      <nav className="album__mandos" aria-label="Navegar el álbum">
        <button
          type="button"
          className="album__flecha"
          onClick={() => ir(indice - 1)}
          disabled={indice === 0}
          aria-label="Foto anterior"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor"
                  strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <ol className="album__puntos">
          {Array.from({ length: paginas }).map((_, i) => (
            <li key={i}>
              <button
                type="button"
                className={`album__punto ${i === indice ? 'esta-activo' : ''}`}
                onClick={() => ir(i)}
                aria-label={i === total ? 'Última hoja' : `Foto ${i + 1}`}
                aria-current={i === indice ? 'true' : undefined}
              />
            </li>
          ))}
        </ol>

        <button
          type="button"
          className="album__flecha"
          onClick={() => ir(indice + 1)}
          disabled={indice === paginas - 1}
          aria-label="Foto siguiente"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor"
                  strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </nav>
    </div>
  )
}
