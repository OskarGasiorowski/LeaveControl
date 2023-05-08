import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), eslint()],
    resolve: {
        alias: [
            {
                find: '#illustrations',
                // eslint-disable-next-line no-undef
                replacement: path.resolve(__dirname, './src/assets/illustrations'),
            },
            // eslint-disable-next-line no-undef
            { find: '#hooks', replacement: path.resolve(__dirname, './src/hooks') },
        ],
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
});
