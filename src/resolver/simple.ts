import * as luxon from "luxon";

/**
 * A simple resolver that returns the build timestamp.
 * @returns
 */
export const simple = () => () => {
	const now = luxon.DateTime.now();

	return {
		KAISAKU_BUILD_DATE: now.toISODate(),
		KAISAKU_BUILD_TIME: now.toISOTime(),
		KAISAKU_BUILD_TIMESTAMP: now.toISO(),
	};
};
