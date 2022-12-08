import chalk from "chalk";
import { Command } from "commander";

import { resolveConfig } from "./config";
import { PACKAGE_VERSION } from "./version";

const program = new Command();

program
	.name("kaisaku")
	.description(
		"A simple tool to generate pre-compiled version information from packages and git versions."
	)
	.version(PACKAGE_VERSION)
	.action(async () => {
		const kaisaku = await resolveConfig().catch((err) => {
			console.error(
				chalk.red("error"),
				"failed to read kaisaku.config.ts - does it exist?"
			);
			console.error(chalk.gray(err.message));
			process.exit(1);
		});
		kaisaku.script();
	});

program.parse();
