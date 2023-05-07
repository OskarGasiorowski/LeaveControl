import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
      react(),
    ],
    resolve: {
        alias: [
            { find: '#illustrations', replacement: path.resolve(__dirname, './src/assets/illustrations') },
            { find: '#api', replacement: path.resolve(__dirname, './src/api') },
            { find: '#hooks', replacement: path.resolve(__dirname, './src/hooks') }
        ],
    },
    server: {
        watch: {
          usePolling: true,
        },
    },
})
