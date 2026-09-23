import { useState } from 'react'
import { motion } from 'motion/react'
import { resolverImagen } from '../utilidades/medios'
import { resorteSuave } from '../utilidades/animaciones'

/* Una canción: portada, nombre, artista y el enlace a Spotify.
   La usan las dos flores que llevan música.

   La portada entera es el enlace: tocarla lleva directo a la canción. */

function PortadaDeRespaldo() {
  // Si todavía no hay portada, dibujamos una en vez de dejar un hueco roto
  return (
    <svg viewBox="0 0 300 300" className="cancion__respaldo" aria-hidden="true">
      <rect width="300" height="300" fill="var(--amarillo-niebla)" />
      <circle cx="150" cy="150" r="96" fill="none" stroke="var(--amarillo-claro)" strokeWidth="1.5" />
      <circle cx="150" cy="150" r="66" fill="none" stroke="var(--amarillo-claro)" strokeWidth="1.5" />
      <circle cx="150" cy="150" r="36" fill="var(--amarillo-palido)" />
      <circle cx="150" cy="150" r="7" fill="var(--dorado-suave)" />
      <g fill="var(--dorado)" opacity="0.5">
        <path d="M196 96v52a15 15 0 1 1-8-13V110l-34 9v50a15 15 0 1 1-8-13v-62l50-13z" />
      </g>
    </svg>
  )
}

export default function FichaCancion({ cancion, etiqueta = 'La canción' }) {
  const [cargada, setCargada] = useState(false)
  const portada = resolverImagen(cancion.portada)

  return (
    <div className="cancion">
      <a
        className="cancion__portada"
        href={cancion.spotify}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Escuchar ${cancion.titulo} de ${cancion.artista} en Spotify`}
      >
        <motion.span
          className="cancion__marco"
          whileHover={{ scale: 1.02, y: -3 }}
          whileTap={{ scale: 0.985 }}
          transition={resorteSuave}
        >
          {portada ? (
            <>
              {!cargada && <span className="cancion__esqueleto" aria-hidden="true" />}
              <img
                src={portada}
                alt=""
                loading="lazy"
                decoding="async"
                onLoad={() => setCargada(true)}
                onError={(e) => { e.currentTarget.style.display = 'none'; setCargada(true) }}
                style={{ opacity: cargada ? 1 : 0 }}
              />
            </>
          ) : (
            <PortadaDeRespaldo />
          )}

          <span className="cancion__play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M8 5.6v12.8L19 12 8 5.6Z" fill="currentColor" />
            </svg>
          </span>
        </motion.span>
      </a>

      <div className="cancion__ficha">
        <p className="etiqueta">{etiqueta}</p>
        <h3 className="display cancion__titulo">{cancion.titulo}</h3>
        <p className="cuerpo cancion__artista">
          {cancion.artista}
          {cancion.album && <span className="cancion__album"> · {cancion.album}</span>}
        </p>

        {/* Onda decorativa: no reproduce nada, solo acompaña. */}
        <div className="onda" aria-hidden="true">
          {Array.from({ length: 22 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        <motion.a
          className="boton boton--principal boton--spotify"
          href={cancion.spotify}
          target="_blank"
          rel="noreferrer noopener"
          whileHover={{ scale: 1.022, y: -1 }}
          whileTap={{ scale: 0.965 }}
          transition={resorteSuave}
        >
          <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.59 14.43a.62.62 0 0 1-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.22c3.81-.87 7.08-.5 9.72 1.11.29.18.39.57.21.86Zm1.22-2.72a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 1 1-.45-1.49c3.63-1.1 8.15-.56 11.24 1.34.36.22.48.7.25 1.06Zm.11-2.84C14.7 8.95 9.4 8.77 6.32 9.7a.93.93 0 1 1-.54-1.79c3.54-1.07 9.39-.86 13.09 1.34a.94.94 0 0 1-.95 1.62Z"
            />
          </svg>
          <span className="boton__texto">Escuchar en Spotify</span>
        </motion.a>
      </div>
    </div>
  )
}
