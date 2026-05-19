@echo off
echo.
echo ========================================
echo   AUNOPACK - Yerel Sunucu (serve)
echo ========================================
echo.
echo Durdurmak icin: Ctrl+C
echo.
echo Acilacak adres: http://localhost:3000
echo Ornek: http://localhost:3000/tr/solutions/#shelf-life
echo.
npx serve . -c serve.json -l 3000
pause
