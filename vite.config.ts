
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
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
      // Remover console.log en producción
      ...(mode === 'production' && {
        plugins: [
          {
            name: 'remove-console',
            transform(code, id) {
              if (mode === 'production') {
                return {
                  code: code.replace(/console\.log\(.*?\);?/g, ''),
                  map: null
                }
              }
            }
          }
        ]
      })
    },
    // Usar esbuild para minificación (más rápido y incluido por defecto)
    minify: mode === 'production' ? 'esbuild' : false,
    // Configurar el límite de tamaño de chunk
    chunkSizeWarningLimit: 1000,
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
