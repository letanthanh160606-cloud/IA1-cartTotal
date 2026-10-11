param(
  [ValidatePattern('^[A-Za-z0-9_-]*$')]
  [string]$StudentID = ''
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$report = Get-Content -LiteralPath (Join-Path $projectRoot 'SELF_ASSESSMENT_REPORT.md') -Raw -Encoding UTF8
$scoreMatch = [regex]::Match($report, 'Total I claim: (\d+) / 100')
if (-not $scoreMatch.Success) {
  throw 'Cannot read total score from SELF_ASSESSMENT_REPORT.md'
}
$score = $scoreMatch.Groups[1].Value

Push-Location -LiteralPath $projectRoot
try {
  & npm.cmd run check
  if ($LASTEXITCODE -ne 0) {
    throw 'Quality gate failed; archive was not created.'
  }

  # Explicit list includes .github and excludes .git, .env and old archives.
  $files = @(
    'src/cart.js', 'test/cart.test.js', 'scripts/check-format.js',
    'scripts/package.ps1', '.github/workflows/ci.yml', '.gitignore',
    'package.json', 'README.md', 'CLAUDE.md', 'brief.md',
    'AI-LOG.md', 'SELF_ASSESSMENT_REPORT.md', 'PROJECT_SUMMARY.md',
    'evidence/ci-success.png'
  )
  foreach ($relativePath in $files) {
    if (-not (Test-Path -LiteralPath (Join-Path $projectRoot $relativePath) -PathType Leaf)) {
      throw "Missing submission file: $relativePath"
    }
  }

  $outputDirectory = Join-Path $projectRoot 'submission'
  New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
  $archiveName = if ($StudentID) { "${StudentID}_${score}.zip" } else { "IA1-cartTotal_DRAFT_${score}.zip" }
  $archivePath = Join-Path $outputDirectory $archiveName

  # CreateNew prevents overwriting an existing submission accidentally.
  Add-Type -AssemblyName System.IO.Compression
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  $stream = [System.IO.File]::Open($archivePath, [System.IO.FileMode]::CreateNew)
  try {
    $archive = [System.IO.Compression.ZipArchive]::new($stream, [System.IO.Compression.ZipArchiveMode]::Create)
    try {
      foreach ($relativePath in $files) {
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
          $archive, (Join-Path $projectRoot $relativePath), $relativePath
        ) | Out-Null
      }
    } finally {
      $archive.Dispose()
    }
  } finally {
    $stream.Dispose()
  }

  Write-Output "Created: $archivePath"
  if (-not $StudentID) {
    Write-Output 'DRAFT: fill in student details and review score before submission.'
  }
} finally {
  Pop-Location
}
