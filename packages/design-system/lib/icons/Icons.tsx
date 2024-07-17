import { Copy } from "lucide-react-native";
import { iconWithClassName } from "./iconWithClassName";

const iconNames = {
	Copy,
};

type IconProps = {
	iconName: keyof typeof iconNames;
};

export const Icon = ({ iconName }: IconProps) => {
	return iconWithClassName(iconNames[iconName]);
};
