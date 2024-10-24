@echo off

:Run-Process
cls
title Newfies Run Discord.js Bot Tool
echo Starting the app...
echo.
cls
echo [SERVER] Press Any Key To Stop The Discord.js Bot.
echo.
start /b node .
pause > nul
echo.
taskkill /f /im node.exe
echo.
choice /c YN /m "Do you want to restart Discord.js Bot (Y/N)?"
if errorlevel 2 goto Exit-Process
if errorlevel 1 goto Run-Process

:Exit-Process
echo Discord.js Bot stopped. Exiting now...
timeout 5 >nul