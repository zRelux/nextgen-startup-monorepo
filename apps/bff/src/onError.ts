import type { H3Event } from "h3";
import SentryService from "~/services/Sentry/service";

export default defineNitroErrorHandler((error: Error, event: H3Event) => {
	SentryService.captureException(error);
	setResponseStatus(event, 500, "Internal server error");

	return send(event, JSON.stringify({ status: "ERROR", msg: "Internal server error" }), "application/json");
});
