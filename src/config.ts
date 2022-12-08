import { resolve } from "path";

import type { Kaisaku } from ".";

/**
 *
 * @param fn
 * @returns
 */
export const defineConfig = (fn: () => Kaisaku<any>) => {
	return fn();
};

/**
 * Resolve the configuration file.
 */
export const resolveConfig = async () => {
	const mod = (await import(
		resolve(process.cwd(), "./kaisaku.config.js")
	)) as { default: () => Kaisaku<any> };
	return mod.default();
};
