@echo off
title Install Chat Welcome
echo Installing required packages for Chat Welcome...
py -m pip install --upgrade pip
py -m pip install -r requirements.txt
if errorlevel 1 (
  echo.
  echo Installation failed. Please check that Python is installed.
  pause
  exit /b 1
)
echo.
echo Setup complete!
pause
