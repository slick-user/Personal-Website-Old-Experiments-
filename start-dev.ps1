# PowerShell script to start development servers
# Run from the repo root: .\start-dev.ps1

Write-Host "Starting development servers..." -ForegroundColor Green

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; bundle exec rails server -p 3000" -WindowStyle Normal

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; bundle exec rails tailwindcss:watch" -WindowStyle Normal

Write-Host "Servers starting." -ForegroundColor Green
Write-Host "App: http://localhost:3000" -ForegroundColor Cyan
