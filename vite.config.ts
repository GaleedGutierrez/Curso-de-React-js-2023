import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import pluginPurgeCss from 'vite-plugin-purgecss-updated-v5';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), pluginPurgeCss()],
	resolve: {
		alias: {
			'@src': fileURLToPath(new URL('./src', import.meta.url)),
			'@tests': fileURLToPath(new URL('./tests/', import.meta.url)),
			'@styles': fileURLToPath(new URL('./src/styles/', import.meta.url)),
			'@utils': fileURLToPath(new URL('./src/utils/', import.meta.url)),
			'@templates': fileURLToPath(
				new URL('./src/templates/', import.meta.url),
			),
			'@images': fileURLToPath(new URL('./src/images/', import.meta.url)),
			'@components': fileURLToPath(
				new URL('./src/components/', import.meta.url),
			),
			'@hooks': fileURLToPath(new URL('./src/hooks/', import.meta.url)),
			'@context': fileURLToPath(
				new URL('./src/context/', import.meta.url),
			),
		},
	},
});
