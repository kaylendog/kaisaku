import { describe, expect, it } from "vitest";

import { packageInfo } from "./package";

describe("package resolver", () => {
	it("should correctly resolve package information", async () => {
		const info = await packageInfo()();
		expect(info).toHaveProperty("PACKAGE_VERSION");
	});
});
