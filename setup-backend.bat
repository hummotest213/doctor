@echo off
REM Copy messages from frontend to backend for migration
REM Run this script once during initial setup

echo 📋 Copying translation files from frontend to backend...

REM Determine paths based on current directory
if exist "backend" (
  REM Running from project root
  set "FRONTEND_MESSAGES=frontend\src\messages"
  set "BACKEND_MESSAGES=backend\messages"
) else if exist "..\frontend" (
  REM Running from backend directory
  set "FRONTEND_MESSAGES=..\frontend\src\messages"
  set "BACKEND_MESSAGES=messages"
) else (
  echo ❌ Could not find frontend\src\messages
  exit /b 1
)

REM Create backend messages directory if it doesn't exist
if not exist "%BACKEND_MESSAGES%" (
  mkdir "%BACKEND_MESSAGES%"
)

REM Copy all JSON files
if exist "%FRONTEND_MESSAGES%" (
  xcopy "%FRONTEND_MESSAGES%\*.json" "%BACKEND_MESSAGES%\" /Y
  
  if %ERRORLEVEL% equ 0 (
    echo ✅ Messages copied successfully
    echo 📁 Location: %BACKEND_MESSAGES%
    dir /B "%BACKEND_MESSAGES%"
  ) else (
    echo ⚠️  Warning: Some files may not have been copied
  )
) else (
  echo ❌ Frontend messages directory not found at: %FRONTEND_MESSAGES%
  exit /b 1
)

echo.
echo Next steps:
echo 1. cd backend
echo 2. npm install
echo 3. npm run prisma:migrate
echo 4. npm run prisma:seed
echo 5. npm run migrate:from-json
pause
