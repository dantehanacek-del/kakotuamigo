@echo off
cd /d "C:\Users\dante\Desktop\kakotuamigo"
git add .
set /p msg="Descripcion del cambio: "
git commit -m "%msg%"
git push
echo.
echo Listo! El sitio se actualiza en ~1 minuto en kakotuamigo.vercel.app
pause
1 @echo off
      2 cd /d "C:\Users\dante\Desktop\kakotuamigo"
      3 git add .
      4 set /p msg="Descripcion del cambio: "
      5 git commit -m "%msg%"
      6 git push
      7 echo.
      8 echo Listo! El sitio se actualiza en ~1 minuto en kakotuamigo.vercel.app
      9 pause
