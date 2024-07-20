import { OverlayProvider } from "@gluestack-ui/overlay";
import { ToastProvider } from "@gluestack-ui/toast";
import type { ReactNode } from "react";
import { View, type ViewStyle } from "react-native";
import { config } from "./config";

export function GluestackUIProvider({
	mode = "light",
	...props
}: {
	mode?: "light" | "dark";
	children?: ReactNode;
	style?: ViewStyle;
}) {
	return (
		<View style={[config[mode], { flex: 1, height: "100%", width: "100%" }, props.style]}>
			<OverlayProvider>
				<ToastProvider>{props.children}</ToastProvider>
			</OverlayProvider>
		</View>
	);
}
