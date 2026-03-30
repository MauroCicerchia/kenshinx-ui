---
name: kenshinx-ui
description: Use this skill when building or styling React UIs with @kenshinx/ui, wiring its Tailwind preset and styles.css tokens, or choosing/importing its components such as Button, Form, Dialog, Calendar, Table, toast, and chart primitives.
---

# @kenshinx/ui

This skill provides access to `@kenshinx/ui`, a React UI component library built on Tailwind CSS and shadcn/ui patterns.

## Quick Start

If `@kenshinx/ui` is not installed in the target project, install the required packages first:
```bash
npm install @kenshinx/ui react react-dom tailwindcss
```

Install optional peers only if the components you use need them:

```bash
npm install recharts react-hook-form @hookform/resolvers zod
```

Use `scripts/setup.sh` for a minimal install, or `scripts/setup.sh --with-optional-peers` for the optional form/chart peers as well.

## Components & Usage

Read [references/components.md](references/components.md) for the exported components and helper utilities. Use the exact export names from that file when generating imports.

## Styling & Theming

Read [references/styling.md](references/styling.md) to wire `styles.css`, configure the Tailwind preset, and use the design tokens correctly.
