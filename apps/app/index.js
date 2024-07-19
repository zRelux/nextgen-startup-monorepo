import { isClip } from "react-native-app-clip";
import { App as ExpoApp } from "expo-router/build/qualified-entry";
import { registerRootComponent } from "expo";
import { renderRootComponent as routerRenderRootComponent } from "expo-router/build/renderRootComponent";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import "react-native-gesture-handler";
import "react-native-reanimated";

export function App() {
	return (
		<SafeAreaProvider>
			<ExpoApp />
		</SafeAreaProvider>
	);
}

export function AppClip() {
	return (
		<SafeAreaProvider>
			<View className="bg-red-400 flex-1" style={{ flex: 1 }}>
				<Text className="text-red mt-10" style={{ color: "red", marginTop: 100, marginHorizontal: "auto" }}>
					Ciao App Clip
				</Text>
			</View>
		</SafeAreaProvider>
	);
}

if (isClip()) {
	registerRootComponent(AppClip);
} else {
	routerRenderRootComponent(App);
}
