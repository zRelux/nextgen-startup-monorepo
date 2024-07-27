import { AnalyticsProvider } from "@monorepo/analytics";
import "../../global.css";
import { Slot } from "expo-router";

function Layout() {
	return (
		<AnalyticsProvider>
			<Slot />
		</AnalyticsProvider>
	);
}

export default Layout;
