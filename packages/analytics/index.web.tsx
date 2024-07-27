import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

//@ts-ignore Ts conflicts with Biome
posthog.init(process.env.EXPO_PUBLIC_POSTHOG_CLIENT, {
	//@ts-ignore Ts conflicts with Biome
	api_host: process.env.EXPO_PUBLIC_POSTHOG_SERVER || "https://eu.i.posthog.com",
});

type AnalyticsProviderProps = {
	children: React.ReactNode;
};

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export default posthog;
