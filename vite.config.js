import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/usuarios": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/planos/, "/planos"),
      },
      "/usuarios/login": {
        target: "http://localhost:8080/", // Backend para /usuarios/login
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/usuarios\/login/, "/usuarios/login"), // Mantém o prefixo /usuarios/login
      },
    },
  },
});