import { Button } from "@monorepo/design-system";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
	return (
		<View className="flex flex-1">
			<Header />
			<Content />
			<Footer />
		</View>
	);
}

function Content() {
	return (
		<View className="flex-1">
			<View className="py-12 md:py-24 lg:py-32 xl:py-48">
				<View className="px-4 md:px-6">
					<View className="flex flex-col items-center gap-4 text-center">
						<Text
							role="heading"
							className="text-3xl text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
						>
							Welcome to Project ACME
						</Text>
						<Text className="mx-auto max-w-[700px] text-lg text-center text-gray-500 md:text-xl dark:text-gray-400">
							Discover and collaborate on amce. Explore our services now.
						</Text>

						<View className="gap-4">
							<Button>
								<Text className="text-white">Explore</Text>
							</Button>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}

function Header() {
	const { top } = useSafeAreaInsets();
	return (
		<View style={{ paddingTop: top }}>
			<View className="px-4 lg:px-6 h-14 flex items-center flex-row justify-between ">
				<Link className="font-bold flex-1 items-center justify-center" href="/">
					<Text>ACME</Text>
				</Link>
				<View className="flex flex-row gap-4 sm:gap-6">
					<Link
						className="text-md font-medium hover:underline web:underline-offset-4"
						href="/"
					>
						<Text>About</Text>
					</Link>
					<Link
						className="text-md font-medium hover:underline web:underline-offset-4"
						href="/"
					>
						<Text>Product</Text>
					</Link>
					<Link
						className="text-md font-medium hover:underline web:underline-offset-4"
						href="/"
					>
						<Text>Pricing</Text>
					</Link>
				</View>
			</View>
		</View>
	);
}

function Footer() {
	const { bottom } = useSafeAreaInsets();
	return (
		<View
			className="flex shrink-0 bg-gray-100 native:hidden"
			style={{ paddingBottom: bottom }}
		>
			<View className="py-6 flex-1 items-start px-4 md:px-6 ">
				<Text className={"text-center text-gray-700"}>
					© {new Date().getFullYear()} Me
				</Text>
			</View>
		</View>
	);
}
