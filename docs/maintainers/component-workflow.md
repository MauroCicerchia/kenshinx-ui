# Component Workflow

Use this guide when adding a new component or updating an existing one in `@kenshinx/ui`.

## Workflow Summary

1. Choose the source of truth for the component.
2. Implement it with library conventions.
3. Export it from the package entrypoint.
4. Document it in Storybook.
5. Smoke-test it in the playground when useful.
6. Run the required verification steps before merging.

## 1. Pick the Component Source

- For a shadcn/ui component, pull the latest upstream source first and adapt it to the library.
- For a custom component, match existing patterns in `packages/ui/src/components`.
- Check dependencies up front, especially new Radix primitives or optional peer dependencies.

## 2. Updating from Upstream shadcn/ui

### Pull the Latest Source

The preferred workflow is to use the shadcn MCP server in Cursor to fetch the current upstream component source.

Typical prompt:

```text
Use the shadcn MCP server to get the latest source for the Alert component
```

### Compare Before Applying Changes

Review the differences between:

- the upstream source
- the current local component in `packages/ui/src/components`
- the existing Storybook story, if one already exists

Pay attention to:

- new props or variants
- accessibility fixes
- Radix API changes
- class changes that may need token remapping
- breaking changes that should be rejected or adapted

### Re-Apply Library Conventions

- Keep file names in kebab-case
- Replace shadcn alias imports like `@/lib/utils` with local relative imports
- Export the component from `packages/ui/src/index.ts`
- Preserve stable public APIs unless a breaking change is intentional

## 3. Library Conventions

### Tokens and Styling

No hardcoded design values. Use tokens and Tailwind semantics already mapped by the preset.

Examples:

```tsx
// Good
<div className="bg-background text-foreground border-border rounded-md" />

// Bad
<div className="bg-white text-gray-900 border-gray-200 rounded-lg" />
```

Use:

- semantic color utilities such as `bg-primary`, `text-muted-foreground`, `border-input`
- Tailwind radius classes backed by `--radius`
- the shared `cn()` helper for class merging
- `class-variance-authority` when the component has meaningful variants

### Component Patterns

- Support `className` for consumer overrides
- Forward refs where appropriate
- Export relevant prop types
- Follow existing component structure before inventing a new abstraction
- Prefer composition over boolean-prop accumulation

Typical shape:

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const componentVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "...",
      secondary: "...",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, ...props }, ref) => (
    <element
      ref={ref}
      className={cn(componentVariants({ variant }), className)}
      {...props}
    />
  )
)
```

## 4. Required Integration Steps

### Package Exports

Add the component and any public types to [`packages/ui/src/index.ts`](../../packages/ui/src/index.ts).

Example:

```ts
export { ComponentName } from "./components/component-name"
export type { ComponentNameProps } from "./components/component-name"
```

### Storybook

Add or update the story in `apps/storybook/src/stories`.

Minimum expectations:

- default usage
- variants
- sizes or states, when applicable
- composition examples for compound components

Storybook is the primary consumer documentation surface, so stories should explain the component better than a README would.

### Playground

Add a playground example when the component benefits from local smoke testing or composition testing. The playground is especially useful for:

- form flows
- interaction-heavy components
- chart or data-heavy components
- components that need manual visual verification outside Storybook isolation

## 5. Verification Checklist

Run from the repository root unless you need a more targeted command:

```bash
bun run build
bun run lint
bun run test
```

Also verify:

- the Storybook story renders correctly
- light and dark themes both work
- no hardcoded colors or radii slipped in
- optional dependencies are documented when relevant

## 6. Commit Guidance

- Use Conventional Commits
- Use `feat:` for new components
- Use `fix:` for behavior corrections
- Use `docs:` for documentation-only changes

The release and commit policy details live in [`docs/maintainers/operations.md`](./operations.md).
