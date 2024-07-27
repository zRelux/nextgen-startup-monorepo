import Constants from "expo-constants";
import { Platform } from "react-native";

type ENVIRONMENT = "local" | "staging" | "production";

type Config = {
	ENVIRONMENT: ENVIRONMENT;
	BFF_URL: string;
	WEBSITE_URL: string;
	PAYMENT_KEY: string;
	SENTRY_DNS: string;
	POSTHOG_API_KEY: string;
};

export const localConfig: Config = {
	ENVIRONMENT: "local",
	BFF_URL: "http://localhost:3000",
	WEBSITE_URL: "http://localhost:3000",
	PAYMENT_KEY:
		Platform.OS === "ios"
			? Constants.expoConfig?.extra?.APPLE_SUBSCRIPTION_KEY
			: Constants.expoConfig?.extra?.GOOGLE_SUBSCRIPTION_KEY,
	SENTRY_DNS: Constants.expoConfig?.extra?.SENTRY_DNS,
	POSTHOG_API_KEY: "",
};

export const stagingConfig: Config = {
	ENVIRONMENT: "staging",
	BFF_URL: "http://api.monorepo-staging.com",
	WEBSITE_URL: "http://monorepo-staging.com",
	PAYMENT_KEY:
		Platform.OS === "ios"
			? Constants.expoConfig?.extra?.APPLE_SUBSCRIPTION_KEY
			: Constants.expoConfig?.extra?.GOOGLE_SUBSCRIPTION_KEY,
	SENTRY_DNS: Constants.expoConfig?.extra?.SENTRY_DNS,
	POSTHOG_API_KEY: "",
};

export const productionConfig: Config = {
	ENVIRONMENT: "production",
	BFF_URL: "http://api.monorepo.com",
	WEBSITE_URL: "http://monorepo.com",
	PAYMENT_KEY:
		Platform.OS === "ios"
			? Constants.expoConfig?.extra?.APPLE_SUBSCRIPTION_KEY
			: Constants.expoConfig?.extra?.GOOGLE_SUBSCRIPTION_KEY,
	SENTRY_DNS: Constants.expoConfig?.extra?.SENTRY_DNS,
	POSTHOG_API_KEY: "",
};

export const isProd = Constants.expoConfig?.extra?.ENVIRONMENT === "production";

export const isStaging = Constants.expoConfig?.extra?.ENVIRONMENT === "staging";

export const isLocal = Constants.expoConfig?.extra?.ENVIRONMENT === "local";

export const isDeveloping = isLocal || isStaging;

const config = isProd ? productionConfig : isStaging ? stagingConfig : localConfig;

export default config;
