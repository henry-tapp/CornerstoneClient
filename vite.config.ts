// import { polyfillNode } from "esbuild-plugin-polyfill-node";
import { resolve } from "path";
import { defineConfig } from "vitest/config"; // Instead of from 'vite' to allow the extra properties
import envCompatible from "vite-plugin-env-compatible";
import requireTransform from "vite-plugin-require-transform";
import tsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from 'vite-plugin-svgr';

import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    watch: {
      // https://vitejs.dev/config/server-options.html#server-watch
      // This has BAD performance but is the only way to HMR with WSL2 / DevContainers
      usePolling: true
    },
    port: 3000,
  },
  envPrefix: "REACT_APP_",
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "home/index.html"),
        schedule: resolve(__dirname, "schedule/index.html")
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        // polyfillNode({
        // })
      ],
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
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
});
