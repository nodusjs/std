import { resolve } from "node:path";
import { defineConfig } from "vite";
import terser from "@rollup/plugin-terser";

export default defineConfig({
	build: {
		lib: {
			entry: {
				directive: resolve(__dirname, "packages/directive/index.js"),
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
		},
	},
});
