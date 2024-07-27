import PostHog, { PostHogProvider } from "posthog-react-native";

//@ts-ignore Ts conflicts with Biome
const client = new PostHog(process.env.POSTHOG_CLIENT, {
	//@ts-ignore Ts conflicts with Biome
	host: process.env.POSTHOG_SERVER || "https://eu.i.posthog.com",
});

type AnalyticsProviderProps = {
	children: React.ReactNode;
};

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
	return <PostHogProvider client={client}>{children}</PostHogProvider>;
};

export default client;
