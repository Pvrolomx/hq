export async function GET() {
  const content = `PIPELINES DE TRANSCRIPCIÓN
════════════════════════════════════════════════════════════════════

DECISIÓN RÁPIDA
───────────────
Audio Zoom / Meet / Read.ai / micrófono limpio  →  PIPELINE A
Video de juzgado / HDMI / cancelación de fase   →  PIPELINE B

════════════════════════════════════════════════════════════════════
PIPELINE A — AUDIO LIMPIO
════════════════════════════════════════════════════════════════════

Herramienta:     Whisper LOCAL — modelo base (ya en caché)
Caché modelo:    C:\\Users\\pvrol\\.cache\\whisper\\base.pt  (145 MB)
Python:          C:\\Users\\pvrol\\AppData\\Local\\Programs\\Python\\Python312\\python.exe
Preprocesamiento: NINGUNO
Idioma:          language="en"  o  language="es"  según grabación
Velocidad:       ~28 min de audio = 2.5 min de procesamiento

Comando típico:
  python -m whisper "archivo.mp3" --model base --language es --output_format txt

Ideal para:
  • Reuniones Zoom / Google Meet
  • Grabaciones Read.ai
  • Micrófono directo (Blue Yeti, auriculares)
  • Audio de buena calidad en general

════════════════════════════════════════════════════════════════════
PIPELINE B — AUDIO PROBLEMÁTICO
════════════════════════════════════════════════════════════════════

Herramienta:  Whisper API OpenAI + ffmpeg preprocesamiento
Scripts:      D:\\transcripciones\\step1_v4.py  hasta  step4_v4.py

ffmpeg:
  C:\\Users\\pvrol\\AppData\\Local\\Microsoft\\WinGet\\Packages\\
  Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\
  ffmpeg-8.0.1-full_build\\bin\\ffmpeg.exe

────────────────────────────────────────────────────────────────────
B1 — AUDIO MUY BAJO (ganancia insuficiente, casi inaudible)
────────────────────────────────────────────────────────────────────
Filtro ffmpeg:
  -af "volume=50dB,acompressor=threshold=0.5:ratio=4:attack=5:release=50,alimiter=limit=0.99"

Descripción:
  • Boost agresivo de 50 dB
  • Compresor para nivelar dinámicas
  • Limiter para evitar clipping

────────────────────────────────────────────────────────────────────
B2 — CANCELACIÓN DE FASE STEREO (audio HDMI / cámara de juzgado)
────────────────────────────────────────────────────────────────────
Filtro ffmpeg:
  -af "pan=mono|c0=FL"

Descripción:
  • Extrae solo el canal izquierdo (FL) sin boost
  • Soluciona el fenómeno donde L+R en fase se cancelan al mezclar
  • NO agregar volumen — el audio ya tiene nivel adecuado
  • Resultado: voz inteligible desde canal que estaba en fase

Síntoma B2:
  Audio stereo suena muy bajo o "hueco" aunque el archivo tenga volumen.
  Al mezclar a mono la voz desaparece (cancelación de fase).

════════════════════════════════════════════════════════════════════
FLUJO COMPLETO PIPELINE B
════════════════════════════════════════════════════════════════════

Paso 1 — Identificar problema:
  Abrir en Audacity → escuchar L y R por separado.
  Si L tiene voz y R es inversión → B2.
  Si ambos canales tienen señal baja → B1.

Paso 2 — Preprocesar con ffmpeg:
  B1: ffmpeg -i input.mp4 -vn -af "volume=50dB,acompressor=...,alimiter=..." output_b1.wav
  B2: ffmpeg -i input.mp4 -vn -af "pan=mono|c0=FL" output_b2.wav

Paso 3 — Transcribir con Whisper API:
  python D:\\transcripciones\\step3_v4.py output_b1.wav
  (o step3_v4.py output_b2.wav)

Paso 4 — Post-procesamiento:
  python D:\\transcripciones\\step4_v4.py transcript.txt

════════════════════════════════════════════════════════════════════
NOTAS ADICIONALES
════════════════════════════════════════════════════════════════════

• Whisper API (B) es más preciso que Whisper LOCAL (A) para audio difícil.
• Para juzgados: siempre probar B2 primero — es el caso más común.
• Audios muy cortos (<30 seg): Whisper puede fallar — concatenar si es necesario.
• Idioma mixto español/inglés: usar language="es" y dejar que detecte inglés.
• Archivos >25 MB: dividir en chunks antes de enviar a la API.`

  return Response.json({ content })
}
