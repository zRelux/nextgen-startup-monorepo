import { registerRootComponent } from "expo";
import { renderRootComponent as routerRenderRootComponent } from "expo-router/build/renderRootComponent";
import { Platform, Text, View } from "react-native";
import { isClip } from "react-native-app-clip";
import { SafeAreaProvider } from "react-native-safe-area-context";
import App from "./src";

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

if (Platform.OS === "ios" && isClip()) {
	registerRootComponent(AppClip);
} else {
	routerRenderRootComponent(App);
}
