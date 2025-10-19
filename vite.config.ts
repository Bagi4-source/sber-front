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
        find: "openapi-generated",
        replacement: fileURLToPath(
          new URL("./openapi-generated", import.meta.url),
        ),
      },
      {
        find: "node_modules",
        replacement: fileURLToPath(new URL("./node_modules", import.meta.url)),
      },
    ],
  },
});
