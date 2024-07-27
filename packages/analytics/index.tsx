import PostHog, { PostHogProvider } from "posthog-react-native";

//@ts-ignore Ts conflicts with Biome
const client = new PostHog(process.env.EXPO_PUBLIC_POSTHOG_CLIENT, {
	//@ts-ignore Ts conflicts with Biome
	host: process.env.EXPO_PUBLIC_POSTHOG_SERVER || "https://eu.i.posthog.com",
});

type AnalyticsProviderProps = {
	children: React.ReactNode;
};

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
	return <PostHogProvider client={client}>{children}</PostHogProvider>;
};

export default client;
