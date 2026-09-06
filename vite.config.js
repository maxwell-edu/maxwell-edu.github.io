import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The GitHub Actions workflow (.github/workflows/deploy.yml) sets
// VITE_BASE_PATH automatically based on your repo name, so you don't
// need to edit this file for GitHub Pages. Running `npm run dev` or
// `npm run build` locally just falls back to "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",
});
