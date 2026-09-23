# 🌼 Un pequeño jardín

Una experiencia web de primavera, hecha como regalo.

Seis flores amarillas. Cada una guarda una cosa distinta: una canción,
las cosas que amo de ti, nuestras fotos, una carta, otra canción con una
película, y algo para cuando me extrañes. Cuando las seis florecen,
aparece la última pantalla.

---

## Lo único que necesitas tocar

Todo el contenido vive en **un solo archivo**:

```
src/contenido.js
```

Ábrelo y cambia lo que está entre comillas. No necesitas entender nada más
del código. El archivo está numerado igual que esta lista:

| # | Qué cambias | Dónde |
|---|---|---|
| 1 | Cómo le dices a ella | `NOMBRES.ella` |
| 2 | Cómo firmas tú | `NOMBRES.tu` |
| 3 | Nombre de la canción | `CANCION.titulo` |
| 4 | Artista | `CANCION.artista` |
| 5 | Link de Spotify | `CANCION.spotify` |
| 6 | Portada de la canción | `CANCION.portada` |
| 7 | Dedicatoria de la canción | `CANCION.dedicatoria` |
| 8 | Frases románticas | `FRASES` |
| 9 | Fotografías | `FOTOS` → `imagen` |
| 10 | Texto de cada foto | `FOTOS` → `titulo`, `texto`, `fecha` |
| 11 | La carta | `CARTA.texto` |
| 12 | Mensajes de "para cuando me extrañes" | `MENSAJES_EXTRANAR` |
| 13 | La otra canción y la película | `CANCION_MAS` |

### Reglas rápidas para no romper nada

- El texto va **siempre entre comillas**.
- **No borres la coma** del final de cada línea.
- Si tu texto lleva comillas dobles por dentro, usa comillas simples por fuera.
- Para textos largos (la carta, la dedicatoria) usa los acentos invertidos
  `` ` `` y deja **una línea en blanco** entre párrafo y párrafo.

### Fotos y portadas

1. Guarda las fotos del álbum en **`public/fotos/`**
   y las portadas (disco, cartel de cine) en **`public/portadas/`**
2. En `contenido.js` escribe solo la ruta corta:

```js
export const FOTOS = [
  {
    imagen: 'fotos/primera-vez.jpg',
    titulo: 'Este momento...',
    texto: 'No sabía que ese día se volvería uno de mis favoritos.',
    fecha: 'Abril de 2024',   // opcional, puedes borrar esta línea
  },
]
```

Añade tantos bloques `{ ... }` como fotos quieras. Si dejas la lista vacía,
el álbum muestra un marco de ejemplo en lugar de romperse.

También puedes pegar un enlace directo (`https://...`) en vez de un archivo.

> **Consejo:** antes de subirlas, reduce las fotos a ~1600 px de ancho.
> La página abre mucho más rápido en el celular.

### Música de fondo (opcional)

Está apagada. Si quieres una, guarda un `.mp3` en `public/` y ponlo en
`MUSICA_AMBIENTAL.archivo`. Aparecerá un botón discreto abajo a la derecha.
Nunca suena sola: siempre la tiene que encender ella.

---

## Cómo verla

Necesitas [Node.js](https://nodejs.org) instalado (versión 18 o superior).

```bash
npm install     # solo la primera vez
npm run dev     # abre la dirección que aparece en la terminal
```

Para generar la versión final:

```bash
npm run build     # deja todo listo en la carpeta dist/
npm run preview   # para revisarla antes de publicar
```

## Dónde está publicada

Cada cambio que subas se publica solo en:

**<https://claudiosparatodos-design.github.io/rutmylove/>**

De eso se encarga `.github/workflows/publicar.yml`. Si algún día quieres
moverla de sitio, el proyecto usa `base: './'`, así que la carpeta `dist/`
funciona igual en la raíz de un dominio o dentro de una subcarpeta: la
puedes arrastrar tal cual a <https://app.netlify.com/drop>.

### Empezar de cero al probar

El jardín ya se reinicia solo cada vez que se abre la página. Lo único que
se recuerda entre visitas es qué mensajes de "para cuando me extrañes" ya
salieron, para no repetirle ninguno. Si quieres borrar también eso, abre la
página con `?reiniciar` al final de la dirección.

---

## Cómo está hecho

```
src/
├── contenido.js          ← TODO lo editable
├── App.jsx               ← une las tres pantallas y los cinco regalos
├── pantallas/
│   ├── Intro.jsx         ← "Hola niñaaaaa 💛" y el botón que huye
│   ├── Jardin.jsx        ← las cinco flores
│   └── Final.jsx         ← la flor que floreció
├── regalos/              ← el contenido de cada flor
│   ├── RegaloCancion.jsx
│   ├── RegaloFrases.jsx
│   ├── RegaloAlbum.jsx
│   ├── RegaloCarta.jsx
│   ├── RegaloPelicula.jsx
│   └── RegaloExtranar.jsx
├── componentes/
│   ├── Flor.jsx          ← la flor SVG: de capullo a flor abierta
│   ├── BotonEsquivo.jsx  ← el botón "NO TE AMO"
│   ├── Panel.jsx         ← donde se abre cada regalo
│   ├── FichaCancion.jsx  ← la canción con su portada y Spotify
│   ├── PetalosFlotantes.jsx
│   └── Estallido.jsx
├── estilos/              ← tokens de color, base y estilos por zona
└── utilidades/           ← animaciones compartidas y ayudas
```

**React + Vite + Motion.** Las flores son SVG dibujados con código
(no imágenes), así que pesan poco y se ven nítidas en cualquier pantalla.

### Detalles que quizá no se notan

- La flor de la primera pantalla es un **capullo cerrado**. La de la última
  es **la misma flor, completamente abierta**.
- Las flores que abre se quedan florecidas y con el nombre en dorado
  **durante esa visita**. Al recargar o volver otro día, el jardín está
  otra vez cerrado: puede vivir la experiencia entera las veces que quiera.
- Los mensajes de "para cuando me extrañes" salen barajados: **no repite
  ninguno** hasta que los haya visto todos.
- El botón "NO TE AMO" nunca se pone encima de "TE AMO" mientras se puede
  jugar con él, y jamás se sale de la pantalla.
- Si el sistema tiene activado *reducir movimiento*, las animaciones se
  desactivan solas.

---

La tipografía **Instrument Serif** viene incluida en el proyecto
(licencia SIL Open Font, ver `src/fuentes/LICENCIA.txt`), así que la página
se ve igual aunque no haya buena conexión.
