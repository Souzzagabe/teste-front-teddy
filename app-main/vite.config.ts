import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import packageJson from "./package.json";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [
      react(),
      federation({
        name: "host_app",
        remotes: {
          remote_login: isDev
            ? "http://localhost:5002/assets/remoteEntry.js"
            : "https://teste-front-teddy-login.vercel.app/assets/remoteEntry.js",
          remote_listing: isDev
            ? "http://localhost:5003/assets/remoteEntry.js"
            : "https://teste-front-teddy-home.vercel.app/assets/remoteEntry.js",
        },
        shared: {
          react: { requiredVersion: packageJson.dependencies.react },
          "react-dom": { requiredVersion: packageJson.dependencies["react-dom"] },
          "react-router-dom": {
            requiredVersion: packageJson.dependencies["react-router-dom"],
          },
        },
      }),
    ],
    server: {
      port: 5001,
      strictPort: true,
    },
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
  };
});
