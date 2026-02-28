# Implementation Plan — Issue 5: EmptyState Component

# 1. Understanding

- Create a **compound component** (`EmptyState`, `EmptyStateIcon`, `EmptyStateTitle`, `EmptyStateDescription`, `EmptyStateAction`) following the same pattern as `Card` / `Alert` in the repo — each sub-component is a `forwardRef` wrapper with `cn()` class merging and a `displayName`.
- The root `EmptyState` container uses **CVA** for a `size` variant (`sm | default | lg`) that scales padding, icon size, and typography. All colors reference CSS variable tokens — no hardcoded values.
- Ship Storybook stories, a playground demo, and pass `bun run build` + `bun run lint`.

**Key assumptions:**
- No new npm dependencies are needed (pure React + CVA + `cn()`).
- The `size` variant on the root `EmptyState` is sufficient; sub-components adapt via Tailwind responsive utilities or size-aware class maps, not separate CVA configs per sub-component.

---

# 2. Proposed Approach

1. **Create component file** `packages/ui/src/components/empty-state.tsx`
   - Define `emptyStateVariants` with CVA (`size: sm | default | lg`) controlling padding, gap, and max-width.
   - Define five `forwardRef` sub-components mirroring the `Card` pattern:
     - `EmptyState` — flex column, centered content, applies `emptyStateVariants`.
     - `EmptyStateIcon` — wraps children (any React node) with muted color and size-responsive classes.
     - `EmptyStateTitle` — renders an `<h3>` with token-based text color.
     - `EmptyStateDescription` — renders a `<p>` with `text-muted-foreground`.
     - `EmptyStateAction` — renders a `<div>` wrapper (typically around a `Button`).
   - Each sub-component: accepts `className`, forwards ref, sets `displayName`.

2. **Export from index** — add all five components + `emptyStateVariants` + `EmptyStateProps` type to `packages/ui/src/index.ts`.

3. **Create Storybook story** `apps/storybook/src/stories/EmptyState.stories.tsx` with stories: `Default`, `WithAction`, `IconOnly`, `Compact` (size `sm`), `FullPage` (size `lg`), `CustomIllustration`.

4. **Add playground demo** — append an EmptyState demo section to `apps/playground/src/App.tsx` following the same `Card`-wrapped pattern used for ProgressBar.

5. **Verify** — run build and lint.

**Why this approach fits:**
- Matches the existing compound component pattern (`Card`, `Alert`, `Table`, `Sheet`) one-to-one.
- Uses only existing dependencies (`class-variance-authority`, `cn()` helper).
- Keeps the component tree-shakeable and composable.

---

# 3. Files to Change

### Modified files

