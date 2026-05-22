Param()

# Downloads TF.js and coco-ssd model bundles into app/static/vendor for offline hosting.
Set-StrictMode -Version Latest
$root = Join-Path -Path $PSScriptRoot -ChildPath "..\app\static\vendor"
if (-not (Test-Path $root)) { New-Item -ItemType Directory -Path $root -Force | Out-Null }

$files = @(
    @{ url = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js'; out = 'tf.min.js' },
    @{ url = 'https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js'; out = 'coco-ssd.min.js' },
    @{ url = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.4/build/qrcode.min.js'; out = 'qrcode.min.js' }
)

foreach ($f in $files) {
    $target = Join-Path $root $($f.out)
    Write-Host "Downloading $($f.url) -> $target"
    try {
        Invoke-WebRequest -Uri $f.url -OutFile $target -UseBasicParsing -ErrorAction Stop
        Write-Host "Saved: $target"
    } catch {
        Write-Warning "Failed to download $($f.url): $($_.Exception.Message)"
    }
}

Write-Host "Vendor files saved under: $root"
