/* ════════════════════════════════════════════════════════════════════════
   ✿  CONTENIDO — ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS EDITAR  ✿
   ────────────────────────────────────────────────────────────────────────
   Todo lo personalizable vive aquí. No necesitas entender el resto del
   código: cambia los textos entre comillas y listo.

   Reglas rápidas:
   · El texto va SIEMPRE entre comillas.  Ej:  nombre: "Ruth",
   · Si tu texto lleva comillas dobles por dentro, usa comillas simples fuera.
   · No borres las comas del final de cada línea.
   · Para las fotos: guárdalas en la carpeta  public/fotos/  y escribe aquí
     solamente  "fotos/nombre-de-la-foto.jpg"
   ════════════════════════════════════════════════════════════════════════ */

/* ───────────────────────────────────────────────────────────────
   1 y 2 · LOS NOMBRES
   ─────────────────────────────────────────────────────────────── */
export const NOMBRES = {
  // 1 · Cómo le dices a ella (aparece en varios lugares de la página)
  ella: 'rutsita',

  // 2 · Cómo firmas tú (aparece al final de la carta)
  tu: 'Sayet',
}

/* ───────────────────────────────────────────────────────────────
   3 al 7 · LA CANCIÓN   (Flor 1 — "Una canción para ti")
   ───────────────────────────────────────────────────────────────
   Para la portada tienes dos opciones:
     a) Guarda la imagen en  public/fotos/  y escribe:  "fotos/portada.jpg"
     b) Pega un enlace directo a la imagen:  "https://i.scdn.co/image/..."
   Si la dejas vacía ("") se muestra una portada ilustrada de respaldo.
   ─────────────────────────────────────────────────────────────── */
export const CANCION = {
  // 3 · Nombre de la canción
  titulo: 'Frenesí',

  // 4 · Artista
  artista: 'lil benjas',

  // 5 · Link de Spotify (pega aquí el enlace de la canción)
  spotify: 'https://open.spotify.com/track/2yQEs7Z02mF9hCKIYzkuXr',

  // 6 · Portada de la canción
  portada: 'portadas/frenesi.jpg',

  // 7 · Tu dedicatoria (puedes escribir varios párrafos separándolos con
  //     una línea en blanco, igual que aquí abajo)
  dedicatoria: `Te dedico esta canción porque me hace pensar en ti y porque hay
algo en ella que me recuerda a nosotros.

Escúchala cuando puedas, y piensa que la estoy escuchando contigo.`,
}

/* ───────────────────────────────────────────────────────────────
   8 · COSAS QUE AMO DE TI   (Flor 2)
   ───────────────────────────────────────────────────────────────
   Agrega, quita o cambia las frases que quieras.
   Cada frase va entre comillas y termina con coma.
   Se muestran una por una, en orden.
   ─────────────────────────────────────────────────────────────── */
export const FRASES = [
  'Eres mi sol en mis días nublados.',
  'Me encanta la forma en que haces que cualquier día normal se sienta especial.',
  'Me encanta poder ser yo cuando estoy contigo.',
  'Te elegiría una y mil veces sin dudarlo.',
  'Amo tu sonrisa, es la que me convenció de que la vida es bella.',
  'Entre más tiempo paso contigo, más me convenzo de que eres con quien quiero pasar toda mi vida ❤️',
  'Podría seguir escribiendo, pero esta página no tendría suficiente espacio para todo lo que amo de ti. Pero no te preocupes: el universo será testigo de las locuras que haré por ti, porque enamorarme de ti fue lo más fácil del mundo. Nada me importa más que tú, y cada día que estoy vivo estoy consciente de eso. Te amé desde el primer día en que te conocí, te amo hoy y te amaré por el resto de mi vida, no importa qué.',
]

// Mensaje que aparece cuando ya se acabaron todas las frases de arriba
export const FRASE_FINAL = 'Y todavía me faltan muchísimas cosas por decirte...'

