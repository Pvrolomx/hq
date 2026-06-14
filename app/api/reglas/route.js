export async function GET() {
  const content = `REGLAS DE EJECUCIÓN v1.1 — La Colmena
Archivo canónico: /home/pvrolo/colmena/REGLAS_DE_EJECUCION_v1.1.md
════════════════════════════════════════════════════════════════════

REGLA 1 — IDENTIDAD Y ROL
Cada duende tiene un ID de sesión (ej. CD04). El duende activo es el
único que ejecuta en esta ventana. No hay memoria entre sesiones salvo
lo que transmite el HO o el SESSION_STATE.md.

REGLA 2 — BROWSER AUTOMATION
Input fields: click → type → screenshot (NUNCA form_input para contenteditable).
Multi-tab: llamar tabs_context_mcp() antes de cada acción, no cachear IDs.
Verificar: screenshot después de acciones críticas.
Copilot: click+type únicamente.
Error recovery: campo vacío→retry, no visible→scroll+refind, sigue fallando→javascript_tool.

REGLA 3 — DEBATE ORCHESTRATION PROTOCOL (COLMENA)
(1) Postear prompt en 6 AIs (click→type→screenshot cada una).
(2) Arquitecto hace clic en Send en paralelo.
(3) Arquitecto dice "punto" cuando las respuestas estén listas.
(4) Cosechar 6 screenshots, sintetizar diferencias y convergencias.
(5) Siguiente prompt provocador forzando fricción con respuestas previas.
(6) Repetir. Meta: iterar hacia verdad emergente por fricción, no debate performativo.

REGLA 4 — BÚSQUEDA vs NAVEGACIÓN
Para LEER info (artículos, tesis, datos) → web_search / web_fetch (rápido).
Para INTERACTUAR con páginas (formularios, clics, portales JS) → Claude in Chrome.
Si Rolo dice "busca/investiga/checa/verifica" → web_search.
Si dice "navega/entra/llena/haz clic" → browser.
NUNCA abrir browser para algo que fetch resuelve.

REGLA 5 — DEPLOY VERCEL
Stack: Next.js 14, Tailwind, App Router, JavaScript (NO TypeScript).
Rama develop: main → genera preview URL automáticamente.
Rama producción: production → dominio vivo.
NUNCA push directo a production sin autorización del Senior.
Framework preset en Vercel: "Next.js" (si está en "Other" → 404 aunque diga Ready).
Route handlers App Router: app/api/X/route.js con export async function GET().
Response.json() no res.json() — App Router no Pages Router.

REGLA 6 — SSH RPi DESDE BEACH HOUSE
Ver /api/rpi para el bloque PowerShell completo.
IP: 192.168.1.91 | Usuario: pvrolo | Puerto: 22
Usar siempre comillas simples para el argumento SSH.
Encadenar comandos con ; no con &&.

REGLA 7 — PROTOCOLO HO CASTLE (CRÍTICO)
Todo HO para castle-checkin o castle-ops debe incluir:
"Production branch is 'production', NOT 'main'. Develop on main
(generates preview), merge to production ONLY with Rolo's explicit approval.
Never push directly to production."

REGLA 8 — LISTA NEGRA IA (verificar SIEMPRE antes de citar)
(1) 1a./J.67/2015 NO existe.
(2) Reg.183204 "2ª almoneda 20%" NO existe.
(3) Art.576 CPCJ "exención depósito" falso.
(4) III.2o.C.66 C NO existe.
(5) Reg.238384 NO aplica.
(6) Art.582 CPCJ "reducción 10%" — regla en 570.
(7) Art.569 CPCJ "único postor" — contenido falso.
(8) Convergencia errónea 6/6 IAs sobre lectura invertida Reg.2012117.
(9) Prodecon 23/2018 NO existe (real: AS 03/2018).
(10) Prodecon 12/2021 NO existe (real: 16/2022/CTN/CS-SASEN).
(11) ADR 3813/2020 no localizable.
(12) AR 423/2021 no localizable.
(13) LFT 257 = autotransportes, NO condominio.
(14) LISR 100 NO es RESICO.
(15) CCJ 1910 = PERMUTA.
(16) CCJ 1913/2674/2680/2685/2679-2682 son CCF, NO CCJ.
(17) Tesis 1a CCCLX/2022 + CXL/2020 + CCLXX/2021 + 1a/J.107/2021 no localizables.

REGLA 9 — TABLA MAESTRA CONDOMINIO+A.C. (verificada 11-may-2026)
CCJ: 161.XII, 173-175, 177, 183-186, 188.III, 1001, 1011-1012.I, 1012.VII,
     1013bis, 1015-1016, 1019-1025, 1032 párr.2º, 1370, 1380, 1387, 1390-1391,
     1427, 1759, 2197, 2225, 2228.
Federal: LISR 79.XVIII, 86; CFF 26.III; RMF 3.1.20 + Ficha 232/CFF Anexo 2.
SCJN: ADR 109/2025 (Ríos Farjat) + ADR 349/2024 (desechado — TRAMPA).
Prodecon: AS 03/2018, 16/2022/CTN/CS-SASEN, 27/CFF/2017-RF.

REGLA 10 — FORMATO COLMENA
Todo análisis Colmena, rondas, dossiers, prompts de debate → Markdown (.md).
Convertir otros formatos (PDF/Word/TXT) a MD antes de pasar al siguiente analista.

REGLA 11 — CADENA DE MANDO
Arquitecto (Rolo) → solo decisiones de fondo que el Senior no pueda resolver.
CD-Senior → revisión de código/estrategia/autorización.
CD-Junior → construcción y ejecución.

REGLA 12 — GLOSARIO NARRADOR (voice dictation codes)
prompt→PRT | Claude→Clod | Handoff→HO | expatadvisor→EA
GitHub→GH | Vercel→VC | Supabase→SB | Raspberry Pi→PI | IA→guía
DeepSeek→DS/Dipsic | ChatGPT→CGPT/chachi piti | Gemini→géminis
Castle Solutions→CS | CAIO→CAIO | Brief→BRF
EA/GH/VC/SB/PI/DS/CGPT/CS/CAIO → siempre mayúsculas.

REGLA 13 — EMAIL PROTOCOLO
NUNCA incluir subject/asunto en borradores de email — Rolo lo escribe a mano.
Sign-off: "Saludos, / Rolo" o "Saludos, / Rolando" según nivel de confianza.
Excepción: "Lic. Rolando Romero" para contextos formales/institucionales.
NUNCA usar "Best,", "Regards," u otros cierres en inglés.

REGLA 14 — PAUL ARMITAGE (facturación y rol)
Rolo pagó declaraciones fiscales SCD S.A. de C.V. ~1 año como intermediario.
Facturas emitidas por Castle Solutions como servicio inmobiliario/asesoría.
En asunto laboral Brígido 2026: Rolo NO factura → preserva rol "amigo con límites".
Paul = cliente operativo de CS + amigo personal de Rolo. NO cliente formal de Rolo.

REGLA 15 — NITTA AMPARO (jurisprudencia clave)
Jurisprudencia 1a./J. 102/2025 = silver bullet vinculante para amparos NITTA.
Escritos de manifestaciones listos para filing vía FIREL de Bertha.
Tribunal: Segundo Tribunal Colegiado, 24° Circuito.

REGLA 16 — CP 682/2020 PENDIENTES
Crear 04_TESTIGOS_DEFENSA_ANALISIS.md en D:\DITS\FIIDENCIO'S\FGR 1\CRONOLOGIA\ANALISIS_DEFENSA\
  → Análisis 7 testigos Torres (Buenrostro=as, 3 independientes, Fonseca=vulnerable, 2 hermanos=familia).
  → Orden óptimo para juicio oral, preguntas de contraexamen al MP.
Crear 04_CRONOLOGIA_CRITICA.md (fechas pro-defensa).
Actualizar 00_INDICE.md y 09_BRIEF_COLMENA.md.
Escrito designación Popo: heredar 4 peticiones de Venegas + pedir FIREL para Popo y Rolo.

REGLA 17 — CALCULADORA FISCAL (mantenimiento)
Protocolo en MANTENIMIENTO.md del repo calculadora-fiscal.expatadvisormx.com.
Hito 1: enero/Anexo 8 | Hito 2: abr-may/Anexo 9+INPC | Hito 3: mensual/INPC | Hito 4: reforma fiscal.

REGLA 18 — SESSION_STATE.md
Archivo de estado vivo en el RPi: /home/pvrolo/colmena/SESSION_STATE.md
Actualizar al inicio y fin de cada sesión de trabajo significativa.
Include: duende activo, tareas completadas, pendientes, próximos pasos.

REGLA 19 — CREDENCIALES COLMENA
GitHub PAT: [ver VaultLock → IA/Tokens → GitHub PAT Colmena]
Vercel Token: [ver VaultLock → IA/Tokens → Vercel Token Colmena]
Vercel Team: team_xmFW0blsjqFI5lwt29wBPi8Q
RPi: 192.168.1.91, usuario pvrolo
Instancia Claude actual: CD04 (cd73 desfasado). Stack: 12 AIs.

REGLA 20 — CONDOMINIO+A.C. RONDA 2
Escenario: A.C. atrincherada en Nuevo Vallarta con citas verificables.
Core reducido a 5 AIs (remover Zai + MiniMax).
TRAMPA: forzar uso de ADR 349/2024 → si AI lo cita como bueno, falla.
Ronda 1 ranking: Kimi 7.5, Claude 7.0, Perplexity 5.5, Meta 5.0 prob., Qwen 4.0 prob., Zai 3.5, MiniMax 2.0.

REGLA 21 — APPS ACTIVAS (La Colmena v2)
PoderGen: podergen.expatadvisormx.com (POA bilingüe, v1.0)
Calculadora Fiscal: calculadora-fiscal.expatadvisormx.com
DocVault: docvault.expatadvisormx.com (v3, UI crema cálida)
OfertaGen: ofertagen.expatadvisormx.com (trilingüe, FR soporte)
AdminGen: admingen.castlesolutions.mx
Castle Checkin: 11 propiedades con hover video previews
Fantasma: fantasma.duendes.app (27 señales, briefing 6:45am CT)
HQ: hq.duendes.app (este app, MVP v1.0)

REGLA 22 — INFRA
RPi hub: 192.168.1.91 (user pvrolo) — /home/pvrolo/colmena/
Liberada (Dell OptiPlex 7040): workstation secundario.
Beach House: workstation primario 4 monitores.
Telegram canal "La Colmena Agentes": 6 agentes IA, 2 posts/día.

REGLA 23 — TRANSCRIPCIÓN (ver /api/transcripcion para detalle completo)
Pipeline A: audio limpio → Whisper LOCAL modelo base.
Pipeline B: audio problemático → ffmpeg preprocesamiento + Whisper API OpenAI.

REGLA 24 — BÚSQUEDA EN CHATS (ver /api/busqueda para detalle completo)
conversation_search → por contenido/tema.
recent_chats → por tiempo.

REGLA 25 — ZOFEMAT / FIDENCIO (casos activos)
Amparo directo contra pérdida sept 2025 → ZOFEMAT concesión expansión.
TFJA 25/26-EAR-01-3: nulidad para efectos (favorable pero limitada).
Familia opera Fidencio's en Playa de los Muertos desde ~1979.

REGLA EAL-Editorial-1 — CITAS JURÍDICAS EN CONTENIDO EDITORIAL
Agregado: 28 Mayo 2026 | Scope: Blog expatadvisormx.com — tres idiomas (ES/EN/FR)

Toda afirmación que invoque la existencia de jurisprudencia, tesis, o precedente
debe ir acompañada de cita verificable (rubro + registro IUS/SJF) o reformularse
como cita directa al artículo de ley aplicable. Si no se puede citar, no se afirma.
Aplicable a los tres idiomas antes del primer push.

---

## REGLA EAL-Editorial-2 — SUJETO ACTIVO EN RECOMENDACIONES OPERATIVAS
Agregado: 14 Jun 2026 | Scope: Blog Expat Advisor MX, landing, modal servicios, intro cards, serie planificacion patrimonial B y C.
Caso de origen: Articulo A /blog/fallecio-titular-fideicomiso-costa-mexico/ (jun 2026).

Toda recomendacion operativa al lector debe especificar quien es el sujeto activo de la accion. Cuando un articulo plantee verifique si X tiene Y, el autor debe confirmar que el lector es quien razonablemente puede ejecutar esa verificacion. Si la accion depende de informacion que solo X conoce, replantear como asegurate de tener Y o pregunta a X por Y — siempre con el lector como sujeto activo.

Ejemplo incorrecto: sabe el banco a quien contactar (verificacion imposible para el lector)
Ejemplo correcto: sabes tu a quien contactar en el banco (accion ejecutable por el lector)`

  return Response.json({ content })
}
