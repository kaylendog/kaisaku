import { describe, expect, it } from "vitest";

import * as kaisaku from "../src";

describe("kaisaku", () => {
	it("should resolve default information", async () => {
		const info = await kaisaku.withDefaults().resolve();
		expect(Object.keys(info)).toEqual([
			"GIT_COMMIT_SHA",
			"KAISAKU_BUILD_DATE",
			"KAISAKU_BUILD_TIME",
			"KAISAKU_BUILD_TIMESTAMP",
			"PACKAGE_VERSION",
		]);
	});

	it("should write to the version file", async () => {
		await kaisaku.withDefaults().script("./version.ts");
	});
});
