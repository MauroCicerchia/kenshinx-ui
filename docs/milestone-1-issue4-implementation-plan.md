# Implementation Plan — Issue 4: Streak Component

# 1. Understanding

- Create a **single flat component** (`Streak`) that renders a numeric count alongside a flame icon and an optional label (e.g., "day streak") in a compact, inline layout.
- Use **CVA** for two variant axes: `intensity` (`inactive | active | hot`) controlling visual treatment, and `size` (`sm | default | lg`) scaling icon and text. The `intensity` variant is automatically derived from the `count` value, with `hot` triggering above a configurable `hotThreshold` prop.
- Ship Storybook stories, a playground demo, and pass `bun run build` + `bun run lint`.

**Key assumptions:**
- No new npm dependencies needed — `lucide-react` (v0.469.0) is already a dependency of `@kenshinx/ui` and includes the `Flame` icon.
- The `intensity` variant is automatically computed from `count` (not passed manually), but the CVA definition still exposes them for `className`-level overrides.
- The `hot` threshold defaults to `7` (a sensible default for daily streaks) but is configurable via a `hotThreshold` prop.
- Colors for `active` and `hot` variants should use CSS variable tokens (e.g., `text-primary`, `text-destructive`) to remain theme-agnostic. Specific `orange`/`amber` Tailwind classes are acceptable for the flame-specific visual treatment since these are semantic to the streak concept, similar to how `ProgressBar` uses `bg-green-500` for its `success` variant.

---

# 2. Proposed Approach

1. **Create component file** `packages/ui/src/components/streak.tsx`
   - Define `streakVariants` with CVA:
     - `intensity`: `inactive` (muted icon + text), `active` (vibrant primary colors), `hot` (warm colors + a subtle pulse/glow animation).
     - `size`: `sm`, `default`, `lg` — scaling icon dimensions, font size, and gap.
   - Define a single `forwardRef` component `Streak`:
     - Props: `count` (number), `label?` (string), `icon?` (ReactNode, defaults to `<Flame />`), `hotThreshold?` (number, defaults to `7`), `className?`, plus standard `HTMLDivElement` attributes.
     - Automatically derives `intensity` from `count`: `0 → inactive`, `1..hotThreshold-1 → active`, `≥ hotThreshold → hot`.
     - Renders: `[icon] [count] [label?]` in a flex-row inline layout.
   - Set `displayName`.

2. **Export from index** — add `Streak`, `streakVariants`, and `StreakProps` type to `packages/ui/src/index.ts`.

3. **Create Storybook story** `apps/storybook/src/stories/Streak.stories.tsx` with stories: `Default`, `Inactive`, `Active`, `Hot`, `Sizes`, `CustomIcon`.

4. **Add playground demo** — append a Streak demo section to `apps/playground/src/App.tsx` following the same `Card`-wrapped pattern used for ProgressBar / EmptyState.

5. **Verify** — run build and lint.

**Why this approach fits:**
- Matches the existing single-component pattern (`Badge`, `ProgressBar`) — no compound component overhead needed for a simple widget.
- Uses only existing dependencies (`class-variance-authority`, `cn()`, `lucide-react`).
- Auto-deriving `intensity` from `count` is the most ergonomic API: consumers just pass `count={5}` and get the right visual.

---

# 3. Files to Change

### Modified files

