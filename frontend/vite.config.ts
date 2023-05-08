import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '#illustrations',
                // eslint-disable-next-line no-undef
                replacement: path.resolve(__dirname, './src/assets/illustrations'),
            },
            // eslint-disable-next-line no-undef
            { find: '#hooks', replacement: path.resolve(__dirname, './src/hooks') },
            { find: /^#modules\/(.*)$/, replacement: path.resolve(__dirname, './src/modules/$1') },
        ],
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
});
