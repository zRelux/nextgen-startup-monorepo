import { SafeAreaProvider } from 'react-native-safe-area-context';
import { App as ExpoApp } from 'expo-router/build/qualified-entry';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

export function App() {
  return (
    <SafeAreaProvider>
        <ExpoApp />
    </SafeAreaProvider>
  );
}

renderRootComponent(App);
