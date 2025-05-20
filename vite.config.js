import { resolve } from "node:path";
import { defineConfig } from "vite";
import terser from "@rollup/plugin-terser";

export default defineConfig({
	build: {
		lib: {
			entry: {
				directive: resolve(__dirname, "packages/directive/index.js"),
				dom: resolve(__dirname, "packages/dom/index.js"),
				event: resolve(__dirname, "packages/event/index.js"),
			},
			formats: ["cjs", "es"],
		},
		minify: false,
		outDir: "dist",
		rollupOptions: {
			plugins: [
				terser({
					format: {
						comments: false,
					},
				}),
			],
		},
		sourcemap: true,
	},
	resolve: {
		alias: {
			"@directive": resolve(__dirname, "packages/directive"),
			"@dom": resolve(__dirname, "packages/dom"),
			"@event": resolve(__dirname, "packages/event"),
			"@polyfill": resolve(__dirname, "packages/polyfill"),
		},
	},
});
