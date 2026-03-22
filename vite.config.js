import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Jay Joshi",
        short_name: "Jay Joshi",
        description: "Jay Joshi — Frontend Developer & Designer.",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10000000,
        globPatterns: ["**/*.{js,css,html,ico,png,webp,svg,woff2}"],
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 5173,
    open: true,
  },

  build: {
    minify: 'esbuild',
    cssMinify: true,
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-three": ["three"],
          "vendor-framer": ["framer-motion"],
          "vendor-lucide": ["lucide-react"],
        },
      },
    },
  },
});