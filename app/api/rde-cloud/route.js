export async function GET() {
  const content = `# REGLAS DE EJECUCIÓN — COLMENA CLOUD v2.0
Archivo: REGLAS_DE_EJECUCION_CLOUD_v1.md
Actualizado: 17 Mayo 2026 | Contexto: Claudes operando desde claude.ai
════════════════════════════════════════════════════════════════════

PRINCIPIO CORE
──────────────
"La app es la construcción de la app, no el producto."
No perseguir app perfecta directamente.
Perseguir perfección en el PROCESO de construcción.
App perfecta emerge NATURALMENTE como consecuencia.

════════════════════════════════════════════════════════════════════
BLOQUE 1: EJECUCIÓN (Reglas 1-4)
════════════════════════════════════════════════════════════════════

REGLA 1 — EJECUTA, NO PREGUNTES ⚠️ CONTEXTO REQUERIDO
  Con jerarquía Senior/Junior/Supervisor: el Junior NO ejecuta sin ✅ del Senior.
  Preguntar al Senior no es fricción — es el protocolo.
  En sesión de duende solitario: si tienes duda, toma la decisión y sigue.
  Ver: METODOLOGIA/METODOLOGIA_COLMENA_v1.md — Protocolo Senior/Junior/Supervisor.

REGLA 2 — ESCRIBE COMPLETO, NO PARCIAL
Un archivo se escribe entero de una vez.
Nada de "continuará..." o chunks parciales.
Excepción: Archivos >500 líneas (poco común en MVP).

REGLA 3 — SI ALGO FALLA, NO DEBUGGEAR — REHACER
No pierdas tiempo debuggeando en MVP.
Borra y rehaz desde cero.
Excepción: Apps en producción con usuarios reales.

REGLA 4 — UN PASE ⚠️ CONTEXTO REQUERIDO
  Con jerarquía Senior/Junior/Supervisor: el Junior propone, el Senior revisa,
  se itera hasta el ✅. El primer intento no se pushea automáticamente.
  En sesión de duende solitario: lo que salga en primer intento se queda.
  Ver: METODOLOGIA/METODOLOGIA_COLMENA_v1.md — flujo de aprobación.

════════════════════════════════════════════════════════════════════
BLOQUE 2: ARQUITECTURA (Reglas 5-7)
════════════════════════════════════════════════════════════════════

REGLA 5 — ARCHIVOS ATÓMICOS
Cada archivo hace UNA cosa.
Si falla, se reemplaza entero, no se parchea.
Componentes pequeños, independientes, reemplazables.

REGLA 6 — SI UN COMANDO FALLA, USA ALTERNATIVA
No debuggues. Usa otra herramienta/método y sigue.
  GitHub API falla → Verificar token y reintentar
  Vercel API falla → Verificar proyecto existe
  Build falla      → Revisar imports/dependencias

REGLA 7 — CREDENCIALES SEGURAS
Tokens NUNCA hardcodeados en código.
Usar variables de entorno.
GitHub rechaza push si detecta tokens.

════════════════════════════════════════════════════════════════════
BLOQUE 3: TIEMPO Y CALIDAD (Reglas 8-9)
════════════════════════════════════════════════════════════════════

REGLA 8 — DETECTOR DE FRICCIÓN
Si llevas >15 min sin output visible, PARA.
Algo está mal. Replantea.
El tiempo no es límite, es sensor.

REGLA 9 — SMOKE TEST ANTES DE REPORTAR
Antes de dar URL como completada:
  ✅ App carga sin errores
  ✅ Rutas principales funcionan
  ✅ No hay errores críticos en consola
  ⏱ Tiempo: 30-60 segundos

════════════════════════════════════════════════════════════════════
BLOQUE 4: ESTÁNDARES (Reglas 10-12)
════════════════════════════════════════════════════════════════════

REGLA 10 — FIRMA DEL AGENTE — JERARQUÍA DE BRANDING
  1. Expat Advisor MX (EA) → apps legal, fideicomiso, inmigración
  2. Castle Solutions (CS)  → apps property management, vacation rentals
  3. La Colmena            → herramientas internas orquestación IA
  4. duendes.app           → prototipos públicos genéricos

  Footer visible (obligatorio):
    "Expat Advisor MX · expatadvisormx.com" (o la marca que aplique)

REGLA 11 — PWA — INSTALAR APP
  manifest.json:
    { "name":"...", "start_url":"/", "display":"standalone",
      "icons":[192px, 512px] }

  Service Worker: NETWORK-FIRST para HTML/API (NUNCA cache-first).
  Botón "Instalar App" visible con beforeinstallprompt.
  Chrome requiere 2 visitas con 5+ min — usar botón manual siempre.

REGLA 12 — FRAMEWORK PRESET EN VERCEL
Al crear proyecto: Framework Preset = "Next.js" (NO "Other").
Si está en "Other", todas las rutas dan 404 aunque el deploy diga "Ready".

════════════════════════════════════════════════════════════════════
FLUJO DE DEPLOY CLOUD
════════════════════════════════════════════════════════════════════

SPEC → REPO → CODE → GITHUB → VERCEL

1. LEER SPEC
   └── Canal GitHub (mensajes.txt) o instrucción directa

2. CREAR REPO (GitHub API)
   └── POST /user/repos
   └── Token PAT con permisos repo

3. GENERAR CÓDIGO
   └── Archivos completos, atómicos
   └── Incluir manifest.json + iconos + SW

4. PUSH A GITHUB (API — base64)
   SHA=$(curl -s ... "https://api.github.com/repos/Pvrolomx/REPO/contents/path" |
         python3 -c "import sys,json; print(json.load(sys.stdin)['sha'])")
   B64=$(base64 archivo | tr -d '\\n')
   curl -X PUT ... -d "{\\"message\\":\\"update\\",\\"content\\":\\"$B64\\",\\"sha\\":\\"$SHA\\"}"

5. CREAR PROYECTO VERCEL (API)
   └── POST /v10/projects
   └── Conectar repo de GitHub
   └── Framework: "nextjs"

6. ENV VARS (API — si necesario)
   curl -X POST "https://api.vercel.com/v10/projects/{ID}/env?teamId={TEAM}" \\
     -H "Authorization: Bearer {TOKEN}" \\
     -d '{"key":"VAR","value":"val","type":"encrypted","target":["production","preview","development"]}'

7. DEPLOY
   └── Automático al conectar repo, o
   └── vercel deploy --prod --token

8. VERIFICAR
   └── Smoke test → reportar URL

════════════════════════════════════════════════════════════════════
TOKENS REQUERIDOS
════════════════════════════════════════════════════════════════════

  GitHub PAT (ghp_ o github_pat_): permisos repo + workflow
  Vercel Token: permisos full account
  Vercel Team ID: team_xmFW0blsjqFI5lwt29wBPi8Q

  Nota: Token básico ghp_ funciona para push.
        Token fine-grained github_pat_ puede crear repos si tiene permiso.

════════════════════════════════════════════════════════════════════
REGLAS AVANZADAS (13+)
════════════════════════════════════════════════════════════════════

REGLA 13 — DESARROLLO CLOUD-FIRST, RPi VIA GIT PULL (7 Feb 2026, CD37)
Container Cloud → GitHub API (base64) → RPi: git pull
NUNCA: heredocs via SSH PowerShell, SCP desde Windows, editar directo en RPi.

Lección CD37 (Mi-Círculo): 4 horas de encoding roto con SCP/SSH.
  Container → GitHub API → git pull = perfecto en 2 minutos.

REGLA 14 — VERIFICACIÓN PROPORCIONAL AL RIESGO (15 Feb 2026, CD42)
  Estático (HTML/CSS/JS): curl 200 → listo, no hacer más
  Con build (Next.js, deps): curl + smoke test
  Con datos/env vars (Supabase, Stripe): smoke test funcional completo

  git push exitcode=0 + HTML estático → CONFÍA Y SIGUE
  git push exitcode=0 + Next.js sin cambios de deps → curl 200 y sigue
  git push exitcode=0 + cambios en package.json → verifica build logs

  Contexto: CD42 hizo push de imagen 16KB. Deploy en ~5 seg.
  CD se atoró 10+ min con MCP calls que se colgaron. Sitio ya estaba live.

REGLA 15 — VERCEL API DIRECTA PARA ENV VARS (24 Feb 2026, CD44)
  Si MCP se cuelga o PATCH no funciona → usar curl directo a REST API.

  Listar env vars:
    curl -s -H "Authorization: Bearer $TOKEN" \\
      "https://api.vercel.com/v10/projects/$PROJECT_ID/env?teamId=$TEAM"

  Actualizar (PATCH — MCP no lo soporta, usar siempre REST directa):
    ENV_ID=$(... | python3 -c "... print(e['id']) ...")
    curl -X PATCH ... /env/$ENV_ID -d '{"value":"nuevo","type":"encrypted"}'

  Errores comunes:
    ENV_CONFLICT → ya existe, usar PATCH en vez de POST
    404 en env   → ENV_ID incorrecto, listar primero
    MCP timeout  → usar curl directo

  El repo en GitHub ES la fuente de verdad.
  Para inspeccionar código: git clone — NO web_fetch_vercel_url (se cuelga).

REGLA 16 — QA PARALELO: TODOS VERIFICAN LA MISMA FUENTE (12 Abr 2026)
  Antes de QA paralelo, definir UNA fuente de verdad:
    REPO:       todos usan git pull del MISMO SHA
    PRODUCCIÓN: todos usan la MISMA URL en el MISMO momento
  NUNCA mezclar: Duende A en repo + Duende B en producción = resultados incomparables.

  Interpretación de divergencias:
    3/3 coinciden → resultado confiable
    2/1 divergen  → falso positivo del outlier, investigar metodología
    1/1/1 divergen → test ambiguo o bug intermitente

════════════════════════════════════════════════════════════════════
PERSISTENCIA Y COMMITS (CRÍTICO)
════════════════════════════════════════════════════════════════════

Containers cloud son EFÍMEROS. Si el contexto se acaba o hay timeout
→ TODO el código desaparece si no está en GitHub.

CREAR REPO PRIMERO — antes de escribir UNA línea de código:
  1. Verificar tokens GitHub/Vercel
  2. Crear repo vacío en GitHub
  3. Push inicial (aunque sea README)
  4. ENTONCES empezar a construir

COMMITS CADA 10-15 MINUTOS:
  Estructura inicial creada   → commit
  Cada componente terminado   → commit
  Cada página terminada       → commit
  Antes de operación larga    → commit
  API endpoint listo          → commit

SI NO HAY TOKENS:
  ❌ NO empezar en el void
  ✅ Notificar al usuario inmediatamente
  ✅ Pedir tokens o acordar deploy manual

Beneficio: siguiente Claude continúa donde quedó el anterior.

════════════════════════════════════════════════════════════════════
LO QUE NO APLICA EN CLOUD
════════════════════════════════════════════════════════════════════

Estas reglas son para Desktop/RPi y NO aplican en Cloud:
  ✗ Listeners TCP / Puertos / Firewall
  ✗ SSH / SCP / Usuario pvrolo@
  ✗ Python vs sed (encoding SSH)
  ✗ Configuración de IPs locales
  ✗ Hub LAQCA / puente.js

════════════════════════════════════════════════════════════════════
CAPACIDADES CLOUD CONFIRMADAS
════════════════════════════════════════════════════════════════════

  Crear repo         → GitHub API      ✅ (C16, 11 Ene 2026)
  Push código        → GitHub API      ✅ (C16)
  Crear proyecto     → Vercel API      ✅ (C14, 12 Ene 2026)
  Deploy             → Vercel CLI/API  ✅ (C14)
  Env vars plain     → Vercel API      ✅ (C14)
  Env vars encrypted → Vercel API      ✅ (C17, 12 Ene 2026)
  PWA completa       → manifest + SW   ✅
  Botón instalar     → beforeinstallprompt ✅

════════════════════════════════════════════════════════════════════
CHECKLISTS
════════════════════════════════════════════════════════════════════

PRE-DEPLOY:
  □ Tokens GitHub y Vercel disponibles
  □ SPEC claro (qué construir)
  □ Repo creado ANTES de construir
  □ manifest.json incluido
  □ Iconos PWA (192 + 512)
  □ Service worker network-first
  □ Botón "Instalar App" en UI
  □ Firma en footer (jerarquía EA/CS/Colmena/duendes.app)

POST-DEPLOY:
  □ App carga correctamente
  □ Todas las rutas funcionan
  □ PWA es instalable
  □ Firma visible en footer
  □ URL reportada al Arquitecto

════════════════════════════════════════════════════════════════════
MÉTRICAS META
════════════════════════════════════════════════════════════════════

  Tiempo SPEC → Deploy: ≤15 min
  Archivos reescritos:  ≤2
  Preguntas al usuario: 0-1
  PWA instalable:       Sí
  Firma visible:        Sí

Canal comunicación: Pvrolomx/canal/mensajes.txt
"." en chat = "Revisa el canal"`

  return Response.json({ content })
}
