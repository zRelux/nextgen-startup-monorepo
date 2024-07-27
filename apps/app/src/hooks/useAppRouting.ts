import { routingInstrumentation } from "@/services/Sentry";
import { useNavigationContainerRef } from "expo-router";
import { useEffect } from "react";

export const useAppRoutingSetup = () => {
	// Capture the NavigationContainer ref and register it with the instrumentation.
	const ref = useNavigationContainerRef();

	useEffect(() => {
		if (ref) {
			routingInstrumentation.registerNavigationContainer(ref);
		}
	}, [ref]);
};
