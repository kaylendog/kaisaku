import SimpleGit from "simple-git";

import { Resolver } from "../";

interface GitResolverConfig {
	/**
	 * The root directory of the repository.
	 */
	repositoryRoot: string;
	/**
	 * Raw configuration options to pass to git.
	 */
	rawOptions: string[];
}

/**
 * Configuration defaults.
 */
const DEFAULTS: GitResolverConfig = {
	repositoryRoot: process.cwd(),
	rawOptions: [],
};

type GitResolverKeys =
	| "GIT_COMMIT_SHA"
	| "GIT_COMMIT_SHA_SHORT"
	| "GIT_COMMIT_BRANCH"
	| "GIT_COMMIT_DATE";

/**
 * Version resolver factory that provides versioning information from Git.
 * @param config Configuration to pass to this resolver.
 * @returns The git version resolver.
 */
export const git = (
	config?: Partial<GitResolverConfig>
): Resolver<GitResolverKeys> => {
	// map config
	const conf = { ...DEFAULTS, ...config };
	// initialize simple git client
	const simpleGit = SimpleGit(conf.repositoryRoot, {
		config: conf.rawOptions,
	});

	return async () => {
		// use promise.all to resolve faster
		const [log, tags] = await Promise.all([
			simpleGit.log(),
			simpleGit.tags(),
		]);

		return {
			GIT_COMMIT_SHA: log.latest?.hash ?? "",
			GIT_COMMIT_SHA_SHORT: log.latest?.hash.slice(0, 7) ?? "",
			GIT_COMMIT_BRANCH: log.latest?.refs ?? "",
			GIT_COMMIT_DATE: log.latest?.date ?? "",
		};
	};
};
