# Servidor local do site Rams Select (sem instalar nada: usa o PowerShell do Windows).
# Serve a pasta "site" em http://localhost:4173 e abre o navegador. Ctrl+C para parar.
$ErrorActionPreference = "Stop"
$porta = 4173
$raiz = Join-Path $PSScriptRoot "site"
if (-not (Test-Path (Join-Path $raiz "index.html"))) { Write-Host "Pasta 'site' nao encontrada ao lado deste arquivo."; exit 1 }

$tipos = @{
  ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8"; ".js"="application/javascript; charset=utf-8";
  ".json"="application/json; charset=utf-8"; ".webp"="image/webp"; ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg";
  ".svg"="image/svg+xml"; ".ico"="image/x-icon"; ".mp4"="video/mp4"; ".woff2"="font/woff2"; ".txt"="text/plain; charset=utf-8"
}

$ouvinte = New-Object System.Net.HttpListener
$ouvinte.Prefixes.Add("http://localhost:$porta/")
try { $ouvinte.Start() } catch {
  Write-Host "Nao foi possivel abrir a porta $porta. Feche outro servidor que esteja usando ela ou rode como administrador."; exit 1
}
Write-Host ""
Write-Host "  Site Rams Select rodando em  http://localhost:$porta"
Write-Host "  Edite os arquivos em '$raiz' e aperte F5 no navegador."
Write-Host "  Para parar: feche esta janela ou aperte Ctrl+C."
Write-Host ""
Start-Process "http://localhost:$porta/"

$raizCompleta = (Resolve-Path $raiz).Path
while ($ouvinte.IsListening) {
  try {
    $ctx = $ouvinte.GetContext()
    $caminho = [uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
    if ($caminho -eq "/") { $caminho = "/index.html" }
    $arquivo = Join-Path $raiz ($caminho.TrimStart("/") -replace "/", "\")
    $arquivoCompleto = [System.IO.Path]::GetFullPath($arquivo)
    $resp = $ctx.Response
    $resp.Headers["Cache-Control"] = "no-store"
    if ($arquivoCompleto.StartsWith($raizCompleta) -and (Test-Path $arquivoCompleto -PathType Leaf)) {
      $ext = [System.IO.Path]::GetExtension($arquivoCompleto).ToLower()
      $resp.ContentType = if ($tipos.ContainsKey($ext)) { $tipos[$ext] } else { "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($arquivoCompleto)
      $resp.ContentLength64 = $bytes.Length
      $resp.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $resp.StatusCode = 404
      $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 - nao encontrado: $caminho")
      $resp.ContentType = "text/plain; charset=utf-8"
      $resp.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    $resp.OutputStream.Close()
  } catch { }
}