/* ───────────────────────────────────────────────────────────────
   9 y 10 · NUESTROS MOMENTOS   (Flor 3 — el álbum de fotos)
   ───────────────────────────────────────────────────────────────
   Guarda tus fotos dentro de la carpeta  public/fotos/
   y agrégalas aquí abajo copiando el bloque { ... } tantas veces
   como fotos quieras.

     imagen  → obligatorio.  "fotos/como-se-llame.jpg"
     titulo  → opcional.     Una frase corta arriba de la descripción.
     texto   → opcional.     Tu frase personal sobre ese momento.
     fecha   → opcional.     Puedes borrar esta línea si no la quieres.

   Si dejas la lista vacía, el álbum muestra un marco de ejemplo.
   ─────────────────────────────────────────────────────────────── */
export const FOTOS = [
  {
    imagen: 'fotos/recuerdo-1-zucaritas.jpg',
    titulo: '',
    texto: 'Me hacías feliz con tus videos, esos que hacías para que cayera como gorda en tobogán, rendido a tus pies según tú jajajajaja. Na, pero en serio, me gustaban mucho esos videos que ni te pedía y me mandabas porque sí, me alegraban el día. Era muy bonito, neta que me dibujabas una sonrisota :) Ahora no veo unas Zucaritas sin pensar en ti jajajaja.',
    fecha: '',
  },
  {
    imagen: 'fotos/recuerdo-2-mascarilla.jpg',
    titulo: '',
    texto: 'Otra prueba de que me mandabas fotos bien cool jajajaja. ¿Aún te pones esas mascarillas? Hay que ponernos unas.',
    fecha: '',
  },
  {
    imagen: 'fotos/recuerdo-3-ipad.jpg',
    titulo: '',
    texto: 'Hasta te tenía de fondo de pantalla. Loco me traías, y me sigues teniendo. (Por cierto, esa iPad murió jajaja.)',
    fecha: '',
  },
  {
    imagen: 'fotos/recuerdo-4-facebook.jpg',
    titulo: '',
    texto: 'Las mejores indirectas jajaja. Y creo que ya me estoy tardando en mandarte otro audiolibro.',
    fecha: '',
  },
  {
    imagen: 'fotos/recuerdo-5-llamada.jpg',
    titulo: '',
    texto: 'Esas noches en las que hablábamos horas... que se repita. Por cierto, Google Fotos guarda muchos recuerdos jajajaja. Y me gusta decirte Rutelia, perdón si a ti no te gusta jajajaja, ya no te digo así pues. Bueno, nomás a veces, no te enojes.',
    fecha: '',
  },
]

// Mensaje que aparece al llegar al final del álbum
export const ALBUM_FINAL = 'Quiero seguir llenando este álbum contigo.'

/* ───────────────────────────────────────────────────────────────
   11 · LA CARTA   (Flor 4)
   ───────────────────────────────────────────────────────────────
   Escribe tu carta entre los acentos invertidos ` `.
   Deja UNA LÍNEA EN BLANCO entre párrafo y párrafo.
   Puedes escribir tan largo como quieras.
   ─────────────────────────────────────────────────────────────── */
export const CARTA = {
  // Encabezado de la hoja
  encabezado: 'Para mi rutsita 💛',

  // ✏️  AQUÍ VA TU CARTA  ✏️
  texto: `Ufff, pues hola, rutsita. Quería tener un detalle contigo y, por la
distancia, esta fue la manera que encontré para estar un poquito más cerca de
ti. De algo tenía que servir la carrera jajaja.

Aquí, en estas palabras, quería ser un poco más tranquilo y decirte que
realmente me gusta verte, y que me la paso bien cuando te veo. Son momentos en
los que no pienso en nada más, solo en ti y en la plática que tengo contigo. Mi
mente no está en ningún otro lado, solo contigo.

Eso es lo que me hace sentir la meditación, la música, el respirar... en fin,
cosas buenas. Por eso sé que me haces bien: es un sentimiento de paz y
tranquilidad, justamente la paz y la serenidad que me gustaría tener siempre en
mi vida. Y por eso disfruto estar contigo, y perderme en tu mirada.

Te quiero mucho, Rut. Espero poder verte pronto y abrazarte tan fuerte que nos
fundamos en uno mismo, un abrazo que dure 3 millones de años. Por lo mientras,
te mando un abrazote.

Y de una vez te aviso que planeo hacerte lovebombing. Una disculpa 😞, porque
quiero hacerte lovebombing 80 años y luego ghostearte cuando me muera. O sea,
ser un fantasma y estar contigo por la eternidad. Eso significa ghosting, ¿no?
jaja.

¿Aceptas?`,

  // Despedida
  despedida: 'Atentamente,',
  // La firma toma tu nombre de NOMBRES.tu (arriba del todo)
}

