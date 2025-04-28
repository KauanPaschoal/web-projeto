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
        rewrite: (path) => path.replace(/^\/usuarios/, "/usuarios"),
      },
      "/usuarios/login": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) =>
          path.replace(/^\/usuarios\/login/, "/usuarios/login"),
      },
      "/planos": {
        target: "http://localhost:8080/", // Backend para /planos
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/planos/, "/planos"),
      },
      "/psicologos": {
        target: "http://localhost:8080/", // Backend para /psicologos
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/psicologos/, "/psicologos"),
      },
    },
  },
});
