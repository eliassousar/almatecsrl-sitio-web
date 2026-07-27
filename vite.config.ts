
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mcpPlugin(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimizaciones de build
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-checkbox'],
          routing: ['react-router-dom'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
    // Usar esbuild para minificación (más rápido y incluido por defecto)
    minify: mode === 'production' ? 'esbuild' : false,
    // Configurar el límite de tamaño de chunk
    chunkSizeWarningLimit: 1000,
  },
  // Eliminar console.* en producción de forma segura vía esbuild
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  // Optimizaciones para desarrollo
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
  },
  // Configuración de CSS
  css: {
    devSourcemap: mode === 'development',
  },
}));
