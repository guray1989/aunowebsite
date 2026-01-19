@echo off
echo.
echo ========================================
echo   AUNO Pack - Local Server
echo ========================================
echo.
echo Server baslatiliyor...
echo Tarayicida acin: http://localhost:8000
echo.
echo Durdurmak icin: Ctrl+C
echo.
python -m http.server 8000
pause
