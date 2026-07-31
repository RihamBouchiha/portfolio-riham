param(
  [ValidateSet('fr', 'en', 'all')]
  [string]$Language = 'all',
  [ValidateRange(1, 5)]
  [int]$StartAt = 1,
  [ValidateRange(1, 5)]
  [int]$EndAt = 5,
  [switch]$Force
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
  @{ Prefix = 'fr'; Language = 'français'; Direction = 'Voix féminine française, chaleureuse, naturelle et adulte. Débit posé, articulation nette de chaque mot, ton confiant et narratif.'; Lines = @('Bonjour. Je suis une idée.', 'Riham m''a d''abord imaginée.', 'Puis elle m''a dessinée, codée et améliorée.', 'Elle m''a appris à devenir utile, claire et mémorable.', 'Maintenant, je vais te montrer ce qu''elle sait créer.') },
  @{ Prefix = 'en'; Language = 'English'; Direction = 'Warm, natural adult female English voice. Speak every word of the quoted text fully and distinctly. Never omit, shorten, rush, or paraphrase any words. Treat each quoted text as one complete spoken thought and do not end early. Confident and thoughtful narrative tone, measured medium pace.'; Lines = @('Hello, I am an idea.', 'Riham imagined me first.', 'Then she designed, coded and refined me.', 'She taught me to be useful, clear and memorable.', 'Now, I will show you what she can create.') }
)

function Save-WaveFile([string]$Path, [byte[]]$PcmData) {
  $stream = [System.IO.File]::Open($Path, [System.IO.FileMode]::Create)
  $writer = New-Object System.IO.BinaryWriter($stream)
  try {
    $sampleRate = 24000
    $channels = 1
    $bitsPerSample = 16
    $byteRate = $sampleRate * $channels * ($bitsPerSample / 8)
    $blockAlign = $channels * ($bitsPerSample / 8)
    $writer.Write([System.Text.Encoding]::ASCII.GetBytes('RIFF'))
    $writer.Write([int](36 + $PcmData.Length))
    $writer.Write([System.Text.Encoding]::ASCII.GetBytes('WAVEfmt '))
    $writer.Write([int]16)
    $writer.Write([int16]1)
    $writer.Write([int16]$channels)
    $writer.Write([int]$sampleRate)
    $writer.Write([int]$byteRate)
    $writer.Write([int16]$blockAlign)
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
for ($index = 0; $index -lt $narration.Lines.Length; $index += 1) {
  if (($index + 1) -lt $StartAt -or ($index + 1) -gt $EndAt) { continue }
  $outputPath = Join-Path $outputDirectory "story-$($narration.Prefix)-$($index + 1).wav"
  if ((Test-Path -LiteralPath $outputPath) -and -not $Force) { Write-Output "Kept story-$($narration.Prefix)-$($index + 1).wav"; continue }
  $prompt = "Read this exact $($narration.Language) sentence aloud in a warm, natural voice. Pronounce every word completely and do not say anything else: $($narration.Lines[$index])"
  $payload = @{
    model = 'gemini-2.5-flash-preview-tts'
    input = $prompt
    response_format = @{ type = 'audio' }
    generation_config = @{ speech_config = @(@{ voice = 'Kore' }) }
  } | ConvertTo-Json -Depth 7 -Compress

  $response = Invoke-RestMethod -Method Post -Uri 'https://generativelanguage.googleapis.com/v1beta/interactions' -Headers @{ 'x-goog-api-key' = $apiKey } -ContentType 'application/json' -Body $payload
  $audioData = $response.output_audio.data
  if (-not $audioData -and $response.steps) {
    $audioData = ($response.steps | ForEach-Object { @($_.content) } | Where-Object { $_.type -eq 'audio' } | Select-Object -Last 1).data
  }
  if (-not $audioData) { $stepFields = if ($response.steps) { ($response.steps | Select-Object -First 1).PSObject.Properties.Name -join ', ' } else { 'none' }; throw "Gemini returned no audio for $($narration.Prefix) narration line $($index + 1). Status: $($response.status). Step fields: $stepFields" }
  $pcm = [System.Convert]::FromBase64String($audioData)
  Save-WaveFile -Path $outputPath -PcmData $pcm
  Write-Output "Generated story-$($narration.Prefix)-$($index + 1).wav"
}
}
