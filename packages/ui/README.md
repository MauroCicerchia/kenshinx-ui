# @kenshinx/ui

React UI component library built with Tailwind CSS and shadcn/ui patterns.

[![npm version](https://img.shields.io/npm/v/@kenshinx/ui.svg)](https://www.npmjs.com/package/@kenshinx/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
npm install @kenshinx/ui react react-dom tailwindcss
```

Alternative package managers:

```bash
bun add @kenshinx/ui react react-dom tailwindcss
pnpm add @kenshinx/ui react react-dom tailwindcss
yarn add @kenshinx/ui react react-dom tailwindcss
```

## Peer Dependencies

Required:

- `react` `^18.0.0 || ^19.0.0`
- `react-dom` `^18.0.0 || ^19.0.0`
- `tailwindcss` `^3.4.0`

Optional, depending on the components you use:

- `recharts`
- `react-hook-form`
- `@hookform/resolvers`
- `zod`

## Quick Start

### 1. Configure Tailwind

```ts
import type { Config } from "tailwindcss"
import kenshinPreset from "@kenshinx/ui/tailwind-preset"

export default {
  presets: [kenshinPreset],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@kenshinx/ui/dist/**/*.js",
  ],
} satisfies Config
```

### 2. Import the Tokens

```ts
import "@kenshinx/ui/styles.css"
```

### 3. Render a Component

```tsx
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from "@kenshinx/ui"

export function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="Type something..." />
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## Theming

`@kenshinx/ui` is token-based. Override CSS variables in your application to adapt the look without forking the library.

```css
:root {
  --primary: 221 83% 53%;
  --primary-foreground: 210 40% 98%;
  --radius: 0.75rem;
}
```

For the full token model and examples, use the Storybook theming docs.

## Documentation

- Interactive docs and component usage: Storybook in `apps/storybook`
- Repository overview: [`README.md`](../../README.md)
- Maintainer workflows: [`docs/README.md`](../../docs/README.md)

## License

MIT © [Mauro Cicerchia](https://github.com/MauroCicerchia)
