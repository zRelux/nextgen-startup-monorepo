import "@testing-library/react-native/extend-expect";

jest.mock("@testing-library/react", () => {
	const actual = jest.requireActual("@testing-library/react");
	return {
		...actual,
		render: (...args: typeof actual.render) => {
			const result = actual.render(...args);
			result.toJSON = result.asFragment;
			return result;
		},
		fireEvent: {
			...actual.fireEvent,
			press: actual.fireEvent.click,
		},
	};
});
