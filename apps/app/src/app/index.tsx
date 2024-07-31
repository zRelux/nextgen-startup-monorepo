import { useAppRoutingSetup } from "@/hooks/useAppRouting";
import {
	AlertDialog,
	AlertDialogBackdrop,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	Button,
	ButtonText,
	Heading,
	Text,
} from "@monorepo/design-system";
import { Link } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
	useAppRoutingSetup();
	return (
		<View className="flex flex-1">
			<Header />
			<Content />
			<Footer />
		</View>
	);
}

function Content() {
	const [showAlertDialog, setShowAlertDialog] = useState(false);
	const handleClose = () => setShowAlertDialog(false);
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
						<Text className="mx-auto max-w-[700px] text-lg text-center text-gray-500 md:text-xl sm:text-blue-500">
							Discover and collaborate on Monooorepo. Explore our services now.
						</Text>

						<View className="gap-4">
							<Button size="md" variant="solid" action="primary" onPress={() => setShowAlertDialog(true)}>
								<ButtonText>Hello World!</ButtonText>
							</Button>
						</View>
					</View>
				</View>
			</View>
			<AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
				<AlertDialogBackdrop />
				<AlertDialogContent>
					<AlertDialogHeader>
						<Heading className="text-typography-950 font-semibold" size="md">
							Are you sure you want to delete this post?
						</Heading>
					</AlertDialogHeader>
					<AlertDialogBody className="mt-3 mb-4">
						<Text size="sm">
							Deleting the post will remove it permanently and cannot be undone. Please confirm if you want to proceed.
						</Text>
					</AlertDialogBody>
					<AlertDialogFooter className="">
						<Button variant="outline" action="secondary" onPress={handleClose} size="sm">
							<ButtonText>Cancel</ButtonText>
						</Button>
						<Button size="sm" onPress={handleClose}>
							<ButtonText>Delete</ButtonText>
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
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
					<Link className="text-md font-medium hover:underline web:underline-offset-4" href="/">
						<Text>About</Text>
					</Link>
					<Link className="text-md font-medium hover:underline web:underline-offset-4" href="/">
						<Text>Product</Text>
					</Link>
					<Link className="text-md font-medium hover:underline web:underline-offset-4" href="/">
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
		<View className="flex shrink-0 bg-gray-100 native:hidden" style={{ paddingBottom: bottom }}>
			<View className="py-6 flex-1 items-start px-4 md:px-6 ">
				<Text className={"text-center text-gray-700"}>© {new Date().getFullYear()} Me</Text>
			</View>
		</View>
	);
}
