import { render } from "@testing-library/react";
import HelloWorld from "./index";

test("HelloWorld component", () => {
	const { getByText } = render(<HelloWorld />);
	const element = getByText("Hello World!");
	expect(element).toBeTruthy();
});
