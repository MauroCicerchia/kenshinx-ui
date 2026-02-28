# Implementation Plan — Issue 3: HeatMap Component

# 1. Understanding

- Create a **custom `HeatMap` component** that renders a GitHub-style contribution/activity grid. Each cell represents a day; color intensity maps to a value's quantile bucket (5 levels). The grid shows ~365 cells (trailing 12 months) organized by week (columns) and day-of-week (rows), with month labels on top and weekday labels on the left.
- The component must support a tooltip on hover/focus (reusing the existing `Tooltip` from `@radix-ui/react-tooltip` already vendored in the repo), keyboard focusability for accessibility, and CSS variable–based color customization (`--heatmap-0` through `--heatmap-4`) with sensible defaults derived from `--primary`.
- Ship Storybook stories, a playground demo, and pass `bun run build` + `bun run lint`.

**Key assumptions:**
- No new npm dependencies are needed. The tooltip implementation reuses the existing `Tooltip` / `TooltipProvider` / `TooltipTrigger` / `TooltipContent` components already exported from `@kenshinx/ui` (wrapping `@radix-ui/react-tooltip`).
- Date calculations (generating the grid, computing month labels) will be done with native `Date` APIs — no `date-fns` or similar library required for this scope.
- The `data` array entries use ISO date strings (`YYYY-MM-DD`). No timezone normalization is applied — dates are treated as local.

---

# 2. Proposed Approach

1. **Add CSS variable tokens for the heat map color scale** in `packages/ui/src/styles/tokens.css`.
   - Add `--heatmap-0` through `--heatmap-4` in both `:root` and `.dark` blocks.
   - `--heatmap-0` is the empty/level-0 color (e.g., `--muted`-derived), `--heatmap-4` is the max intensity (e.g., `--primary`-derived).
   - This follows the repo's theming contract: consumers can override these variables to apply custom palettes.

2. **Create the component file** `packages/ui/src/components/heat-map.tsx`.
   - **Props interface — `HeatMapProps`**:
     - `data: Array<{ date: string; value: number }>` — required.
     - `startDate?: string` — ISO date, defaults to 12 months ago (from today or `endDate`).
     - `endDate?: string` — ISO date, defaults to today.
     - `colorScale?: [string, string, string, string, string]` — optional 5-color override (inline CSS values, e.g., hex/hsl). When provided, these override the CSS variable–based scale.
     - `emptyColor?: string` — optional override for the "no data" cell color.
     - `className?: string` — merged via `cn()`.
   - Extends `React.HTMLAttributes<HTMLDivElement>` and forwards `ref`.
   - **Internal logic**:
     - Build a `Map<string, number>` from `data` for O(1) lookup.
     - Generate the date range from `startDate` to `endDate`, padding so the first column starts on Sunday and the last column ends on Saturday.
     - Compute quantile thresholds: collect all non-zero values, compute 25th/50th/75th percentiles (or simple quartiles based on max), producing 5 buckets: 0 (no data / zero), levels 1–4.
     - Render a CSS Grid with `grid-template-rows: repeat(7, 1fr)` and `grid-auto-flow: column` so days flow downward and then across weeks (columns = weeks, rows = Mon–Sun). Each cell is a small square (`<div>` or `<button>`) with `tabIndex={0}` for keyboard accessibility and the appropriate background color class/style.
   - **Month labels**: Rendered above the grid. Walk through the weeks, and at each week where the month changes, place a label spanning the appropriate columns.
   - **Weekday labels**: Rendered to the left of the grid (Mon, Wed, Fri — typically GitHub shows 3 labels to avoid clutter).
   - **Tooltips**: Each cell is wrapped with `Tooltip` / `TooltipTrigger` / `TooltipContent` (from the existing vendored component). The tooltip shows a formatted date and the value (e.g., "Jan 15, 2026 — 5 quests"). The entire grid is wrapped in a `TooltipProvider` with a short `delayDuration` for fast hover response.
   - **Color application**: Use inline `style` referencing CSS variables by default (`var(--heatmap-0)` through `var(--heatmap-4)`). If `colorScale` is provided, use the inline values directly. If `emptyColor` is provided, override the level-0 color.
   - **Styling**: Use Tailwind utility classes for layout (`grid`, `gap`, `text-xs`, etc.) and CSS variables for cell colors. This keeps the component theme-agnostic.

