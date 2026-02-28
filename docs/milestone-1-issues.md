# Milestone 1 — New `@kenshinx/ui` Components for Questo

> **Context:** The [Questo](file:///Users/maurocicerchia/kenshinx/questo) app requires five new generic components in the `@kenshinx/ui` library. Each component must follow the existing [Component Addition Checklist](file:///Users/maurocicerchia/kenshinx/ui/docs/component-addition-checklist.md) and be generic enough to be reused in any project.

---

## Issue 1 — BottomNav

**Title:** feat: add BottomNav component

**Description:**
Create a mobile bottom navigation bar component for `@kenshinx/ui`. This is a fixed-position bar rendered at the bottom of the viewport containing a configurable set of navigation items (icon + label). It is the primary navigation pattern for mobile-first apps (e.g., Questo's four tabs: Today, Quests, Chapters, Profile).

The component should be **generic** — it accepts an array of items and an active indicator, not hardcoded routes. It must be composable (compound component pattern preferred, similar to how `Tabs` is structured in the library).

**Objective:**
Provide a reusable, accessible bottom navigation component that any mobile-first app can use.

**Scope:**
- Create `packages/ui/src/components/bottom-nav.tsx` with compound components: `BottomNav`, `BottomNavItem` (and optionally `BottomNavIcon`, `BottomNavLabel`).
- Use CVA variants for visual states (active, inactive, disabled).
- Use CSS variable tokens for all colors (`--primary`, `--muted-foreground`, etc.) — no hardcoded values.
- Support `className` prop override on all sub-components and forward refs.
- Export from `packages/ui/src/index.ts`.
- Create Storybook story in `apps/storybook/src/stories/BottomNav.stories.tsx` with: Default, WithBadge (notification dot), ActiveStates, and CustomIcons stories.
- Add an example of the component to the playground app (`apps/playground`).
- Verify build (`bun run build`), lint, and Storybook rendering.

**Out of Scope:**
- Routing integration (e.g., React Router `NavLink`). Consumers handle navigation logic.
- Badge/notification count indicator (can be a follow-up).
- Responsive breakpoint logic to auto-hide on desktop. Consumers control when to render it.
- Animation/transition on tab switch (can be a follow-up enhancement).

**Acceptance Criteria:**
- [ ] `BottomNav` and `BottomNavItem` are exported from `@kenshinx/ui`.
- [ ] Active state is visually distinct (e.g., tinted icon + label using `--primary`).
- [ ] Supports 2–6 items without layout breakage.
- [ ] All interactive elements have appropriate ARIA roles (`role="navigation"`, `aria-current`).
- [ ] Keyboard navigable (arrow keys move focus between items, Enter/Space activates).
- [ ] Renders correctly in light and dark mode.
- [ ] Storybook stories render without errors.
- [ ] Component is demonstrated in the playground app.
- [ ] `bun run build` passes with no errors.
- [ ] `bun run lint` passes with no errors.

**Estimated Complexity:** Medium

---

## Issue 2 — ProgressBar

**Title:** feat: add ProgressBar component

**Description:**
Create a visual progress bar component for `@kenshinx/ui`. This renders a horizontal bar that fills proportionally to a given `value` (0–100). It is useful for showing rank progression, chapter completion percentages, onboarding steps, etc.

Shadcn/ui provides a [Progress](https://ui.shadcn.com/docs/components/progress) component built on `@radix-ui/react-progress` — this should be used as the foundation.

**Objective:**
Provide a reusable, accessible progress bar that supports multiple visual variants and animated value transitions.

**Scope:**
- Create `packages/ui/src/components/progress-bar.tsx` based on the shadcn/ui Progress component.
- Add `@radix-ui/react-progress` as a peer dependency in `packages/ui/package.json`.
- Use CVA variants for visual styles: `default`, `success`, `warning`, `info`.
- Support `size` variant: `sm`, `default`, `lg`.
- Support optional `label` (e.g., "75%") via an `aria-label` or visible text.
- Animate fill width transitions with CSS `transition` (not JS animation libraries).
- Use CSS variable tokens for all colors — no hardcoded values.
- Support `className` and forward ref.
- Export from `packages/ui/src/index.ts`.
- Create Storybook story with: Default, Variants, Sizes, Animated (value changes over time), and WithLabel stories.
- Add an example of the component to the playground app (`apps/playground`).
- Verify build, lint, and Storybook rendering.

**Out of Scope:**
- Circular / radial progress indicator (separate component if needed).
- Indeterminate / loading state (can be a follow-up).
- Step-based progress (e.g., "Step 2 of 5") — that's a separate Stepper component.

**Acceptance Criteria:**
- [ ] `ProgressBar` is exported from `@kenshinx/ui`.
- [ ] Renders a filled bar proportional to `value` (0–100), clamped.
- [ ] Supports `variant` and `size` props via CVA.
- [ ] Fill transition is smooth (CSS `transition-all`).
- [ ] Uses `@radix-ui/react-progress` for proper `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- [ ] Renders correctly in light and dark mode.
- [ ] Storybook stories render without errors.
- [ ] Component is demonstrated in the playground app.
- [ ] `bun run build` passes with no errors.
- [ ] `bun run lint` passes with no errors.

**Estimated Complexity:** Low

---

## Issue 3 — HeatMap

**Title:** feat: add HeatMap component

**Description:**
Create a GitHub-style contribution/completion heat map component for `@kenshinx/ui`. This renders a calendar grid where each cell represents a day, and the cell's color intensity indicates the value for that day (e.g., number of quests completed). It is used in Questo for the quest completion heat map on the Profile screen.

This is a **custom component** (no shadcn/ui equivalent). It should accept a data array of `{ date: string; value: number }` entries and render a grid of ~365 cells (trailing 12 months).

**Objective:**
Provide a reusable, configurable heat map grid that any app can use to visualize daily activity data over time.

**Scope:**
- Create `packages/ui/src/components/heat-map.tsx`.
- Accept props: `data` (array of `{ date: string; value: number }`), `startDate` / `endDate` (optional, defaults to trailing 12 months), `colorScale` (optional override), `emptyColor` (optional).
- Render a grid of day cells organized by week (columns) and day-of-week (rows), with month labels along the top and weekday labels on the left.
- Color intensity is derived from quantile buckets (e.g., 0, 1–25%, 26–50%, 51–75%, 76–100% of max value) — similar to GitHub's 5-level scale.
- Use CSS variable tokens for the color scale (e.g., `--heatmap-0` through `--heatmap-4`) with sensible defaults derived from `--primary`.
- Show a tooltip on hover/focus with the date and value.
- Support `className` and forward ref on the outer container.
- Export from `packages/ui/src/index.ts`.
- Create Storybook story with: Default (random data), Empty, SingleMonth, FullYear, and CustomColors stories.
- Add an example of the component to the playground app (`apps/playground`).
- Verify build, lint, and Storybook rendering.

**Out of Scope:**
- Click/select interaction on cells (e.g., filtering by date). Consumers can layer this on top.
- Non-calendar grid layouts (e.g., circular or matrix).
- Server-side rendering optimizations.
- Responsive collapsing (e.g., hiding months on small screens). Consumers wrap in a scroll container.

**Acceptance Criteria:**
- [ ] `HeatMap` is exported from `@kenshinx/ui`.
- [ ] Renders a grid of day cells for the specified date range.
- [ ] Color intensity correctly maps to value quantiles.
- [ ] Month labels and weekday labels are displayed.
- [ ] Tooltip appears on hover/focus showing date and value.
- [ ] Cells with no data render with the empty color.
- [ ] `colorScale` prop allows overriding default colors.
- [ ] Renders correctly in light and dark mode.
- [ ] All cells are keyboard-focusable for accessibility.
- [ ] Storybook stories render without errors.
- [ ] Component is demonstrated in the playground app.
- [ ] `bun run build` passes with no errors.
- [ ] `bun run lint` passes with no errors.

**Estimated Complexity:** High

---

## Issue 4 — Streak

**Title:** feat: add Streak component

**Description:**
Create a compact streak display widget for `@kenshinx/ui`. This renders a streak count alongside a visual indicator (e.g., a flame/fire icon). It is used in Questo to show the user's current consecutive completion streak for recurring quests.

This is a **custom component**. It should accept a numeric count and render it with an icon and optional label in a compact, inline layout.

**Objective:**
Provide a reusable, visually engaging streak indicator widget that any gamification-oriented app can use.

**Scope:**
- Create `packages/ui/src/components/streak.tsx`.
- Accept props: `count` (number), `label` (optional string, e.g., "day streak"), `icon` (optional React node, defaults to a flame icon from `lucide-react`).
- Use CVA variants for visual intensity: `inactive` (count = 0, muted), `active` (count > 0, vibrant), `hot` (count ≥ configurable threshold, extra emphasis via animation/color).
- Use CVA `size` variant: `sm`, `default`, `lg`.
- Use CSS variable tokens for colors — no hardcoded values.
- Support `className` and forward ref.
- Export from `packages/ui/src/index.ts`.
- Create Storybook story with: Default, Inactive, Active, Hot, Sizes, and CustomIcon stories.
- Add an example of the component to the playground app (`apps/playground`).
- Verify build, lint, and Storybook rendering.

**Out of Scope:**
- Streak history or graph (that's the HeatMap).
- Animation of the count incrementing (can be a follow-up).
- Streak freeze / rest-day logic (business logic, not a UI concern).

**Acceptance Criteria:**
- [ ] `Streak` is exported from `@kenshinx/ui`.
- [ ] Renders the count prominently alongside an icon (flame by default).
- [ ] `inactive` variant is visually muted when count is 0.
- [ ] `active` and `hot` variants are visually distinct and vibrant.
- [ ] `size` variants (`sm`, `default`, `lg`) properly scale icon and text.
- [ ] Custom icon can be passed via the `icon` prop.
- [ ] Renders correctly in light and dark mode.
- [ ] Storybook stories render without errors.
- [ ] Component is demonstrated in the playground app.
- [ ] `bun run build` passes with no errors.
- [ ] `bun run lint` passes with no errors.

**Estimated Complexity:** Low

---

## Issue 5 — EmptyState

**Title:** feat: add EmptyState component

**Description:**
Create a composable empty state placeholder component for `@kenshinx/ui`. This is displayed when a list, page section, or container has no content to show (e.g., "No quests today", "No chapters yet"). It renders an optional illustration/icon, a title, a description, and an optional action button.

The component should follow a **compound component** pattern for maximum flexibility (similar to `Card` with `CardHeader`, `CardTitle`, etc.).

**Objective:**
Provide a reusable, composable empty state component that any app can use to fill blank areas with helpful context and calls to action.

**Scope:**
- Create `packages/ui/src/components/empty-state.tsx` with compound components: `EmptyState`, `EmptyStateIcon`, `EmptyStateTitle`, `EmptyStateDescription`, `EmptyStateAction`.
- `EmptyStateIcon` accepts any React node (Lucide icon, SVG, or illustration).
- `EmptyStateAction` wraps children (typically a `Button`).
- The container centers content vertically and horizontally with generous padding.
- Use CVA variants for `size`: `sm` (compact, inline), `default` (standard), `lg` (full-page).
- Use CSS variable tokens for colors — no hardcoded values.
- Support `className` on all sub-components and forward refs.
- Export from `packages/ui/src/index.ts`.
- Create Storybook story with: Default, WithAction, IconOnly, Compact, FullPage, and CustomIllustration stories.
- Add an example of the component to the playground app (`apps/playground`).
- Verify build, lint, and Storybook rendering.

**Out of Scope:**
- Built-in illustrations or SVG assets. Consumers provide their own icon/illustration.
- Error state variant (e.g., "Something went wrong"). That's a different pattern — consider a separate `ErrorState` if needed.
- Skeleton/loading state (already exists as `Skeleton` component).

**Acceptance Criteria:**
- [ ] `EmptyState`, `EmptyStateIcon`, `EmptyStateTitle`, `EmptyStateDescription`, and `EmptyStateAction` are exported from `@kenshinx/ui`.
- [ ] Content is visually centered within its container.
- [ ] `size` variants properly scale padding, icon size, and typography.
- [ ] Works standalone (just a title) or fully composed (icon + title + description + action).
- [ ] Renders correctly in light and dark mode.
- [ ] Storybook stories render without errors.
- [ ] Component is demonstrated in the playground app.
- [ ] `bun run build` passes with no errors.
- [ ] `bun run lint` passes with no errors.

**Estimated Complexity:** Low

---

## Summary

| # | Component | Complexity | Dependencies |
|---|-----------|-----------|--------------|
| 1 | BottomNav | Medium | None (pure CSS + React) |
| 2 | ProgressBar | Low | `@radix-ui/react-progress` |
| 3 | HeatMap | High | None (custom, pure CSS + React) |
| 4 | Streak | Low | `lucide-react` (already a peer dep) |
| 5 | EmptyState | Low | None (pure CSS + React) |

> **Suggested implementation order:** ProgressBar → EmptyState → Streak → BottomNav → HeatMap
> (Start with low-complexity, zero-dependency components to build momentum; save HeatMap for last as it requires the most design work.)
