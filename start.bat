@echo off
title Fireseeker Premium Prototype
echo ==============================================
echo FIRESEEKER - INICIALIZANDO PROTOTIPO PREMIUM
echo ==============================================
echo.
echo Verificando dependencias...
call npm install
echo.
echo Iniciando servidor de desenvolvimento...
call npm run dev
pause
