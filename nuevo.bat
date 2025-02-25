@echo off
set "ruta=C:\Users\Matias\Desktop\NetUy\final pruebas\img"
set "salida=C:\Users\Matias\Desktop\NetUy\final pruebas\contenido.txt"

echo Listado de archivos en IMG > "%salida%"
dir "%ruta%\img" /b >> "%salida%"

echo. >> "%salida%"
echo Listado de archivos en NOTICIAS >> "%salida%"
dir "%ruta%\noticias" /b >> "%salida%"

echo El contenido ha sido guardado en "%salida%"
pause
