import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' 
    ? '/Resource-Repository-for-Design-Systems/' 
    : '/',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    // Plugin to resolve figma:asset imports
    {
      name: 'figma-asset-resolver',
      resolveId(source) {
        if (source.startsWith('figma:asset/')) {
          const assetName = source.replace('figma:asset/', '');
          return {
            id: path.resolve(__dirname, './src/assets', assetName),
            external: false,
          };
        }
        return null;
      },
    },
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
