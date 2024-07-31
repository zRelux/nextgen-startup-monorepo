import OpenAI from "openai";

const openai = new OpenAI({
	baseURL: "https://monorepo.loca.lt/v1/",
	// required but ignored
	apiKey: "ollama",
});

async function main() {
	const runner = openai.beta.chat.completions
		.runTools({
			model: "llama3.1:latest",
			messages: [{ role: "user", content: "How is the weather this week? In Rome" }],
			tools: [
				{
					type: "function",
					function: {
						function: getCurrentLocation,
						parameters: { type: "object", properties: {} },
					},
				},
				{
					type: "function",
					function: {
						function: getWeather,
						parse: JSON.parse, // or use a validation library like zod for typesafe parsing.
						parameters: {
							type: "object",
							properties: {
								location: { type: "string" },
							},
						},
					},
				},
			],
		})
		.on("message", (message) => console.log(message));

	const finalContent = await runner.finalContent();
	console.log();
	console.log("Final content:", finalContent);
}

async function getCurrentLocation() {
	return "Boston";
}

async function getWeather(args: { location: string }) {
	const { location } = args;
	return { temperature: "100", precipitation: 100 };
}

main();
