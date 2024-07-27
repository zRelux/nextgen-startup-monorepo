import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import pkjson from "../../../package.json";

const SentryService = {
	init: () => {
		Sentry.init({
			serverName: "monorepoBFF",
			enabled: process.env.NODE_ENV === "production",
			environment: process.env.NODE_ENV,
			release: pkjson.version,
			dsn: process.env.SENTRY_DSN,
			integrations: [nodeProfilingIntegration()],
			tracesSampleRate: 1.0,
			profilesSampleRate: 1.0,
		});
	},
	captureException: (error: Error, msg?: string) => {
		if (msg) {
			Sentry.captureMessage(msg);
		}

		return Sentry.captureException(error);
	},
};

export default SentryService;
