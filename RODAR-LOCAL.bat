@echo off
title Rams Select - servidor local
cd /d "%~dp0"
:inicio
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0servidor.ps1"
echo.
echo O servidor parou. Reiniciando em 3 segundos... (feche a janela para encerrar)
timeout /t 3 >nul
goto inicio
