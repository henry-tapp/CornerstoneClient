import { resolve } from "path";
import { defineConfig } from "vitest/config"; // Instead of from 'vite' to allow the extra properties
import envCompatible from "vite-plugin-env-compatible";
import requireTransform from "vite-plugin-require-transform";
import tsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from 'vite-plugin-svgr';

import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 3000,
  },
  envPrefix: "REACT_APP_",
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "home/index.html")
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react({
      include: "**/*.tsx"
    }),
    envCompatible(),
    tsconfigPaths(),
    requireTransform({}),
    svgrPlugin()
  ],
  optimizeDeps: {
    exclude: ['use-elapsed-time']
  }
});
