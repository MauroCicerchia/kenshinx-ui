# Kenshin UI

Personal UI component library monorepo for `@kenshinx/ui`, built with React, Tailwind CSS, and shadcn/ui patterns.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3+-61DAFB.svg)](https://react.dev/)

## What Lives Here

This repository contains:

- `packages/ui`: the published `@kenshinx/ui` package
- `apps/storybook`: the primary consumer-facing documentation surface
- `apps/playground`: a local smoke-test app for development
- `docs`: maintainer documentation for contribution and operations

## Repository Layout

```text
kenshinx-ui/
├── apps/
│   ├── playground/
│   └── storybook/
├── docs/
│   └── maintainers/
└── packages/
    └── ui/
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) 1.0+
- Node.js 18+

### Install

```bash
git clone https://github.com/MauroCicerchia/kenshinx-ui.git
cd kenshinx-ui
bun install
```

### Main Commands

```bash
bun run dev
bun run dev:playground
bun run dev:storybook

bun run build
bun run lint
bun run test
```

## Documentation Map

- Package quickstart: [`packages/ui/README.md`](./packages/ui/README.md)
- Consumer docs: Storybook in [`apps/storybook`](./apps/storybook)
- Maintainer docs: [`docs/README.md`](./docs/README.md)

## Development Notes

- Storybook is the canonical place for component usage, onboarding, and theming guidance.
- The playground is for local validation and ad hoc smoke testing, not for primary documentation.
- Release automation runs through GitHub Actions and `semantic-release`; operational details live in [`docs/maintainers/operations.md`](./docs/maintainers/operations.md).

## License

MIT © [Mauro Cicerchia](https://github.com/MauroCicerchia)
