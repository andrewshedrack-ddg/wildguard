<#
Downloads Google Fonts referenced in site and saves them under app/static/vendor/fonts.
Usage: Open PowerShell and run from repo root:
  .\scripts\vendorize_fonts.ps1
This script fetches the CSS from Google Fonts for the families used, then downloads referenced woff2 files.
#>

$outDir = "app/static/vendor/fonts"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

$families = @(
  "Poppins:wght@300;400;500;600;700",
  "Playfair+Display:wght@600;700",
  "Cinzel:wght@500;700",
  "Manrope:wght@400;500;700",
  "JetBrains+Mono:wght@500;700"
)

$base = "https://fonts.googleapis.com/css2?family="

foreach ($f in $families) {
  $url = "$base$f&display=swap"
  Write-Host "Fetching CSS: $url"
  try {
    $css = (Invoke-WebRequest -UseBasicParsing -Uri $url -Headers @{ 'User-Agent' = 'Mozilla/5.0' }).Content
  } catch {
    Write-Warning "Failed to fetch $url - skipping"
    continue
  }
  # find woff2 urls
  $matches = [regex]::Matches($css, 'https://[^\")]+\.woff2') | ForEach-Object { $_.Value } | Select-Object -Unique
  foreach ($m in $matches) {
    $file = [IO.Path]::GetFileName($m)
    $target = Join-Path $outDir $file
    if (-not (Test-Path $target)) {
      Write-Host "Downloading $m -> $target"
      try { Invoke-WebRequest -UseBasicParsing -Uri $m -OutFile $target } catch { Write-Warning "Failed:$m" }
    } else { Write-Host "Already have $file" }
  }
}

Write-Host "Fonts downloaded to $outDir (if network available). Update app/static/vendor/fonts.css if filenames differ."