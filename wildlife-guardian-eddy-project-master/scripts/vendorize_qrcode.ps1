# Download a stable qrcode build into app/static/vendor
$url = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.4/build/qrcode.min.js'
$out = Join-Path $PSScriptRoot '..\app\static\vendor\qrcode.min.js'
Write-Output "Attempting to download $url to $out"
try{
  Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -ErrorAction Stop
  Write-Output "Downloaded qrcode.min.js to $out"
} catch {
  Write-Warning "Download failed: $_.Exception.Message — leaving placeholder in place"
}
