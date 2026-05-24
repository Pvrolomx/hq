export async function GET() {
  const content = `ACCESO RPi — BEACH HOUSE SSH
════════════════════════════════════════════════════════════════════

DATOS DE CONEXIÓN
IP:      192.168.1.91
Usuario: pvrolo
Puerto:  22
Shell DC (Beach House): powershell.exe
Archivo RDE en RPi: /home/pvrolo/colmena/REGLAS_DE_EJECUCION_v1.1.md

════════════════════════════════════════════════════════════════════
MÉTODO SSH DESDE BEACH HOUSE — ÚNICO QUE FUNCIONA
════════════════════════════════════════════════════════════════════

$result = [System.Diagnostics.Process]::new()
$result.StartInfo.FileName = "C:\\Program Files\\Git\\usr\\bin\\ssh.exe"
$result.StartInfo.Arguments = '-o StrictHostKeyChecking=no -o BatchMode=yes pvrolo@192.168.1.91 "comando aquí"'
$result.StartInfo.RedirectStandardOutput = $true
$result.StartInfo.RedirectStandardError = $true
$result.StartInfo.UseShellExecute = $false
$result.Start() | Out-Null
$stdout = $result.StandardOutput.ReadToEnd()
$result.WaitForExit()
Write-Host $stdout

════════════════════════════════════════════════════════════════════
REGLAS DE USO
════════════════════════════════════════════════════════════════════

⚠ Usar SIEMPRE comillas simples para el argumento SSH.
⚠ Encadenar comandos con ; no con &&.
⚠ No usar ssh.exe directamente en terminal (falla por PATH) — usar el bloque Process completo.

════════════════════════════════════════════════════════════════════
COMANDOS ÚTILES (reemplazar "comando aquí")
════════════════════════════════════════════════════════════════════

Leer RDE:
  cat /home/pvrolo/colmena/REGLAS_DE_EJECUCION_v1.1.md

Ver SESSION_STATE:
  cat /home/pvrolo/colmena/SESSION_STATE.md

Actualizar SESSION_STATE:
  echo "contenido" > /home/pvrolo/colmena/SESSION_STATE.md

Listar colmena:
  ls -la /home/pvrolo/colmena/

Ver logs Telegram:
  tail -50 /home/pvrolo/colmena/logs/telegram.log

Status servicios:
  systemctl status colmena-agent ; systemctl status fantasma

Reiniciar agente Telegram:
  systemctl restart colmena-agent

Espacio en disco:
  df -h

════════════════════════════════════════════════════════════════════
RUTAS IMPORTANTES EN RPi
════════════════════════════════════════════════════════════════════

/home/pvrolo/colmena/           → raíz Colmena
/home/pvrolo/colmena/REGLAS_DE_EJECUCION_v1.1.md
/home/pvrolo/colmena/SESSION_STATE.md
/home/pvrolo/colmena/logs/
/home/pvrolo/colmena/md/        → inbox convertido a markdown
/home/pvrolo/colmena/inbox/     → watchdog: .docx/.pdf/.txt → auto-convert`

  return Response.json({ content })
}
