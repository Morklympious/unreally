import { defineConfig as configure } from "eslint/config";
import js from "@eslint/js";
import tivac from "@tivac/eslint-config";

export default configure([
	{
		files   : [ "**/*.js", "**/*.mjs" ],
		ignores : [
			".vitepress/cache/**",
			".vitepress/cache/deps/**",
		],
		plugins : {
			js,
		},
		extends : [ tivac ],
	},
]);
