export async function GET() {
  const content = `MOTORES DE BÚSQUEDA EN CHATS — CUÁNDO USAR CADA UNO
════════════════════════════════════════════════════════════════════

REGLA MAESTRA
─────────────
Si el Arquitecto da referencia TEMPORAL  →  recent_chats primero.
Si da TEMA o NOMBRE                      →  conversation_search primero.
Si hay duda                              →  conversation_search con keywords más probables.

════════════════════════════════════════════════════════════════════
conversation_search — BÚSQUEDA POR CONTENIDO / TEMA
════════════════════════════════════════════════════════════════════

Qué hace:
  Busca chats por palabras clave que aparecieron en la conversación.
  Es una búsqueda de texto — necesita palabras del tema original.

Query:
  • Corto: 1-6 palabras clave del contenido.
  • Palabras que REALMENTE aparecieron en esa conversación.
  • Empieza amplio (1-2 palabras), luego estrecha.

✓ Usar cuando Rolo dice:
  "busca lo del caso Fidencio"        → query: "Fidencio restaurante"
  "el pipeline de whisper"            → query: "whisper transcripción"
  "lo de la calculadora fiscal"       → query: "calculadora INPC ISR"
  "busca el HO de PoderGen"           → query: "PoderGen POA"
  "el amparo de NITTA"                → query: "NITTA amparo jurisprudencia"

✗ NO usar palabras meta (describen el acto de hablar, no el contenido):
  INCORRECTO: "conversación sobre transcripción de ayer"
  INCORRECTO: "hablamos de whisper"
  INCORRECTO: "el chat donde discutimos"
  CORRECTO:   "whisper transcripción video"

Señales lingüísticas que activan conversation_search:
  • Posesivos sin contexto: "mi proyecto", "el caso de Armitage"
  • Artículo definido asumiendo referencia compartida: "el script", "la estrategia"
  • Verbos pasados sobre intercambios previos: "me recomendaste", "decidimos"
  • Preguntas directas: "¿recuerdas?", "¿qué dijiste sobre X?"

════════════════════════════════════════════════════════════════════
recent_chats — BÚSQUEDA POR TIEMPO
════════════════════════════════════════════════════════════════════

Qué hace:
  Recupera chats ordenados por fecha de actualización.
  Ideal cuando el anclaje es temporal, no temático.

Parámetros:
  n         → número de chats (máx 20 por llamada)
  before    → chats anteriores a esta fecha (ISO 8601)
  after     → chats posteriores a esta fecha (ISO 8601)
  sort_order → "desc" (más reciente primero) | "asc" (más antiguo primero)

✓ Usar cuando Rolo dice:
  "el chat de ayer"
  "la semana pasada"
  "el más reciente"
  "el primero que tuvimos"
  "continúa donde lo dejamos" (sin especificar tema)

Paginación (para más de 20 resultados):
  1. Llamar con n=20.
  2. Tomar el updated_at más antiguo del resultado.
  3. Llamar de nuevo con before=ese_updated_at.
  4. Repetir hasta cubrir el rango o hasta ~5 llamadas.
  5. Si no se cubrió: decirle a Rolo que el resumen no es completo.

════════════════════════════════════════════════════════════════════
COMBINANDO AMBAS HERRAMIENTAS
════════════════════════════════════════════════════════════════════

Si Rolo dice: "busca el chat de la semana pasada sobre el amparo de NITTA"
  1. recent_chats con rango temporal (after = hace 7 días).
  2. Si hay muchos resultados → conversation_search "NITTA amparo" para afinar.

Si Rolo dice: "sigue con lo de ayer" (sin tema):
  → recent_chats sort_order="desc" n=3, leer el más reciente relevante.

════════════════════════════════════════════════════════════════════
PROCESAMIENTO DE RESULTADOS
════════════════════════════════════════════════════════════════════

Los resultados llegan como snippets en tags:
  <chat uri='{uri}' url='{url}' updated_at='{updated_at}'>…</chat>

• Son material de referencia, NO texto para citar literalmente.
• Sintetizar naturalmente — no repetir los snippets al Arquitecto.
• Link de chat: https://claude.ai/chat/{uri}
• Si un snippet tiene contenido mixto (relevante + irrelevante):
  responder solo lo que se preguntó, ignorar el resto.
• Si la búsqueda regresa vacío: reintentar con términos más amplios
  o proceder con contexto actual. El contexto actual gana sobre el histórico.

════════════════════════════════════════════════════════════════════
NO BUSCAR CUANDO
════════════════════════════════════════════════════════════════════

✗ Preguntas sin señal de referencia pasada: "¿Qué es el amparo?" → responder directo.
✗ Info atemporal / estable: código Python básico, definiciones legales, conceptos.
✗ Cuando el contexto ya está en la conversación actual.
✗ Preguntas demasiado vagas para extraer keywords: "esa cosa que decidimos"
  → preguntar al Arquitecto cuál cosa antes de buscar.`

  return Response.json({ content })
}
