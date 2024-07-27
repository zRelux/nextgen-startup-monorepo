import { PostHog } from "posthog-node";

//@ts-ignore Ts conflicts with Biome
const client = new PostHog(process.env.POSTHOG_CLIENT, {
	//@ts-ignore Ts conflicts with Biome
	host: process.env.POSTHOG_SERVER || "https://eu.i.posthog.com",
});

export const clientShutdown = () => {
	return client.shutdown();
};

export default client;
