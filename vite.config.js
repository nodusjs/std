import { resolve } from "node:path";
import { defineConfig } from "vite";
import terser from "@rollup/plugin-terser";

export default defineConfig({
	build: {
		lib: {
			entry: {
				directive: resolve(__dirname, "packages/directive/index.js"),
				dom: resolve(__dirname, "packages/dom/index.js"),
				echo: resolve(__dirname, "packages/echo/index.js"),
				event: resolve(__dirname, "packages/event/index.js"),
				spark: resolve(__dirname, "packages/spark/index.js"),
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
			"@echo": resolve(__dirname, "packages/echo"),
			"@event": resolve(__dirname, "packages/event"),
			"@polyfill": resolve(__dirname, "packages/polyfill"),
			"@spark": resolve(__dirname, "packages/spark"),
		},
	},
});
