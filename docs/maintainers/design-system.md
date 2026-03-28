# Design System

This document is the source of truth for the `@kenshinx/ui` visual theme.

It defines the semantic tokens shipped by the library, how those tokens map into
Tailwind utilities, and the usage rules that keep the palette consistent across
components.

## Scope

This document covers the theme that is currently implemented in:

- [`packages/ui/src/styles/tokens.css`](../../packages/ui/src/styles/tokens.css)
- [`packages/ui/src/tailwind/preset.ts`](../../packages/ui/src/tailwind/preset.ts)

It does not invent a larger design system than the code already ships. Today,
the themed surface is:

- semantic color tokens
- border radius tokens
- chart and heatmap color ramps
- accordion animation helpers in the Tailwind preset

There is no custom typography scale, spacing scale, or elevation token system in
the preset today. Components currently inherit Tailwind defaults for those areas.

## Design Direction

The current theme is soft, pastel, and rounded.

Key characteristics:

- lavender-tinted background surfaces instead of neutral white
- violet and purple accents as the primary brand signal
- large default radii for a friendly, pill-like interface
- warm dark mode with muted plum surfaces rather than cold gray

## Token Model

All tokens are stored as HSL channel values without the `hsl()` wrapper.

Example:

```css
--primary: 255 93% 76%;
```

The Tailwind preset consumes those values with `hsl(var(--token-name))`.

## Semantic Tokens

### Light Mode

| Token | Value | Purpose |
|-------|-------|---------|
| `--background` | `283 41% 97%` | App/page background |
| `--foreground` | `217 19% 26%` | Default text color |
| `--card` | `0 0% 100%` | Elevated surface background |
| `--card-foreground` | `217 19% 26%` | Text on cards |
| `--popover` | `0 0% 100%` | Floating surface background |
| `--popover-foreground` | `217 19% 26%` | Text on popovers |
| `--primary` | `255 93% 76%` | Primary action and strongest brand color |
| `--primary-foreground` | `0 0% 100%` | Text on primary surfaces |
| `--secondary` | `300 100% 98%` | Soft secondary surfaces |
| `--secondary-foreground` | `216 15% 35%` | Text on secondary surfaces |
| `--muted` | `269 100% 96%` | Low-emphasis backgrounds |
| `--muted-foreground` | `220 8% 46%` | Secondary text |
| `--accent` | `293 53% 93%` | Decorative highlight surface |
| `--accent-foreground` | `217 19% 26%` | Text on accent surfaces |
| `--destructive` | `0 91% 82%` | Error and destructive actions |
| `--destructive-foreground` | `0 0% 100%` | Text on destructive surfaces |
| `--border` | `267 85% 92%` | Borders and dividers |
| `--input` | `267 85% 92%` | Input chrome |
| `--ring` | `255 93% 76%` | Focus rings |

### Dark Mode

| Token | Value | Purpose |
|-------|-------|---------|
| `--background` | `23 15% 10%` | App/page background |
| `--foreground` | `227 88% 94%` | Default text color |
| `--card` | `270 18% 18%` | Elevated surface background |
| `--card-foreground` | `227 88% 94%` | Text on cards |
| `--popover` | `270 18% 18%` | Floating surface background |
| `--popover-foreground` | `227 88% 94%` | Text on popovers |
| `--primary` | `256 100% 83%` | Primary action and strongest brand color |
| `--primary-foreground` | `23 15% 10%` | Text on primary surfaces |
| `--secondary` | `273 18% 24%` | Soft secondary surfaces |
| `--secondary-foreground` | `218 13% 84%` | Text on secondary surfaces |
| `--muted` | `270 18% 24%` | Low-emphasis backgrounds |
| `--muted-foreground` | `218 10% 65%` | Secondary text |
| `--accent` | `267 19% 30%` | Decorative highlight surface |
| `--accent-foreground` | `218 13% 84%` | Text on accent surfaces |
| `--destructive` | `0 91% 82%` | Error and destructive actions |
| `--destructive-foreground` | `0 0% 100%` | Text on destructive surfaces |
| `--border` | `273 18% 24%` | Borders and dividers |
| `--input` | `273 18% 24%` | Input chrome |
| `--ring` | `256 100% 83%` | Focus rings |

