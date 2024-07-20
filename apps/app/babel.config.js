const path = require("node:path");

module.exports = (api) => {
	api.cache(true);
	return {
		presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
		plugins: [
			[
				"module-resolver",
				{
					extensions: [".tsx", ".ts", ".js", ".json"],
					alias: {
						// For development, we want to alias the library to the source
						"expo-widgets": path.join(__dirname, "..", "src", "index.ts"),
					},
				},
			],
		],
	};
};
