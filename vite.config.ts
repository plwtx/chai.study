import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // Changed to SWC as per your request
import tailwindcss from "@tailwindcss/vite";
import dns from "node:dns";
import path from "path";
import { fileURLToPath } from "url";

dns.setDefaultResultOrder("verbatim");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3333,
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
