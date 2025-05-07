import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Text tools",
        short_name: "Text tools",
        description: "Text tools",
        theme_color: "#18181b",
        background_color: "#ffffff",
        display: "standalone",
        lang: "en",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/icon-1024x1024.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  worker: {
    format: "es",
  },
});
