@echo off

REM Resolve script directory
cd /d "%~dp0"

REM Cloudflared
start "" cloudflared tunnel run enernova-tunnel

REM Node backend
start "" cmd /c "cd backend && node server.js"

REM npm dev (frontend)
start "" cmd /c "cd frontend && npm run dev"