| File | Reason |
|------|--------|
| [`index.ts`](file:///Users/maurocicerchia/kenshinx/ui/packages/ui/src/index.ts) | Export `Streak`, `streakVariants`, and `StreakProps` type |
| [`App.tsx`](file:///Users/maurocicerchia/kenshinx/ui/apps/playground/src/App.tsx) | Add Streak playground demo section (import + JSX block) |

### New files

| File | Reason |
|------|--------|
| [`streak.tsx`](file:///Users/maurocicerchia/kenshinx/ui/packages/ui/src/components/streak.tsx) | Component implementation |
| [`Streak.stories.tsx`](file:///Users/maurocicerchia/kenshinx/ui/apps/storybook/src/stories/Streak.stories.tsx) | Storybook stories (6 stories) |

---

# 4. API / Data / UI Impact

### Component API

```tsx
// Basic usage — auto-selects "active" intensity
<Streak count={5} />

// With optional label
<Streak count={12} label="day streak" />

// Inactive (count = 0)
<Streak count={0} />

// Hot (count ≥ hotThreshold)
<Streak count={30} hotThreshold={7} />

// Custom icon
<Streak count={3} icon={<Zap className="h-[1em] w-[1em]" />} />

// Size variants
<Streak count={5} size="sm" />
<Streak count={5} size="lg" />
```

### Props interface

```tsx
export interface StreakProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof streakVariants> {
  /** The current streak count */
  count: number;
  /** Optional label text displayed after the count (e.g., "day streak") */
  label?: string;
  /** Optional custom icon (defaults to Flame from lucide-react) */
  icon?: React.ReactNode;
  /** Count threshold at which the "hot" intensity activates (default: 7) */
  hotThreshold?: number;
}
```

- **Endpoints / contracts**: none.
- **Data model**: none.
- **UI routes**: none (playground is an existing page).

### CVA variant mapping

**Size variants:**

| Token | `sm` | `default` | `lg` |
|-------|------|-----------|------|
| Icon size | `h-4 w-4` | `h-5 w-5` | `h-7 w-7` |
| Count text | `text-sm` | `text-base` | `text-xl` |
| Label text | `text-xs` | `text-sm` | `text-base` |
| Gap | `gap-1` | `gap-1.5` | `gap-2` |

**Intensity variants:**

| Intensity | Icon | Count text | Animation |
|-----------|------|------------|-----------|
| `inactive` | `text-muted-foreground` | `text-muted-foreground` | none |
| `active` | `text-orange-500 dark:text-orange-400` | `text-foreground font-bold` | none |
| `hot` | `text-red-500 dark:text-red-400` | `text-foreground font-extrabold` | subtle pulse on icon |

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

- Verify all 6 stories render without errors: **Default**, **Inactive**, **Active**, **Hot**, **Sizes**, **CustomIcon**.
- Toggle dark mode and confirm colors adapt (no hardcoded values outside the acceptable orange/red semantic classes which already include `dark:` variants).

### Playground Smoke Test

```bash
cd apps/playground
bun run dev
```

- Verify the Streak demo section renders correctly on the playground page.
- Toggle light/dark mode using the existing theme switch.

> **Note:** No unit tests are planned for this component, consistent with the repo's current testing strategy (see `ai-agent-context.md` §8: "Start minimal"). The component is purely presentational with trivial derived logic (`count` → `intensity` mapping).

---

# 6. Acceptance Criteria Mapping

| Criterion | How it will be satisfied |
|-----------|------------------------|
| `Streak` is exported from `@kenshinx/ui` | Added to `packages/ui/src/index.ts` |
| Renders count prominently alongside an icon (flame by default) | Component renders `<Flame />` from `lucide-react` + count in a flex-row layout with bold/extrabold text |
| `inactive` variant is visually muted when count is 0 | CVA `intensity: "inactive"` applies `text-muted-foreground` to both icon and count; auto-selected when `count === 0` |
| `active` and `hot` variants are visually distinct and vibrant | `active` uses orange tones, `hot` uses red tones + pulse animation; clearly differentiated |
| `size` variants (`sm`, `default`, `lg`) properly scale icon and text | CVA `size` variant maps to different `h-X w-X`, `text-X`, and `gap-X` classes |
| Custom icon can be passed via the `icon` prop | `icon` prop accepts any `ReactNode`; demonstrated in `CustomIcon` story |
| Renders correctly in light and dark mode | All colors use CSS variable tokens or include explicit `dark:` variants |
| Storybook stories render without errors | 6 stories created and verified via `bun run storybook` |
| Component is demonstrated in the playground app | New section in `apps/playground/src/App.tsx` |
| `bun run build` passes | Verified before PR |
| `bun run lint` passes | Verified before PR |

---

# 7. Risk & Rollback Notes

### Potential pitfalls

- **Pulse animation**: The `hot` variant uses a CSS pulse animation. Need to ensure the animation keyframes are available — the repo already has `tailwindcss-animate` as a dependency, which provides `animate-pulse`. If a custom animation is preferred over the standard pulse, it can be defined inline or added to the Tailwind preset, but starting with `animate-pulse` is simplest.
- **Icon sizing consistency**: The default `<Flame />` icon inherits sizing from CVA classes. Custom icons passed via the `icon` prop may need consumers to apply `h-[1em] w-[1em]` or `className="size-[1em]"` themselves if they don't match the expected dimensions. This is acceptable and will be documented in the `CustomIcon` story.
- **Playground file size**: `App.tsx` is already ~1,531 lines. Adding another section increases it slightly but is consistent with existing playground patterns.

### Rollback

- Revert is a single commit: remove `streak.tsx`, the story file, the index export lines, and the playground section. No migrations or external service changes.

---

# 8. Ready-to-Execute Checklist

- [x] Issue requirements are clear — no open questions
- [x] Existing single-component pattern studied (`badge.tsx`, `progress-bar.tsx`)
- [x] CVA pattern studied (`progress-bar.tsx`, `badge.tsx`, `button.tsx`)
- [x] `lucide-react` confirmed as existing dependency (v0.469.0) with `Flame` icon available
- [x] Storybook story convention studied (`ProgressBar.stories.tsx`)
- [x] Playground demo convention studied (`App.tsx` ProgressBar / EmptyState sections)
- [x] Index export convention studied (`index.ts`)
- [x] No new dependencies required
- [x] Component addition checklist reviewed (`component-addition-checklist.md`)
