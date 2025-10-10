import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import packageJson from "./package.json"
// const deps = packageJson.dependencies as Record<string, string>;

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "listing",
      filename: "remoteEntry.js",
      exposes: {
        "./Listing": "./src/components/ListingPage.tsx",
      },
      shared: {
        react: {
          requiredVersion: packageJson.dependencies.react,
        },
          "react-dom": {
          requiredVersion: packageJson.dependencies["react-dom"],
        },
        "react-router-dom": {
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 5003,
    strictPort: true,
    cors: true,
  },
});
