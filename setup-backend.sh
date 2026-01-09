#!/bin/bash

# Copy messages from frontend to backend for migration
# Run this script once during initial setup

echo "📋 Copying translation files from frontend to backend..."

# Determine paths based on current directory
if [ -d "backend" ]; then
  # Running from project root
  FRONTEND_MESSAGES="frontend/src/messages"
  BACKEND_MESSAGES="backend/messages"
elif [ -d "../frontend" ]; then
  # Running from backend directory
  FRONTEND_MESSAGES="../frontend/src/messages"
  BACKEND_MESSAGES="messages"
else
  echo "❌ Could not find frontend/src/messages"
  exit 1
fi

# Create backend messages directory if it doesn't exist
mkdir -p "$BACKEND_MESSAGES"

# Copy all JSON files
if [ -d "$FRONTEND_MESSAGES" ]; then
  cp "$FRONTEND_MESSAGES"/*.json "$BACKEND_MESSAGES/" 2>/dev/null
  
  if [ $? -eq 0 ]; then
    echo "✅ Messages copied successfully"
    echo "📁 Location: $BACKEND_MESSAGES"
    ls -lah "$BACKEND_MESSAGES"
  else
    echo "⚠️  Warning: Some files may not have been copied"
  fi
else
  echo "❌ Frontend messages directory not found at: $FRONTEND_MESSAGES"
  exit 1
fi

echo ""
echo "Next steps:"
echo "1. cd backend"
echo "2. npm install"
echo "3. npm run prisma:migrate"
echo "4. npm run prisma:seed"
echo "5. npm run migrate:from-json"
