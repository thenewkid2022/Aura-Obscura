#!/bin/bash

# Vercel Build Script für Aura Obscura
echo "Starting Vercel build..."

# Setze Environment-Variablen
export NODE_ENV=production
export VERCEL=1

# Führe den Build aus
echo "Running expo export..."
npx expo export --platform web --clear

echo "Build completed successfully!" 