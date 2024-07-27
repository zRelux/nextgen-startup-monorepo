import { H3Error } from "h3";
import SentryService from "~/services/Sentry/service";

export default defineNitroPlugin((nitroApp) => {
	SentryService.init();

	nitroApp.hooks.hook("error", (error) => {
		// Do not handle 404s and 422s
		if (error instanceof H3Error) {
			if (error.statusCode === 404 || error.statusCode === 422) {
				return;
			}
		}

		SentryService.captureException(error);
	});
});
