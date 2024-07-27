//https://nitro.unjs.io/config
export default defineNitroConfig({
	srcDir: "src",
	errorHandler: "~/onError",
	experimental: {
		tasks: true,
		openAPI: true,
	},
});
