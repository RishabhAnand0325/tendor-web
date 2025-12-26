import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3001,
    middlewareMode: false,
    allowedHosts: [".ngrok-free.app", ".lhr.life", "ceigall.roadvision.ai"],
    proxy: {
      "/api": {
        // FIX 1 & 2: Change localhost:5001 to 127.0.0.1:8000
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        // FIX 3: Remove the rewrite if your frontend already sends '/api/v1'
        // If your frontend code writes axios.post('/api/auth...'), KEEP this.
        // If your frontend code writes axios.post('/api/v1/auth...'), DELETE this line.
        // Based on your error log, I recommend DELETING the rewrite line below:
        // rewrite: (path) => path.replace(/^\/api/, "/api/v1"), 
      },
      "/docs": {
        target: "http://127.0.0.1:8000", // Update this port too
        changeOrigin: true,
      },
      "/pgadmin": {
        target: "http://127.0.0.1:5050", // Keep this if pgadmin is actually on 5050
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pgadmin/, ""),
      }
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
