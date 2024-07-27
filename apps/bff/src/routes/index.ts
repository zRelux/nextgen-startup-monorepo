import type { MyCustomType } from "@monorepo/types";

export default eventHandler((event) => {
	const c: MyCustomType = "Ciao";
	return c;
});
