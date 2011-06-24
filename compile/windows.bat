@echo off

set name=xlcolorscale

cd %~dp0\..

echo Scanning PATH for compiler.jar...
set pathq=%PATH%
:while
if "%pathq%"=="" goto notfound
for /f "delims=;" %%i in ("%pathq%") do (
  if exist "%%i\compiler.jar" (
    set jardir=%%i
    goto found
  )
)
for /f "delims=; tokens=1,*" %%i in ("%pathq%") do set pathq=%%j
goto while

:found
echo Detected in %jardir%!
set /p version=Enter version number (leave blank for none): 
if "%version%" neq "" set version=-%version%

echo Compiling %name%.js to %name%%version%.min.js...
java -jar "%jardir%\compiler.jar" --js %name%.js --js_output_file %name%%version%.min.js
echo Done!
goto exit

:notfound
echo compiler.jar not found in PATH!

:exit