/* ───────────────────────────────────────────────────────────────
   12 · PARA CUANDO ME EXTRAÑES   (Flor 5)
   ───────────────────────────────────────────────────────────────
   Entre 10 y 20 mensajes funciona muy bien.
   La página los va barajando: no repite ninguno hasta que ella
   los haya visto todos.
   ─────────────────────────────────────────────────────────────── */
export const MENSAJES_EXTRANAR = [
  'Eres mi persona favorita.',
  'Si pudiera estar contigo ahora mismo, probablemente te estaría abrazando.',
  'Cierra los ojos un segundo. Imagíname un momento abrazándote.',
  'No importa cuántos kilómetros haya, siempre hay una parte de mí contigo.',
  'Si estás leyendo esto es porque me extrañas. Yo también, todo el tiempo.',
  'Amarte es tan fácil, me encanta :)',
  'Respira hondo. Estoy pensando en ti justo ahora, te lo prometo.',
  'Guárdame un abrazo. Te lo voy a cobrar completo.',
  'Hoy vi algo y pensé en ti. Me pasa casi siempre.',
  'Aunque no esté ahí, no estás sola. Nunca.',
  'Me gusta saber que estamos viendo la misma luna. Es poco, pero es algo.',
  'Extrañarte también es una forma de quererte.',
  'Falta menos que ayer para volver a verte.',
  'Si tienes un mal día, acuérdate de que alguien lejos está orgulloso de ti.',
  'Te quiero hoy, mañana y el día en que por fin pueda abrazarte otra vez.',
]

/* ───────────────────────────────────────────────────────────────
   13 · UNA CANCIÓN MÁS Y UNA PELÍCULA   (Flor 5)
   ───────────────────────────────────────────────────────────────
   Primero suena la canción, después viene tu texto, y al final
   aparece el cartel de la película como cierre.

   Las portadas viven en  public/portadas/
   ─────────────────────────────────────────────────────────────── */
export const CANCION_MAS = {
  titulo: 'Una canción más',

  cancion: {
    titulo: 'Arrullo de Estrellas',
    artista: 'Zoé',
    album: 'Programaton',
    spotify: 'https://open.spotify.com/track/1p4rYrxjVkj6v2eMzRhLfA',
    portada: 'portadas/arrullo-de-estrellas.jpg',
  },

  // ✏️  Tu texto. Deja una línea en blanco entre párrafo y párrafo.
  texto: `Esta otra canción ya te había dicho que la escucharas, pero no te había
dicho lo especial que es para mí.

Desde niño me gusta mucho Zoé, y hay una película que a lo mejor es de las
únicas que me gustan de amor jajaja, pero que realmente me gusta porque creo
que el mensaje que deja me pareció muy importante. Es una chica que olvida
todo cuando es un nuevo día, y este chico por casualidad termina enamorándose
de ella. Por obvias razones le es muy difícil mantener una relación con él,
porque ella lo olvida cada día, pero él sabía lo que quería y dio todo por
ella sin importar lo difícil que fuera, y decide enamorarla todos los días.

Y eso es lo que quiero hacer contigo: quiero enamorarte, no solo hoy o mañana,
sino siempre, todos los días que esté junto a ti. Y que no pase lo que suele
pasar, que las parejas se acostumbran, dejan de ser detallistas y ya no le
ponen el mismo empeño. Quiero que, si algún día la vida nos junta, no parar de
enamorarte cada día que pase. Esa es mi promesa.

Si algo llegara a pasar, yo no sé cuánto dure (espero que toda la vida), pero
cuando sientas que te fallé y que ya no tengo detalles, bótame para la calle,
porque quiero amarte siempre, que estés conmigo siempre. Si tengo errores,
házmelos saber. Yo quiero quererte y que tú quieras quererme: querer querernos :)

¿Y bueno, qué tiene que ver esto con la canción? jajaja. Al final de la
película lo verás. Esa canción se quedó muy dentro de mi corazón, tanto que me
prometí no dedicársela a nadie que no sintiera que fuera la indicada. Y yo
siento que tú eres la indicada, y eso ya lo sabía desde el primer día.

Te quiero, Rut. No sabes cuánto ❤️`,

  pelicula: {
    // Encabezado pequeño que anuncia la película
    antesala: 'La película',
    titulo: 'Como si fuera la primera vez',
    detalle: 'México · 2019',
    cartel: 'portadas/como-si-fuera-la-primera-vez.jpg',
    donde: 'P.D. La película está en Netflix.',
  },
}

