import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/pacientes": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/planos/, "/planos"),
      },
      "/pacientes/login": {
        target: "http://localhost:8080/", // Backend para /usuarios/login
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/pacientes\/login/, "/pacientes/login"), // Mantém o prefixo /usuarios/login
      },
      "/sessoes": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/sessoes/, "/sessoes"),
      },
    },
  },
});