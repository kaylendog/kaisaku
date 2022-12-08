import * as fs from "fs/promises";
import { resolve } from "path";
import { z } from "zod";

const PacakgeSchema = z.object({
	version: z.string(),
});

export const packageInfo = () => async () => {
	const path = resolve(process.cwd(), "package.json");
	const file = (await fs.readFile(path)).toString("utf8");
	const pkg = await PacakgeSchema.parseAsync(JSON.parse(file));
	return {
		PACKAGE_VERSION: pkg.version,
	};
};
