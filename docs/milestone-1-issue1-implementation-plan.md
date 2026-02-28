# Milestone 1 — Issue 1: BottomNav Component — Implementation Plan

## 1. Understanding

- **Create a mobile bottom navigation bar** (`BottomNav`) as a reusable, accessible compound component for `@kenshinx/ui`, following the same patterns used by `EmptyState` and `Tabs`.
- The component must be **generic** (no hardcoded routes, no routing integration) — consumers pass items, an active indicator, and handle navigation logic externally.
- Deliverables: component file, barrel exports, Storybook stories, playground demo, passing build & lint.

**Key Assumptions:**
- No new npm dependencies are needed — the component is pure React + CVA + `cn()` (already available).
- Keyboard navigation (arrow keys, Enter/Space) will be implemented manually via `onKeyDown` handlers (no Radix primitive exists for bottom nav).
- The `"use client"` directive will be included at the top of the file to match existing patterns (e.g., `tabs.tsx`).

---

## 2. Proposed Approach

1. **Create `packages/ui/src/components/bottom-nav.tsx`** using the compound component pattern matching `EmptyState`:
   - `BottomNav` — outer `<nav>` container with `role="navigation"`, fixed to bottom, flex layout distributing children evenly.
   - `BottomNavItem` — individual nav item (button element), receives `isActive` and `disabled` props, applies CVA variants. Manages `aria-current="page"` when active. Renders `children` (typically an icon + label pairing).
   - `BottomNavIcon` — simple wrapper `<span>` for the icon slot (applies size-consistent Tailwind classes via a CSS class hook, similar to `empty-state-icon`).
   - `BottomNavLabel` — simple wrapper `<span>` for the label text (applies font sizing classes).
   - All sub-components: forward refs, accept `className` override, use `cn()`.

2. **Define CVA variants** on `BottomNavItem`:
   - `state`: `active` (text-primary, icon tinted), `inactive` (text-muted-foreground), `disabled` (opacity-50, pointer-events-none).
   - No `size` variant — bottom navs have a standard height; item count (2–6) is handled by flex distribution.

3. **Implement keyboard navigation** inside `BottomNav`:
   - Use `onKeyDown` on the container to handle `ArrowLeft`/`ArrowRight` movement between focusable children, wrapping at edges.
   - `Enter`/`Space` on a focused item fires its `onClick`.

4. **Export** from `packages/ui/src/index.ts`.

5. **Create Storybook stories** in `apps/storybook/src/stories/BottomNav.stories.tsx`:
   - `Default` — 4 items (Today, Quests, Chapters, Profile) with lucide icons, one active.
   - `WithBadge` — demonstrates a notification dot composed by the consumer (a positioned `<span>` relative to the icon).
   - `ActiveStates` — renders multiple BottomNavs showing each state variant (active, inactive, disabled).
   - `CustomIcons` — uses non-lucide custom SVG icons.

6. **Add playground demo** in `apps/playground/src/App.tsx` — a new Card section wrapping a `BottomNav` example with interactive state toggling.

7. **Verify** `bun run build` and `bun run lint` pass with no errors.

**Why this approach fits:**
- Mirrors the compound component pattern used by `EmptyState` (custom sub-components, CVA variants, `cn()`, forwarded refs, CSS-class-hook-based sizing).
- Does not wrap a Radix primitive (none exists for bottom nav), but follows the same structural conventions as `Tabs` for familiarity.
- Zero new dependencies keeps the PR minimal.

---

## 3. Files to Change

### Modified files

