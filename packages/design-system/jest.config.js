module.exports = {
	projects: [{ preset: "jest-expo/ios" }, { preset: "jest-expo/android" }, { preset: "jest-expo/web" }],
	transformIgnorePatterns: [
		"node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
	],
	setupFiles: ["./jest-setup.ts"],
	moduleNameMapper: {
		"^react-native$": "react-native-web",
		"^@testing-library/react-native$": "@testing-library/react",
	},
};
