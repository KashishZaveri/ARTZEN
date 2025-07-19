export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['artzen.onrender.com'],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    include: ["bootstrap/js/dist/toast"],
  },
});