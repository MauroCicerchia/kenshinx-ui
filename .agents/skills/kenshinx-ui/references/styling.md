# @kenshinx/ui Styling & Theming

The `@kenshinx/ui` library provides a comprehensive design system driven by CSS Variables and a Tailwind CSS preset.

## 1. Import Global Styles

In your application's global CSS (e.g., `app/globals.css` or `src/index.css`), you must import the UI library's base tokens. This provides the CSS variables for colors, radius, and the dark mode `.dark` selector.

```css
@import "@kenshinx/ui/styles.css";

/* Your custom CSS follows */
```

*(Alternatively, ensure your build tool handles `import "@kenshinx/ui/styles.css"` in your top-level layout file).*

## 2. Configure Tailwind CSS

Update your `tailwind.config.ts` (or `tailwind.config.js`) to use the provided preset. This automatically configures your theme to map to the CSS variables exported by the styles above.

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
    // Important: Scan the UI library for classes
    "./node_modules/@kenshinx/ui/dist/**/*.js" 
  ],
  // You can still extend the theme here if needed
} satisfies Config;

export default config;
```

## Available Theme Variables

The preset automatically maps the following semantic colors (accessible via standard tailwind utilities like `bg-primary`, `text-muted-foreground`, `border-border`, etc.):

- **Backgrounds**: `background`, `foreground`, `card`, `popover`
- **Brand Colors**: `primary`, `secondary`, `accent`, `muted`, `destructive`
- **UI Elements**: `border`, `input`, `ring`
- **Data Visualization**: `chart-1` through `chart-5`
- **Border Radius**: Maps `--radius` to `rounded-lg`, `rounded-md`, and `rounded-sm` classes.

You do *not* need to redefine these in your app unless you want to override the default token values.
