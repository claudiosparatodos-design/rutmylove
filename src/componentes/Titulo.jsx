import { partirEmojiFinal } from '../utilidades/medios'

/* Título con el emoji final a tamaño reducido. */
export default function Titulo({ children, className = '', como: Como = 'p', ...resto }) {
  const { texto, emoji } = partirEmojiFinal(children)
  return (
    <Como className={className} {...resto}>
      {texto}
      {emoji && (
        <>
          {' '}
          <span className="emoji-suave">{emoji}</span>
        </>
      )}
    </Como>
  )
}