| File | Reason |
|------|--------|
| [`index.ts`](file:///Users/maurocicerchia/kenshinx/ui/packages/ui/src/index.ts) | Export the five new sub-components, `emptyStateVariants`, and `EmptyStateProps` type |
| [`App.tsx`](file:///Users/maurocicerchia/kenshinx/ui/apps/playground/src/App.tsx) | Add EmptyState playground demo section (import + JSX block) |

### New files

| File | Reason |
|------|--------|
| [`empty-state.tsx`](file:///Users/maurocicerchia/kenshinx/ui/packages/ui/src/components/empty-state.tsx) | Component implementation |
| [`EmptyState.stories.tsx`](file:///Users/maurocicerchia/kenshinx/ui/apps/storybook/src/stories/EmptyState.stories.tsx) | Storybook stories (6 stories) |

---

# 4. API / Data / UI Impact

### Component API

```tsx
// Root container — applies size variant
<EmptyState size="default | sm | lg" className="...">
  <EmptyStateIcon>
    <InboxIcon className="..." />  {/* Consumer provides icon */}
  </EmptyStateIcon>
  <EmptyStateTitle>No quests today</EmptyStateTitle>
  <EmptyStateDescription>
    Check back tomorrow for new quests.
  </EmptyStateDescription>
  <EmptyStateAction>
    <Button>Create Quest</Button>
  </EmptyStateAction>
</EmptyState>
```

- **Endpoints / contracts**: none.
- **Data model**: none.
- **UI routes**: none (playground is an existing page).

### CVA size variant mapping (approximate)

| Token | `sm` | `default` | `lg` |
|-------|------|-----------|------|
| Container padding | `py-6 px-4` | `py-10 px-6` | `py-16 px-8` |
| Gap | `gap-2` | `gap-3` | `gap-4` |
| Icon wrapper | `[&>svg]:h-8 [&>svg]:w-8` | `[&>svg]:h-10 [&>svg]:w-10` | `[&>svg]:h-16 [&>svg]:w-16` |
| Title | `text-base` | `text-lg` | `text-xl` |
| Description | `text-xs` | `text-sm` | `text-base` |

---

# 5. Testing Plan

### Build & Lint (automated)

```bash
# From repo root
bun run build    # Ensures the component compiles and is bundled correctly
bun run lint     # Ensures no linting errors
```

### Storybook Visual Verification

```bash
cd apps/storybook
bun run storybook
```

- Verify all 6 stories render without errors: **Default**, **WithAction**, **IconOnly**, **Compact**, **FullPage**, **CustomIllustration**.
- Toggle dark mode and confirm colors adapt (no hardcoded values).

### Playground Smoke Test

```bash
cd apps/playground
bun run dev
```

- Verify the EmptyState demo section renders correctly on the playground page.
- Toggle light/dark mode using the existing theme switch.

> **Note:** No unit tests are planned for this component, consistent with the repo's current testing strategy (see `ai-agent-context.md` §8: "Start minimal"). The component is purely presentational with no logic to unit-test.

---

# 6. Acceptance Criteria Mapping

| Criterion | How it will be satisfied |
|-----------|------------------------|
| `EmptyState`, `EmptyStateIcon`, `EmptyStateTitle`, `EmptyStateDescription`, `EmptyStateAction` exported from `@kenshinx/ui` | Added to `packages/ui/src/index.ts` |
| Content is visually centered | Root `EmptyState` uses `flex flex-col items-center justify-center text-center` |
| `size` variants scale padding, icon size, typography | CVA `emptyStateVariants` with `sm`, `default`, `lg`; icon/title/description use size-responsive classes |
| Works standalone or fully composed | Each sub-component is optional; only `EmptyState` is required. Storybook stories demonstrate standalone (just title) and composed usage |
| Light and dark mode | All colors use CSS variable tokens (`text-foreground`, `text-muted-foreground`, `bg-background`, etc.) |
| Storybook stories render without errors | 6 stories created and verified via `bun run storybook` |
| Demonstrated in playground | New section in `apps/playground/src/App.tsx` |
| `bun run build` passes | Verified before PR |
| `bun run lint` passes | Verified before PR |

---

# 7. Risk & Rollback Notes

### Potential pitfalls

- **Size-responsive icon classes**: The `EmptyStateIcon` needs to set default icon dimensions. Using `[&>svg]:h-X [&>svg]:w-X` selectors on the icon wrapper ensures any SVG child is sized correctly, but custom illustration components (non-SVG React components) may need the consumer to handle sizing themselves. This is acceptable and documented in the `CustomIllustration` story.
- **Playground file size**: `App.tsx` is already ~1,484 lines. Adding another section increases it slightly, but this is consistent with existing playground patterns.

### Rollback

- Revert is a single commit: remove `empty-state.tsx`, the story file, the index export lines, and the playground section. No migrations or external service changes.

---

# 8. Ready-to-Execute Checklist

- [x] Issue requirements are clear — no open questions
- [x] Existing compound component pattern studied (`card.tsx`, `alert.tsx`)
- [x] CVA pattern studied (`progress-bar.tsx`, `alert.tsx`, `button.tsx`)
- [x] Storybook story convention studied (`ProgressBar.stories.tsx`)
- [x] Playground demo convention studied (`App.tsx` ProgressBar section)
- [x] Index export convention studied (`index.ts`)
- [x] No new dependencies required
- [x] Component addition checklist reviewed (`component-addition-checklist.md`)
