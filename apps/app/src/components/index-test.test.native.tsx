import { render } from "@testing-library/react-native";
import HelloWorld from "./index";

test("HelloWorld component", () => {
	const { getByText } = render(<HelloWorld />);
	const element = getByText("Hello World!");
	expect(element).toBeTruthy();
});
