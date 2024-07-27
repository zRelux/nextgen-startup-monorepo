import * as Sentry from "@sentry/react-native";
import Constants from "expo-constants";
import * as Updates from "expo-updates";
import config from "./config";

export const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

const initSentry = () => {
	Sentry.init({
		release: Constants.expoConfig?.version,
		dist: Updates.updateId || "",
		dsn: config.SENTRY_DNS,
		tracePropagationTargets: [config.WEBSITE_URL],
		integrations: [
			new Sentry.ReactNativeTracing({
				routingInstrumentation,
			}),
		],
	});
};

export default initSentry;
