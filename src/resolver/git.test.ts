import { describe, expect, it } from "vitest";

import { git } from "./git";

describe("git resolver", () => {
	it("should resolve to the correct information", async () => {
		const info = await git()({});
		expect(info).toHaveProperty("GIT_COMMIT_SHA");
	});
});
