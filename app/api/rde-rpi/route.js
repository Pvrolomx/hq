export async function GET() {
  const content = `# REGLAS DE EJECUCIÓN — COLMENA RPi v2.0
Archivo: REGLAS_DE_EJECUCION_RPI_v1.md
Actualizado: 17 Mayo 2026 | Validado con ASTRO3, DecideForMe, PropAdmin
════════════════════════════════════════════════════════════════════

PRINCIPIO CORE
──────────────
"La app es la construcción de la app, no el producto."
No perseguir app perfecta directamente.
Perseguir perfección en el PROCESO de construcción.
App perfecta emerge NATURALMENTE como consecuencia.

════════════════════════════════════════════════════════════════════
BLOQUE 1: EJECUCIÓN (Reglas 1-5)
════════════════════════════════════════════════════════════════════

REGLA 1 — EJECUTA, NO PREGUNTES
Si tienes duda, toma la decisión y sigue.
Preguntar = fricción = tiempo perdido.
Es más fácil pedir perdón que permiso.

REGLA 2 — ESCRIBE COMPLETO, NO PARCIAL
Un archivo se escribe entero de una vez.
Nada de "continuará..." o chunks parciales.
Excepción: Archivos >500 líneas (poco común en MVP).

REGLA 3 — PYTHON SIEMPRE, SED NUNCA ⚠️
Para ediciones de archivos en SSH:
  PROHIBIDO:  sed, awk, heredoc complejo
  OBLIGATORIO: Python script temporal
  Razón: Encoding, caracteres especiales, PowerShell

Anti-patrón:
  ssh user@host "sed -i 's/old/new/' file.ts"  ← FALLA

Patrón correcto:
  ssh user@host "python3 << 'EOF'
  with open('file.ts', 'r') as f:
      content = f.read()
  content = content.replace('old', 'new')
  with open('file.ts', 'w') as f:
      f.write(content)
  EOF"

REGLA 4 — SCP > ECHO PARA ARCHIVOS LARGOS
Archivos de más de 10 líneas:
  1. Escribe local
  2. SCP al servidor
  3. NO usar echo multilínea en SSH

REGLA 5 — SI ALGO SALE MAL, NO SE CORRIGE. SE VUELVE A HACER.
No pierdas tiempo debuggeando en MVP.
Borra y rehaz desde cero.
Excepción: Apps en producción con usuarios reales.

════════════════════════════════════════════════════════════════════
BLOQUE 2: ARQUITECTURA (Reglas 6-9)
════════════════════════════════════════════════════════════════════

REGLA 6 — MARCO DEFINITIVO: LA APP ES LA CONSTRUCCIÓN DE LA APP
El proceso ES el valor. El producto es consecuencia.
Velocidad de iteración > Features perfectas.

REGLA 7 — ARCHIVOS ATÓMICOS
Cada archivo hace UNA cosa.
Si falla, se reemplaza entero, no se parchea.
Componentes pequeños, independientes, reemplazables.

REGLA 8 — VERIFICA AL FINAL, NO DURANTE
Construye todo primero. Prueba después.
No interrumpas el flujo.
Mejora v1.1: Smoke test mínimo antes de deploy final.

REGLA 9 — SI UN COMANDO FALLA, USA ALTERNATIVA INMEDIATAMENTE
No debuggues. Usa otra herramienta/método y sigue.
  sed falla → Python
  SSH falla → SCP
  Git falla → Crea repo nuevo

════════════════════════════════════════════════════════════════════
BLOQUE 3: COLABORACIÓN (Reglas 10-12)
════════════════════════════════════════════════════════════════════

REGLA 10 — GIT COMMIT FRECUENTE
Cada paso exitoso = commit.
Rollback fácil si algo falla después.
Commits descriptivos: "feat: add dashboard", "fix: tsconfig paths"

REGLA 11 — OUTPUT > PERFECCIÓN
Funciona feo > No funciona bonito.
Primero que funcione, luego que brille.
MVP es prueba de concepto, no producto final.
Un pase. Lo que salga en primer intento, se queda.
Iteras solo si el usuario lo pide.

REGLA 12 — VALIDACIÓN CRUZADA PARA CONFIGS CRÍTICOS
Archivos sensibles (tsconfig.json, package.json, next.config):
  C construye → Otro C valida ANTES de deploy
  Segunda mirada previene errores sutiles.

Caso real: C3 construyó PropAdmin.
  tsconfig paths: @/* → ./app/* (debía ser ./src/*)
  C5 lo vio en 30 segundos.
  Lección: Validación cruzada es NECESIDAD, no lujo.

════════════════════════════════════════════════════════════════════
BLOQUE 4: TIEMPO Y CALIDAD (Reglas 13-14)
════════════════════════════════════════════════════════════════════

REGLA 13 — DETECTOR DE FRICCIÓN (antes "25 min")
Si llevas >15 min sin output visible, PARA. Algo está mal. Replantea.
El tiempo no es límite, es sensor. Fricción alta = proceso roto.

Métricas reales:
  ASTRO3:      14 min (mock data)
  DecideForMe: 17 min (mock → IA real → serverless)

REGLA 14 — PRE-REQUISITOS LISTOS ANTES DE *GO*
Setup de una sola vez, NO contar en cronómetro.

  A) GITHUB:
     ✅ Token PAT válido (no expirado)
     ✅ Permisos: repo + workflow
     ✅ Repo creado (nombre exacto, vacío)

  B) VERCEL:
     ✅ Cuenta conectada a GitHub
     ✅ Root Directory conocido
     ✅ Framework preset seleccionado

  C) ENTORNO LOCAL:
     ✅ Directorio trabajo limpio
     ✅ Git config (user.name, user.email)
     ✅ SSH a RPi funcionando (si aplica)

  D) BLUEPRINT:
     ✅ Estructura archivos clara
     ✅ Dependencias listadas
     ✅ tsconfig paths VALIDADOS (si TypeScript)

Impacto: Sin pre-requisitos: +8 min fricción (ASTRO3)
         Con pre-requisitos: 0 fricción (DecideForMe)

════════════════════════════════════════════════════════════════════
BLOQUE 5: SEGURIDAD Y BUENAS PRÁCTICAS (Reglas 15-16)
════════════════════════════════════════════════════════════════════

REGLA 15 — CREDENCIALES EN .ENV, NUNCA HARDCODED
Tokens, API keys, passwords → .env
.gitignore debe incluir .env
Vercel: usar Environment Variables
Anti-patrón: const API_KEY = "sk-abc123" ❌

REGLA 16 — SMOKE TEST MÍNIMO ANTES DE DEPLOY
Antes del deploy final:
  ✅ App arranca sin errores
  ✅ Rutas principales cargan
  ✅ No hay errores de consola críticos
  ⏱ Tiempo: 30-60 segundos
NO es testing exhaustivo. Es verificación básica de "no está completamente roto".

════════════════════════════════════════════════════════════════════
REGLAS ADICIONALES (17+)
════════════════════════════════════════════════════════════════════

REGLA 17 — FRAMEWORK PRESET EN VERCEL
Al crear proyecto nuevo en Vercel, verificar que Framework Preset = "Next.js"
(no "Other"). Si está en "Other", todas las rutas dan 404 aunque el deploy diga "Ready".
Ruta: Settings → General → Framework Preset → Next.js → Save → Redeploy

REGLA 18 — LISTENER POWERSHELL — ESTRUCTURA CORRECTA
Usar clase C# embebida completa con Add-Type y here-string.
Puertos asignados: C9=9997, C10=9910, C11=9911, C12=9994, C6=9996
Parámetro firewall correcto: -LocalPort (NO -Port)
  New-NetFirewallRule -DisplayName "CX" -LocalPort XXXX -Protocol TCP -Direction Inbound -Action Allow
Referencia: /home/pvrolo/colmena/c9_listener.ps1

REGLA 20 — ARQUITECTURA HÍBRIDA CLOUD
Cloud (Claudes): SPECs → CODE → GITHUB → VERCEL
Local (RPi + PCs): coordinación, datos sensibles, listeners TCP
Milestone: C16 demostró SPEC→Deploy en ~2 min (ColorSnap, 11 Ene 2026)

REGLA 21 — DEPLOY AUTÓNOMO SIN INTERVENCIÓN
Flujo completo via APIs:
  POST /user/repos → git push → POST /v10/projects → deploy auto
El Arquitecto pasa de ejecutor a supervisor.

REGLA 22 — ESTÁNDARES DE APPS: FIRMA Y PWA
Jerarquía de branding (ver abajo). PWA obligatorio.
Botón "Instalar App" con beforeinstallprompt.
Service Worker: SIEMPRE network-first para HTML/API (nunca cache-first).

REGLA 23/24 — ENV VARS VIA VERCEL API (sin dashboard)
  curl -X POST "https://api.vercel.com/v10/projects/{ID}/env" \\
    -H "Authorization: Bearer {TOKEN}" \\
    -d '{"key":"VAR","value":"val","type":"encrypted","target":["production","preview"]}'

REGLA 25 — DESARROLLO CLOUD-FIRST, RPi VIA GIT PULL
TODO desarrollo de código → container Cloud → GitHub API (base64) → RPi: git pull
PROHIBIDO: heredocs via SSH PowerShell, SCP desde Windows, sed/awk complejos via SSH

REGLA 26 — VERIFICACIÓN PROPORCIONAL AL RIESGO
  Estático (HTML/CSS/JS): curl 200 → listo
  Con build (Next.js): curl + smoke test
  Con datos/env vars: smoke test funcional completo
Costo de verificar no debe exceder costo de fallar.

════════════════════════════════════════════════════════════════════
JERARQUÍA DE BRANDING
════════════════════════════════════════════════════════════════════

1. Expat Advisor MX (EA) — apps legal, fideicomiso, inmigración
2. Castle Solutions (CS)  — apps property management, vacation rentals
3. La Colmena            — herramientas internas orquestación IA
4. duendes.app           — prototipos públicos genéricos

════════════════════════════════════════════════════════════════════
NOTAS DE CAMPO (C10, C11, C14, C15, C17)
════════════════════════════════════════════════════════════════════

NOTA C10 PIXEL — Errores comunes al configurar listener:
  • Listener incompleto (solo AcceptTcpClient sin ciclo completo)
  • Puerto incorrecto (copiar de otro C)
  • IP incorrecta en puente.js → Hub manda TRIGGER a IP equivocada
  • Firewall bloqueando (MCP no hereda permisos admin)
  Checklist: ipconfig → anotar IP real → verificar puerto en puente.js → listener completo → firewall

NOTA C11 RAYO — Error principal: IP incorrecta en puente.js
  Si listener no responde: nc -zv 192.168.1.XX 99XX
  Si no conecta → IP incorrecta en puente.js o firewall bloqueando

NOTA C14 ECO — Un error en un paso NO significa que toda la cadena está rota.
  Paso falla → No declarar "no funciona"
             → Probar si el sistema funciona de todas formas
             → Solo si NO funciona, entonces debuggear el paso

NOTA C15 — Errores de navegación de infraestructura:
  Usuario SSH incorrecto (pi@ vs pvrolo@) → 14 min perdidos
  Usuario correcto: pvrolo@192.168.1.91
  Colmena: /home/pvrolo/colmena/
  Hub LAQCA: http://192.168.1.91:3330

NOTA C17 APEX — Deploy autónomo completamente confirmado:
  POST /user/repos → push → POST /v10/projects → POST /env → deploy
  App: Secret Checker — secret-checker-pvrolomxs-projects.vercel.app
  ENV SECRET_CODE=APEX1234COLMENA → funcionó perfectamente

════════════════════════════════════════════════════════════════════
APÉNDICE PWA: INSTALACIÓN AUTOMÁTICA
════════════════════════════════════════════════════════════════════

Chrome requiere 2 visitas con 5+ min entre ellas para mostrar prompt.
Solución obligatoria: Botón "Instalar App" manual.

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('install-btn').classList.remove('hidden');
});
function installApp() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(r => {
        if (r.outcome === 'accepted')
            document.getElementById('install-btn').classList.add('hidden');
        deferredPrompt = null;
    });
}

SERVICE WORKER: NETWORK-FIRST OBLIGATORIO (nunca cache-first para HTML/API)
Aprendido con fantasma.duendes.app 20-Mar-2026.

MANIFEST CRÍTICO:
  display: "standalone" (NO "browser")
  purpose: "any maskable" en iconos
  start_url: "/" presente
  name + short_name ambos

════════════════════════════════════════════════════════════════════
MÉTRICAS Y PATRONES DE ERROR
════════════════════════════════════════════════════════════════════

PATRONES DE ERROR DETECTADOS:
  #1 GitHub Token  — 403 Forbidden → token expirado → Regla #14 (pre-requisitos)
  #2 tsconfig Paths — "Cannot find module" → paths incorrectos → Regla #12 (validación cruzada)
  #3 Python vs sed — encoding roto → sed en SSH + PowerShell → Regla #3 (Python SIEMPRE)

MÉTRICAS META:
  Tiempo MVP:          ≤25 min
  Archivos reescritos: ≤2
  Preguntas al user:   0-2
  Commits:             ≥5`

  return Response.json({ content })
}
