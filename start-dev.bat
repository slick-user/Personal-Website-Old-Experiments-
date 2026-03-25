@echo off
echo Starting development servers...

start "Rails Server" cmd /k "cd backend && bundle exec rails server -p 3000"
start "Tailwind CSS" cmd /k "cd backend && bundle exec rails tailwindcss:watch"

echo.
echo Servers starting.
echo App: http://localhost:3000
pause
