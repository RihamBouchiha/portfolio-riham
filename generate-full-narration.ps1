param(
  [ValidateSet('fr', 'en', 'all')]
  [string]$Language = 'all'
)

$ErrorActionPreference = 'Stop'

$envFile = Join-Path $PSScriptRoot '.env.local'
if (-not (Test-Path -LiteralPath $envFile)) { throw '.env.local is missing.' }

$keyLine = Get-Content -LiteralPath $envFile | Where-Object { $_ -match '^\s*GEMINI_API_KEY\s*=' } | Select-Object -First 1
if (-not $keyLine) { throw 'GEMINI_API_KEY is missing from .env.local.' }
$apiKey = ($keyLine -replace '^\s*GEMINI_API_KEY\s*=\s*', '').Trim().Trim('"').Trim("'")
if (-not $apiKey) { throw 'GEMINI_API_KEY is empty.' }

$outputDirectory = Join-Path $PSScriptRoot 'public\audio'
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null

$narrations = @(
  @{ Prefix = 'fr'; Text = "Bonjour. Je suis une idee. Riham m'a d'abord imaginee. Puis elle m'a dessinee, codee et amelioree. Elle m'a appris a devenir utile, claire et memorable. Maintenant, je vais te montrer ce qu'elle sait creer."; Style = 'a warm, natural adult female French voice' },
  @{ Prefix = 'en'; Text = 'Hello, I am an idea. Riham imagined me first. Then she designed, coded and refined me. She taught me to be useful, clear and memorable. Now, I will show you what she can create.'; Style = 'a warm, natural adult female English voice' }
)

function Save-WaveFile([string]$Path, [byte[]]$PcmData) {
  $stream = [System.IO.File]::Open($Path, [System.IO.FileMode]::Create)
  $writer = New-Object System.IO.BinaryWriter($stream)
  try {
    $sampleRate = 24000
    $channels = 1
    $bitsPerSample = 16
    $writer.Write([System.Text.Encoding]::ASCII.GetBytes('RIFF'))
    $writer.Write([int](36 + $PcmData.Length))
    $writer.Write([System.Text.Encoding]::ASCII.GetBytes('WAVEfmt '))
    $writer.Write([int]16)
    $writer.Write([int16]1)
    $writer.Write([int16]$channels)
    $writer.Write([int]$sampleRate)
    $writer.Write([int]($sampleRate * $channels * ($bitsPerSample / 8)))
    $writer.Write([int16]($channels * ($bitsPerSample / 8)))
    $writer.Write([int16]$bitsPerSample)
    $writer.Write([System.Text.Encoding]::ASCII.GetBytes('data'))
    $writer.Write([int]$PcmData.Length)
    $writer.Write($PcmData)
  } finally {
    $writer.Close()
    $stream.Close()
  }
}

foreach ($narration in $narrations) {
  if ($Language -ne 'all' -and $Language -ne $narration.Prefix) { continue }

  $prompt = "Read the complete narration below exactly once in $($narration.Style). Do not add words, do not omit words, and do not stop until every sentence has been spoken. Narration: $($narration.Text)"
  $payload = @{
    model = 'gemini-2.5-flash-preview-tts'
    input = $prompt
    response_format = @{ type = 'audio' }
    generation_config = @{ speech_config = @(@{ voice = 'Kore' }) }
  } | ConvertTo-Json -Depth 7 -Compress

  try {
    $response = Invoke-RestMethod -Method Post -Uri 'https://generativelanguage.googleapis.com/v1beta/interactions' -Headers @{ 'x-goog-api-key' = $apiKey } -ContentType 'application/json' -Body $payload
  } catch {
    $responseStream = $_.Exception.Response.GetResponseStream()
    if ($responseStream) {
      $reader = New-Object System.IO.StreamReader($responseStream)
      $details = $reader.ReadToEnd()
      $reader.Close()
      throw "Gemini request failed: $details"
    }
    throw
  }
  $audioData = $response.output_audio.data
  if (-not $audioData -and $response.steps) {
    $audioData = ($response.steps | ForEach-Object { @($_.content) } | Where-Object { $_.type -eq 'audio' } | Select-Object -Last 1).data
  }
  if (-not $audioData) { throw "Gemini returned no audio for $($narration.Prefix)." }
  Save-WaveFile -Path (Join-Path $outputDirectory "story-$($narration.Prefix)-full.wav") -PcmData ([System.Convert]::FromBase64String($audioData))
  Write-Output "Generated story-$($narration.Prefix)-full.wav"
}