/* ───────────────────────────────────────────────────────────────
   MÚSICA AMBIENTAL  (opcional — puedes ignorar esto)
   ───────────────────────────────────────────────────────────────
   Si quieres una musiquita de fondo, guarda un .mp3 en  public/
   y escribe aquí su nombre. Ej:  archivo: 'musica.mp3'
   NUNCA se reproduce sola: aparece un botón para que ella la encienda.
   Déjalo en null si no quieres música.
   ─────────────────────────────────────────────────────────────── */
export const MUSICA_AMBIENTAL = {
  archivo: null,
  volumen: 0.25,
}

/* ════════════════════════════════════════════════════════════════════════
   A PARTIR DE AQUÍ SON LOS TEXTOS DE LA EXPERIENCIA.
   Ya están escritos y funcionan tal cual. Cámbialos solo si quieres.
   ════════════════════════════════════════════════════════════════════════ */

/* PANTALLA 1 — Introducción */
export const INTRO = {
  saludo: 'Hola niñaaaaa 💛',
  linea1: 'Esta página es especialmente para ti.',
  linea2: 'Pero para continuar tienes que decir que me amas.',
  nota: 'Lo siento, yo no pongo las reglas.',
  botonSi: 'TE AMO 💛',
  botonNo: 'NO TE AMO',
  burla: 'Ya ni le intentes jajaja😌💛',
}

/* PANTALLA 2 — El jardín */
export const JARDIN = {
  titulo: 'Escoge un regalo, rutsita 🌼',
  subtitulo: 'Te preparé seis pequeñas cosas que me recuerdan a ti.',
  pista: 'Toca una flor',
  desbloqueo: 'Algo floreció',
  desbloqueoNota: 'Abriste las seis flores',
}

/* Nombres de cada flor del jardín */
export const REGALOS = {
  cancion: { nombre: 'Una canción para ti', icono: '🎵' },
  frases: { nombre: 'Cosas que amo de ti', icono: '💛' },
  album: { nombre: 'Recuerdos de ti', icono: '❤️' },
  carta: { nombre: 'Unas palabras para ti', icono: '💌' },
  cancionMas: { nombre: 'Una canción más', icono: '🎬' },
  extranar: { nombre: 'Para cuando me extrañes', icono: '🌙' },
}

/* Textos de la flor 2 y 5 */
export const FRASES_TEXTOS = {
  titulo: 'Cosas que amo de ti',
  invitacion: 'Abre una 💛',
  primerBoton: 'Abrir 💛',
  boton: 'Abrir otra',
}

export const EXTRANAR_TEXTOS = {
  titulo: 'Para cuando me extrañes',
  subtitulo: 'Si algún día me extrañas, vuelve aquí.',
  boton: '🌼 Abrir',
  botonOtra: '🌼 Abrir otro',
}

/* PANTALLA FINAL — La flor que floreció */
export const FINAL = {
  sorpresa: '¿Creíste que eso era todo?',
  feliz: 'Feliz primavera, mi niña. 🌼',
  parrafo1: `Este año no pude darte flores en persona...
así que intenté hacerte un pequeño jardín.`,
  parrafo2: `No es lo mismo que poder estar ahí contigo,
pero cada flor, cada palabra y cada detalle
los hice pensando en ti.`,
  teAmo: 'Te quiero.',
  milFlores: 'Te regalaría mil flores si pudiera.',

  // Mensaje final — texto exacto, no lo cambies si no quieres
  nota: 'Una disculpa por no poderte llevar flores amarillas, no estoy en Acambay, pero quería darte un detalle a mi manera y con esta distancia, espero te haya gustado, te quiero ❤️',

  volver: 'Volver al jardín',
}
