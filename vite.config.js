import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Bind to 0.0.0.0 so dev-container port forwarding (which targets IPv4) can reach it
    host: true,
  },
});