| File | Reason |
|------|--------|
| [`index.ts`](file:///Users/maurocicerchia/kenshinx/ui/packages/ui/src/index.ts) | Add exports for `BottomNav`, `BottomNavItem`, `BottomNavIcon`, `BottomNavLabel`, `bottomNavItemVariants`, and `BottomNavItemProps` |
| [`App.tsx`](file:///Users/maurocicerchia/kenshinx/ui/apps/playground/src/App.tsx) | Add a new Card section demonstrating the BottomNav component |

### New files

| File | Reason |
|------|--------|
| [`bottom-nav.tsx`](file:///Users/maurocicerchia/kenshinx/ui/packages/ui/src/components/bottom-nav.tsx) | The new component file with `BottomNav`, `BottomNavItem`, `BottomNavIcon`, `BottomNavLabel` |
| [`BottomNav.stories.tsx`](file:///Users/maurocicerchia/kenshinx/ui/apps/storybook/src/stories/BottomNav.stories.tsx) | Storybook stories: Default, WithBadge, ActiveStates, CustomIcons |

---

## 4. API / Data / UI Impact

### Component API

```tsx
// BottomNav — outer container
<BottomNav className="...">
  <BottomNavItem isActive onClick={...}>
    <BottomNavIcon><Home /></BottomNavIcon>
    <BottomNavLabel>Today</BottomNavLabel>
  </BottomNavItem>
  <BottomNavItem onClick={...}>
    <BottomNavIcon><Compass /></BottomNavIcon>
    <BottomNavLabel>Quests</BottomNavLabel>
  </BottomNavItem>
  {/* ... more items ... */}
</BottomNav>
```

**Props:**

| Component | Prop | Type | Default | Notes |
|-----------|------|------|---------|-------|
| `BottomNav` | `className` | `string` | — | Merges with base classes |
| `BottomNav` | `children` | `ReactNode` | — | `BottomNavItem` children |
| `BottomNavItem` | `isActive` | `boolean` | `false` | Drives active variant & `aria-current` |
| `BottomNavItem` | `disabled` | `boolean` | `false` | Drives disabled variant |
| `BottomNavItem` | `className` | `string` | — | Merges with variant classes |
| `BottomNavItem` | `onClick` | `() => void` | — | Consumer navigation handler |
| `BottomNavIcon` | `className` | `string` | — | Merges with icon size classes |
| `BottomNavLabel` | `className` | `string` | — | Merges with label size classes |

### Exports added to `@kenshinx/ui`
- `BottomNav`
- `BottomNavItem`
- `BottomNavIcon`
- `BottomNavLabel`
- `bottomNavItemVariants` (CVA instance)
- `BottomNavItemProps` (type)

### No data model or endpoint changes.

---

## 5. Testing Plan

> **Note:** The repo currently has no unit/component test runner configured (`"test": "echo \"No tests yet\" && exit 0"` in `packages/ui/package.json`). Verification relies on build, lint, and visual confirmation in Storybook.

### Automated Checks

| Check | Command | Where to run |
|-------|---------|-------------|
| Build | `bun run build` | Repo root (`/Users/maurocicerchia/kenshinx/ui`) |
| Lint | `bun run lint` | Repo root |

### Visual Verification (Storybook)

1. Run `bun run dev:storybook` from repo root.
2. Navigate to **Components → BottomNav** in the sidebar.
3. Verify each story renders without errors:
   - **Default** — 4 items, one active (visually distinct primary color).
   - **WithBadge** — notification dot visible on one item.
   - **ActiveStates** — each variant state (active/inactive/disabled) is visually distinguishable.
   - **CustomIcons** — custom SVGs render correctly in the icon slot.
4. Toggle light/dark mode — verify both render correctly.
5. Tab/arrow-key through items to confirm keyboard navigation works.

### Visual Verification (Playground)

1. Run `bun run dev:playground` from repo root.
2. Scroll to the BottomNav demo card.
3. Click items to confirm active state changes.
4. Verify light/dark mode toggle doesn't break the component.

---

## 6. Acceptance Criteria Mapping

| # | Criterion | How satisfied |
|---|-----------|---------------|
| 1 | `BottomNav` and `BottomNavItem` exported from `@kenshinx/ui` | Added to `index.ts` barrel; `bun run build` confirms they're in the compiled output |
| 2 | Active state visually distinct (tinted icon + label using `--primary`) | CVA `active` variant applies `text-primary` to the item; `inactive` uses `text-muted-foreground` |
| 3 | Supports 2–6 items without layout breakage | Container uses `flex` with `flex-1` on each item; Storybook stories demonstrate 2, 4, and 6 items |
| 4 | ARIA roles (`role="navigation"`, `aria-current`) | `BottomNav` renders `<nav role="navigation">`, `BottomNavItem` sets `aria-current="page"` when `isActive` is true |
| 5 | Keyboard navigable (arrow keys, Enter/Space) | `onKeyDown` handler on the container implements roving tabindex: ArrowLeft/Right moves focus, Enter/Space activates |
| 6 | Light and dark mode | All colors use Tailwind semantic tokens (`text-primary`, `bg-background`, `text-muted-foreground`, `border-border`); Storybook verified in both themes |
| 7 | Storybook stories render without errors | 4 stories created and visually verified via `bun run dev:storybook` |
| 8 | Playground demo | New Card section added to `App.tsx` with interactive BottomNav example |
| 9 | `bun run build` passes | Verified as part of automated checks |
| 10 | `bun run lint` passes | Verified as part of automated checks |

---

## 7. Risk & Rollback Notes

### Potential Pitfalls

- **Keyboard navigation correctness:** Roving tabindex is non-trivial. Edge cases include wrapping at boundaries, handling dynamically disabled items, and focus management when items count changes. Will keep the implementation simple (horizontal arrow-key traversal with wrap) and test manually in Storybook.
- **Fixed positioning in Storybook:** The `fixed bottom-0` positioning may interfere with Storybook's iframe layout. The stories will use relative positioning (via `className` override or a decorative container) for display, with a note that the component is `fixed` by default.
- **Playground layout:** Adding a fixed-position component to the playground may obscure bottom content. The demo will render the BottomNav inside a bounded container with `relative` positioning and explicit height to avoid layout issues.

### How to Revert

All changes are additive:
- Delete `packages/ui/src/components/bottom-nav.tsx`
- Remove the export block from `packages/ui/src/index.ts`
- Delete `apps/storybook/src/stories/BottomNav.stories.tsx`
- Remove the BottomNav demo section from `apps/playground/src/App.tsx`
- Run `bun run build` to confirm clean state

---

## 8. Ready-to-Execute Checklist

- [x] Issue requirements fully understood and documented
- [x] Existing compound component patterns studied (`EmptyState`, `Tabs`)
- [x] No new dependencies required confirmed
- [x] Barrel export pattern in `index.ts` understood
- [x] Storybook story conventions understood (from `Streak.stories.tsx`)
- [x] Playground `App.tsx` structure understood (Card-based demo sections)
- [x] Build/lint commands identified (`bun run build`, `bun run lint` at repo root)
- [ ] Plan reviewed and approved by the user
