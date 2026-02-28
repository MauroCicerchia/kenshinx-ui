#!/bin/bash
# Description: Helper script to install @kenshinx/ui and all peer dependencies

echo "Installing @kenshinx/ui and dependencies..."

npm install @kenshinx/ui \
  lucide-react \
  class-variance-authority \
  clsx \
  tailwind-merge \
  tailwindcss-animate \
  @radix-ui/react-avatar \
  @radix-ui/react-checkbox \
  @radix-ui/react-collapsible \
  @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-label \
  @radix-ui/react-popover \
  @radix-ui/react-select \
  @radix-ui/react-slot \
  @radix-ui/react-switch \
  @radix-ui/react-tabs \
  @radix-ui/react-tooltip \
  @radix-ui/react-progress \
  react-hook-form \
  @hookform/resolvers \
  zod \
  recharts \
  react-day-picker \
  date-fns \
  sonner \
  cmdk

echo "Dependencies installed successfully!"
