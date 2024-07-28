import { $fetch } from "nitro-test-utils/e2e";
import { describe, expect, it } from "vitest";

describe("routes", () => {
	it("responds successfully", async () => {
		const { data, status } = await $fetch("/");

		expect(status).toBe(200);
		expect(data).toBe("Ciao");
	});
});
