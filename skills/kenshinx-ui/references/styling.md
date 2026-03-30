# @kenshinx/ui Styling & Theming

`@kenshinx/ui` uses CSS variables plus a Tailwind preset. To make components render correctly, wire both the stylesheet and the preset.

## 1. Import Global Styles

In your application's global CSS (for example `app/globals.css` or `src/index.css`), import the UI library tokens. This provides the CSS variables for colors, radius, and the `.dark` overrides.

```css
@import "@kenshinx/ui/styles.css";

/* Your custom CSS follows */
```

If your app imports CSS from a layout or entry file instead, `import "@kenshinx/ui/styles.css"` there is also valid.

## 2. Configure Tailwind CSS

Update `tailwind.config.ts` or `tailwind.config.js` to use the preset. This maps the Tailwind theme to the exported CSS variables.

```typescript
import type { Config } from "tailwindcss";
import kenshinPreset from "@kenshinx/ui/tailwind-preset";

const config = {
  presets: [kenshinPreset],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@kenshinx/ui/dist/**/*.js"
  ],
} satisfies Config;

export default config;
```

## 3. Optional Peer Dependencies

Install optional peers only if your chosen components need them:

- `recharts` for chart components
- `react-hook-form` for form primitives
- `@hookform/resolvers` and `zod` for schema-based form validation examples

## 4. Available Theme Variables

The preset maps semantic variables to Tailwind utilities such as `bg-primary`, `text-muted-foreground`, and `border-border`:

- **Backgrounds**: `background`, `foreground`, `card`, `popover`
- **Brand Colors**: `primary`, `secondary`, `accent`, `muted`, `destructive`
- **UI Elements**: `border`, `input`, `ring`
- **Data Visualization**: `chart-1` through `chart-5`, `heatmap-0` through `heatmap-4`
- **Border Radius**: Maps `--radius` to `rounded-lg`, `rounded-md`, and `rounded-sm` classes.

You do not need to redefine these variables unless you want to override the library defaults in your application.
