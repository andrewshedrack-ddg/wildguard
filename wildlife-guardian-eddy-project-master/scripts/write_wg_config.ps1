Param(
    [Parameter(Mandatory=$true)]
    [string]$ApiBase
)

# Writes app/static/WG_CONFIG.js for local testing
$out = Join-Path -Path $PSScriptRoot -ChildPath "..\app\static\WG_CONFIG.js"
$content = "window.WG_API_BASE='" + ($ApiBase.TrimEnd('/')) + "';"
Write-Host "Writing WG API base to: $out"
Set-Content -Path $out -Value $content -Encoding UTF8
Write-Host "Done."
