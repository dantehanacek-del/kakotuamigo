@echo off
cd /d "C:\Users\dante\Desktop\kakotuamigo"
git add .
set /p msg="Descripcion del cambio: "
git commit -m "%msg%"
git push
echo.
echo Listo! El sitio se actualiza en ~1 minuto en kakotuamigo.vercel.app
pause
