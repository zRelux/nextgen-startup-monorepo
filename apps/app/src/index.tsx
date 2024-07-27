import { GluestackUIProvider } from "@monorepo/design-system";
import { App as ExpoApp } from "expo-router/build/qualified-entry";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { wrap } from "@sentry/react-native";
import initSentry from "./services/Sentry";

initSentry();

function App() {
	return (
		<GluestackUIProvider>
			<SafeAreaProvider>
				<ExpoApp />
			</SafeAreaProvider>
		</GluestackUIProvider>
	);
}

export default wrap(App);
