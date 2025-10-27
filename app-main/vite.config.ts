import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import packageJson from "./package.json";
// const deps = packageJson.dependencies as Record<string, string>;

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host_app",
      remotes: {
        remote_login: "http://localhost:5002/assets/remoteEntry.js",
        remote_listing: "http://localhost:5003/assets/remoteEntry.js",
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
});