import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  adapter: node({ mode: "standalone" }),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), mdx()],
  server: {
    host: true, // Permite accesos desde cualquier IP
    port: 4321,
    allowedHosts: [
      "localhost",
      // 'webnuberest.proudgrass-e138b78f.brazilsouth.azurecontainerapps.io'
    ], // Hosts permitidos para evitar bloqueos en producción
    headers: {
      "Access-Control-Allow-Origin": "*", // Evita problemas de CORS
    },
  },
});
