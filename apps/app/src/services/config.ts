import { Platform } from "react-native";

type ENVIRONMENT = "local" | "staging" | "production";

type Config = {
	ENVIRONMENT: ENVIRONMENT;
	BFF_URL: string;
	WEBSITE_URL: string;
	PAYMENT_KEY?: string;
	SENTRY_DNS?: string;
	POSTHOG_API_KEY: string;
};

export const localConfig: Config = {
	ENVIRONMENT: "local",
	BFF_URL: "http://localhost:3000",
	WEBSITE_URL: "http://localhost:3000",
	PAYMENT_KEY:
		Platform.OS === "ios"
			? process.env.EXPO_PUBLIC_APPLE_SUBSCRIPTION_KEY
			: process.env.EXPO_PUBLIC_GOOGLE_SUBSCRIPTION_KEY,
	SENTRY_DNS: process.env.EXPO_PUBLIC_SENTRY_DNS,
	POSTHOG_API_KEY: "",
};

export const stagingConfig: Config = {
	ENVIRONMENT: "staging",
	BFF_URL: "http://api.monorepo-staging.com",
	WEBSITE_URL: "http://monorepo-staging.com",
	PAYMENT_KEY:
		Platform.OS === "ios"
			? process.env.EXPO_PUBLIC_APPLE_SUBSCRIPTION_KEY
			: process.env.EXPO_PUBLIC_GOOGLE_SUBSCRIPTION_KEY,
	SENTRY_DNS: process.env.EXPO_PUBLIC_SENTRY_DNS,
	POSTHOG_API_KEY: "",
};

export const productionConfig: Config = {
	ENVIRONMENT: "production",
	BFF_URL: "http://api.monorepo.com",
	WEBSITE_URL: "http://monorepo.com",
	PAYMENT_KEY:
		Platform.OS === "ios"
			? process.env.EXPO_PUBLIC_APPLE_SUBSCRIPTION_KEY
			: process.env.EXPO_PUBLIC_GOOGLE_SUBSCRIPTION_KEY,
	SENTRY_DNS: process.env.EXPO_PUBLIC_SENTRY_DNS,
	POSTHOG_API_KEY: "",
};

export const isProd = process.env.EXPO_PUBLIC_ENVIRONMENT === "production";

export const isStaging = process.env.EXPO_PUBLIC_ENVIRONMENT === "staging";

export const isLocal = process.env.EXPO_PUBLIC_ENVIRONMENT === "local";

export const isDeveloping = isLocal || isStaging;

const config = isProd ? productionConfig : isStaging ? stagingConfig : localConfig;

export default config;
