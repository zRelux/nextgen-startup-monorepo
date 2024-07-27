import type { MyCustomType } from "@monorepo/types";

export default eventHandler(() => {
	const c: MyCustomType = "Ciao";
	return c;
});