## Data Visualization Tokens

### Chart Ramp

| Token | Light | Dark |
|-------|-------|------|
| `--chart-1` | `255 93% 76%` | `256 100% 83%` |
| `--chart-2` | `258 92% 67%` | `255 93% 76%` |
| `--chart-3` | `262 84% 58%` | `258 92% 67%` |
| `--chart-4` | `263 69% 50%` | `262 84% 58%` |
| `--chart-5` | `263 70% 42%` | `263 69% 50%` |

Guideline:

- Use chart tokens only for data visualization and never for general UI chrome.

### Heatmap Ramp

| Token | Light | Dark |
|-------|-------|------|
| `--heatmap-0` | `283 41% 94%` | `270 18% 20%` |
| `--heatmap-1` | `255 93% 86%` | `267 19% 35%` |
| `--heatmap-2` | `255 93% 76%` | `258 92% 67%` |
| `--heatmap-3` | `258 92% 67%` | `255 93% 76%` |
| `--heatmap-4` | `263 69% 50%` | `256 100% 83%` |

Guideline:

- Heatmap tokens are reserved for density or activity visualizations.

## Radius System

The theme uses a single base radius token:

| Token | Value |
|-------|-------|
| `--radius` | `1.5rem` |

The Tailwind preset derives utility sizes from that base:

| Utility | Output |
|---------|--------|
| `rounded-lg` | `var(--radius)` |
| `rounded-md` | `calc(var(--radius) - 2px)` |
| `rounded-sm` | `calc(var(--radius) - 4px)` |

Guideline:

- Default to `rounded-md` or `rounded-lg` to stay aligned with the library look.
- Avoid introducing sharper custom radii unless the component has a strong reason.

## Tailwind Mapping

The preset currently extends Tailwind with:

- semantic colors from the token set
- radius utilities derived from `--radius`
- `accordion-down` and `accordion-up` animations
- the `tailwindcss-animate` plugin

Mapped semantic color keys:

- `background`
- `foreground`
- `card`
- `popover`
- `primary`
- `secondary`
- `muted`
- `accent`
- `destructive`
- `border`
- `input`
- `ring`
- `chart.1` through `chart.5`

## Usage Rules

### Surface Hierarchy

- Use `bg-background` for app backgrounds.
- Use `bg-card` for contained surfaces that should sit above the page.
- Use `bg-popover` for transient overlays like menus, popovers, and dialogs.

### Action Hierarchy

- Use `bg-primary text-primary-foreground` for the main action in a local context.
- Use `bg-secondary text-secondary-foreground` for softer actions and supportive surfaces.
- Use `bg-accent text-accent-foreground` for highlights, selected states, and decorative emphasis.
- Use `bg-destructive text-destructive-foreground` only for dangerous or destructive actions.

### Text Hierarchy

- Use `text-foreground` for primary copy.
- Use `text-muted-foreground` for supportive, less prominent text.
- Avoid introducing arbitrary gray values in components.

### Borders and Inputs

- Use `border-border` for standard separators and surface outlines.
- Use `border-input` for input chrome and field-like controls.
- Use `ring-ring` or focus classes derived from the ring token for focus-visible states.

## Dark Mode Rules

- Dark mode is class-based via `.dark`.
- Dark mode should preserve the same semantic meaning, not merely invert colors.
- Components should continue to rely on semantic tokens instead of mode-specific hardcoded classes.

## Component Authoring Rules

When building or modifying components:

- never hardcode hex, rgb, hsl, or Tailwind palette colors for core UI surfaces
- prefer semantic utilities over direct token consumption in component classes
- reserve chart and heatmap ramps for data display components
- treat `--radius` as the only canonical radius source

## Change Policy

Before changing the theme:

1. Update this document first or in the same change.
2. Update [`packages/ui/src/styles/tokens.css`](../../packages/ui/src/styles/tokens.css).
3. Update [`packages/ui/src/tailwind/preset.ts`](../../packages/ui/src/tailwind/preset.ts) if the token surface changes.
4. Update Storybook foundation docs if consumer guidance needs to change.
5. Visually verify the impact in Storybook across light and dark themes.

The goal is to keep this file aligned with the shipped theme at all times.
