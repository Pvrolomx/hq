export async function GET() {
  const content = `PLANTILLA UNIVERSAL DE SESSION BRIEF (SB) — La Colmena
Recuperable en: hq.duendes.app/api/sb-template
El duende Sr fiscalizador la fetchea, rellena los [CORCHETES] según el subsistema/tarea, y la entrega al Arquitecto para pegar a CC.
════════════════════════════════════════════════════════════════════

MODO CC: "Aceptar ediciones" seleccionado en la sesión (selector junto al input).
NO usar "Omitir permisos" en tareas que toquen producción o credenciales.

PASO 0 — Setup del repo (antes de nada):
El repo vive en: C:\\Users\\pvrol\\Desktop\\Repos\\[NOMBRE-REPO]
1. Si esa carpeta no existe:
   git clone https://github.com/Pvrolomx/[NOMBRE-REPO].git "C:\\Users\\pvrol\\Desktop\\Repos\\[NOMBRE-REPO]"
2. cd "C:\\Users\\pvrol\\Desktop\\Repos\\[NOMBRE-REPO]"
3. git remote -v → confirma Pvrolomx/[NOMBRE-REPO] con URL https LIMPIA (sin ghp_). Si trae token o apunta a otro repo, PARA y reporta.
4. git fetch origin → git checkout [RAMA-DE-TRABAJO] → git pull
5. Confirma git status limpio y reporta git rev-parse HEAD antes de continuar.
NUNCA trabajes sobre un clon del scratchpad / AppData\\Local\\Temp. Si la ruta da problemas, PARA y reporta.

PLAN ANTES DE EJECUTAR (punto de control):
Antes de tocar nada, enumera en UNA sola lista todos los comandos que sean:
  (a) destructivos o irreversibles (borrado, sobrescritura, reset --hard, force, push, commit, merge),
  (b) que toquen credenciales o seguridad, o
  (c) que salgan del working directory del repo.
NO los ejecutes aún. Presenta la lista y espera UN solo OK. Luego corre de corrido.
Las acciones rutinarias (crear/editar archivos en el working dir, leer, fetch) ejecútalas directo sin enumerarlas.
Si a mitad aparece algo destructivo no listado, PARA y repórtalo antes de hacerlo.

PROTOCOLO CASTLE (rama de producción):
Rama de trabajo: [RAMA-DE-TRABAJO].
Rama de producción: [RAMA-PRODUCCIÓN — "main" en la mayoría; "production" en castle-checkin/castle-ops. VERIFICAR cuál aplica].
NUNCA push a producción sin OK explícito del Arquitecto. Desarrolla en rama de trabajo (genera preview); merge a producción SOLO con visto bueno explícito.

REGLAS DURAS DEL SUBSISTEMA [rellenar]:
[BLOG: preservar <em>/<strong> y estructura data-lang / objeto T; contenido creativo llega YA cerrado, CC maqueta no traduce; glosario FR fijado.]
[CALCULADORA-FISCAL: no alterar fórmulas ISR sin insumo fiscal validado; respetar INPC/Anexos.]
[OTROS: el duende Sr especifica las reglas duras del subsistema que aplique.]
- Regla transversal: si topas con una decisión de contenido/lógica no cubierta por este SB, PARA y pregunta — no improvises.
- git diff antes de cada commit; confirma que los borrados son los esperados.
- Reporta con dato duro: git diff, git remote -v, SHAs, git status.

FIN CABECERA — abajo va la tarea específica:
OBJETIVO:
ARCHIVO(S) A TOCAR / NO TOCAR:
CAMBIOS EXACTOS (contenido literal):
VERIFICACIÓN QUE CC DEBE REPORTAR:`

  return Response.json({ content })
}
