import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "src",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "node_modules",
        replacement: fileURLToPath(new URL("./node_modules", import.meta.url)),
      },
    ],
  },
  server: {
    proxy: {
      "/options/for/select": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/selected/option": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
