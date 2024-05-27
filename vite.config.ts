import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@src': fileURLToPath(new URL('./src', import.meta.url)),
			'@tests': fileURLToPath(new URL('./tests/', import.meta.url)),
			'@styles': fileURLToPath(new URL('./src/styles/', import.meta.url)),
			'@utils': fileURLToPath(new URL('./src/utils/', import.meta.url)),
			'@templates': fileURLToPath(
				new URL('./src/templates/', import.meta.url),
			),
			'@types': fileURLToPath(new URL('./src/types/', import.meta.url)),
			'@images': fileURLToPath(new URL('./src/images/', import.meta.url)),
			'@components': fileURLToPath(
				new URL('./src/components/', import.meta.url),
			),
			'@hooks': fileURLToPath(new URL('./src/hooks/', import.meta.url)),
		},
	},
});
