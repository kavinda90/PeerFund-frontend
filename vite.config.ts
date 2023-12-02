import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
/// <reference types="vitest" />
export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: 'localhost',
      port: Number(env.VITE_APP_PORT)
    },
    build: {
      chunkSizeWarningLimit: 3000,
    },
    test:{
      globals:true,
      environment: 'happy-dom',
    }
  }
  
});
