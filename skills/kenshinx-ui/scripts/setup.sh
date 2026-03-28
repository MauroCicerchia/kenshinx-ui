#!/bin/bash
# Description: Helper script to install @kenshinx/ui with required peers.

set -euo pipefail

echo "Installing @kenshinx/ui with required peer dependencies..."
npm install @kenshinx/ui react react-dom tailwindcss

if [[ "${1:-}" == "" ]]; then
  :
elif [[ "${1:-}" == "--with-optional-peers" ]]; then
  echo "Installing optional peers for form and chart components..."
  npm install recharts react-hook-form @hookform/resolvers zod
else
  echo "Unknown option: ${1}" >&2
  echo "Usage: ./setup.sh [--with-optional-peers]" >&2
  exit 1
fi

echo "Installation completed successfully."
