import simpleGit from "simple-git";

import { Resolver } from "../";

export const git = (): Resolver<"GIT_COMMIT_SHA"> => async () => {
	return {
		GIT_COMMIT_SHA: (await simpleGit().log()).latest?.hash ?? "",
	};
};
