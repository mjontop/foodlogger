import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "./src/common/logo.svg", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Food Logger",
    short_name: "Food Logger",
    description: "An app that can be used to keep records of your daily food logs",
    icons: [
      {
        src: "./src/common/logo.svg",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    theme_color: "#171717",
    background_color: "#e8ebf2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
