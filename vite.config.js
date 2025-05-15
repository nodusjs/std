import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: {
				directive: resolve(__dirname, "packages/directive/index.js"),
			},
			formats: ["cjs", "es"],
		},
		outDir: "dist",
		sourcemap: true,
	},

	resolve: {
		alias: {
			"@directive": resolve(__dirname, "packages/directive"),
		},
	},
});