3. **Export from index** — add `HeatMap` and `HeatMapProps` to `packages/ui/src/index.ts`.

4. **Create Storybook stories** `apps/storybook/src/stories/HeatMap.stories.tsx` with stories:
   - `Default` — random data for the trailing 12 months.
   - `Empty` — no data entries.
   - `SingleMonth` — `startDate`/`endDate` scoped to one month.
   - `FullYear` — explicit `startDate`/`endDate` spanning exactly Jan 1 – Dec 31.
   - `CustomColors` — `colorScale` override with a green GitHub-style palette.

5. **Add playground demo** — append a HeatMap demo section to `apps/playground/src/App.tsx` following the existing pattern (import → Card-wrapped demo with random data).

6. **Verify** — run `bun run build` and `bun run lint`.

**Why this approach fits:**
- Matches the repo's custom component pattern (`streak.tsx`, `empty-state.tsx`) — `forwardRef`, `cn()`, `displayName`, token-based colors.
- Reuses the existing `Tooltip` components instead of adding a dependency.
- CSS variable tokens for the color scale follow the theming contract (§6 of `ai-agent-context.md`).
- No new runtime dependencies.

---

# 3. Files to Change

### Modified files

| File | Reason |
|------|--------|
| [`tokens.css`](file:///Users/maurocicerchia/kenshinx/ui/packages/ui/src/styles/tokens.css) | Add `--heatmap-0` through `--heatmap-4` CSS variable tokens in `:root` and `.dark` |
| [`index.ts`](file:///Users/maurocicerchia/kenshinx/ui/packages/ui/src/index.ts) | Export `HeatMap` component and `HeatMapProps` type |
| [`App.tsx`](file:///Users/maurocicerchia/kenshinx/ui/apps/playground/src/App.tsx) | Add HeatMap playground demo section (import + JSX block) |

### New files

| File | Reason |
|------|--------|
| [`heat-map.tsx`](file:///Users/maurocicerchia/kenshinx/ui/packages/ui/src/components/heat-map.tsx) | Component implementation |
| [`HeatMap.stories.tsx`](file:///Users/maurocicerchia/kenshinx/ui/apps/storybook/src/stories/HeatMap.stories.tsx) | Storybook stories (5 stories) |

---

# 4. API / Data / UI Impact

### Component API

```tsx
interface HeatMapEntry {
  date: string;   // ISO date string "YYYY-MM-DD"
  value: number;  // Non-negative integer
}

interface HeatMapProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of date-value entries */
  data: HeatMapEntry[];
  /** Start of the date range (defaults to 12 months before endDate) */
  startDate?: string;
  /** End of the date range (defaults to today) */
  endDate?: string;
  /** Override the 5-level color scale [level0, level1, level2, level3, level4] */
  colorScale?: [string, string, string, string, string];
  /** Override the color for cells with no data */
  emptyColor?: string;
}
```

**Usage example:**

```tsx
<HeatMap
  data={[
    { date: "2026-01-15", value: 3 },
    { date: "2026-01-16", value: 7 },
  ]}
  className="my-4"
/>
```

- **Endpoints / contracts**: none.
- **Data model**: none.
- **UI routes**: none (playground is an existing page).

### CSS Variable Tokens (added to `tokens.css`)

| Variable | Light mode (`:root`) | Dark mode (`.dark`) |
|----------|---------------------|---------------------|
| `--heatmap-0` | Near-background muted | Near-background dark muted |
| `--heatmap-1` | Light primary tint | Light primary tint (dark) |
| `--heatmap-2` | Medium primary | Medium primary (dark) |
| `--heatmap-3` | Stronger primary | Stronger primary (dark) |
| `--heatmap-4` | Full primary intensity | Full primary intensity (dark) |

---

# 5. Testing Plan

### Build & Lint (automated)

```bash
# From repo root
bun run build    # Ensures the component compiles and bundles correctly
bun run lint     # Ensures no linting errors
```

### Storybook Visual Verification

```bash
cd apps/storybook
bun run storybook
```

- Navigate to **Components → HeatMap** in the sidebar.
- Verify all 5 stories render without errors: **Default**, **Empty**, **SingleMonth**, **FullYear**, **CustomColors**.
- In **Default**: confirm ~52 columns of cells, month labels along top, weekday labels on left. Hover over cells to verify tooltip shows date + value.
- In **Empty**: confirm all cells render with the empty color (no crashes).
- In **SingleMonth**: confirm the grid is appropriately narrow (4–5 columns).
- In **FullYear**: confirm 52+ columns spanning Jan–Dec.
- In **CustomColors**: confirm cells use the overridden color palette (green shades).
- Toggle dark mode and confirm colors adapt via CSS variables.

### Playground Smoke Test

```bash
cd apps/playground
bun run dev
```

- Scroll to the HeatMap demo section.
- Confirm the heat map renders with random data.
- Hover over cells and verify tooltips appear.
- Toggle light/dark mode using the existing theme switch.
- Tab through cells with keyboard and confirm focus is visible.

> **Note:** No unit tests are planned for this component, consistent with the repo's current testing strategy (see `ai-agent-context.md` §8: "Start minimal"). The component is primarily presentational. Date logic is straightforward and best verified visually.

---

# 6. Acceptance Criteria Mapping

| Criterion | How it will be satisfied |
|-----------|------------------------|
| `HeatMap` is exported from `@kenshinx/ui` | Added to `packages/ui/src/index.ts` |
| Renders a grid of day cells for the specified date range | Date range generation logic fills cells from `startDate` to `endDate`; CSS Grid layout with columns = weeks, rows = days |
| Color intensity correctly maps to value quantiles | Quantile bucketing (0, 1–25%, 26–50%, 51–75%, 76–100% of max) assigns each cell to level 0–4 |
| Month labels and weekday labels are displayed | Month labels rendered above the grid at week boundaries; weekday labels (Mon, Wed, Fri) rendered left of the grid |
| Tooltip appears on hover/focus showing date and value | Each cell wrapped with existing `Tooltip` / `TooltipTrigger` / `TooltipContent` components; shows formatted date + value |
| Cells with no data render with the empty color | Cells with value 0 or not in `data` use `--heatmap-0` (or `emptyColor` override) |
| `colorScale` prop allows overriding default colors | When provided, inline styles use the given color values instead of CSS variable references |
| Renders correctly in light and dark mode | All colors reference CSS variable tokens with both `:root` and `.dark` definitions |
| All cells are keyboard-focusable for accessibility | Each cell has `tabIndex={0}` and `role="gridcell"`, with visible `:focus-visible` outline |
| Storybook stories render without errors | Five stories created and verified |
| Component is demonstrated in the playground app | New section added to `apps/playground/src/App.tsx` |
| `bun run build` passes with no errors | Verified before PR |
| `bun run lint` passes with no errors | Verified before PR |

---

# 7. Risk & Rollback Notes

### Potential pitfalls

- **Performance with many tooltips**: Wrapping ~365 cells each in a `Tooltip` component is the simplest approach. If this causes performance issues (unlikely with Radix's lazy mounting), an alternative is a single tooltip positioned by pointer coordinates. Start with the straightforward per-cell approach first.
- **Grid alignment with month labels**: Month labels need to align above the correct week columns. The implementation must carefully calculate column offsets where the month boundary falls. Off-by-one errors here are the most likely bug.
- **Date edge cases**: Leap years, varying month lengths, and the first/last partial weeks of the range need careful handling during grid generation.
- **Playground file size**: `App.tsx` is already ~1,634 lines. Adding another section is consistent with the existing pattern but increases the file further.

### Rollback

- Revert is a single commit: remove `heat-map.tsx`, the story file, the tokens additions, the index export lines, and the playground section. No migrations or external service changes.

---

# 8. Ready-to-Execute Checklist

- [x] Issue requirements are clear — no open questions
- [x] Existing custom component pattern studied (`streak.tsx`, `empty-state.tsx`)
- [x] Existing `Tooltip` component studied for reuse in cell tooltips
- [x] CSS variable token convention studied (`tokens.css`)
- [x] Storybook story convention studied (`Streak.stories.tsx`)
- [x] Playground demo convention studied (`App.tsx`)
- [x] Index export convention studied (`index.ts`)
- [x] No new dependencies required
- [x] Quantile bucketing logic designed (5-level scale matching GitHub's approach)
