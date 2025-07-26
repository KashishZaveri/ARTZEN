import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
        
          target: "https://artzen-backend.onrender.com",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    optimizeDeps: {
      include: ["bootstrap/js/dist/toast"],
    },
  };
});