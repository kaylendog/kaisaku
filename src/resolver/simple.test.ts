import { describe, expect, it } from "vitest";

import { simple } from "./simple";

describe("simple resolver", () => {
	it("should correctly resolve timestamp information", () => {
		const info = simple()();
		expect(info).toHaveProperty("KAISAKU_BUILD_DATE");
		expect(info.KAISAKU_BUILD_DATE).toEqual(
			new Date().toISOString().split("T")[0]
		);
	});
});
