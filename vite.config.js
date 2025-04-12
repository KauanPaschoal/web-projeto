import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/planos": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/planos/, "/planos"),
      },
      "/auth": {
        target: "http://localhost:8080", // Backend para /auth
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/, "/auth"), // Mantém o prefixo /auth
      },
    },
  },
});
