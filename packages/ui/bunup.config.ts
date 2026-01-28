import { defineConfig } from "bunup";

export default defineConfig({
  entry: ["src/index.ts", "src/tailwind/preset.ts"],
  outDir: "dist",
  format: ["esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom", "tailwindcss", "tailwindcss-animate"],
});
