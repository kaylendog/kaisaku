import { git } from "./resolver/git";
import { packageInfo } from "./resolver/package";
import { simple } from "./resolver/simple";

interface ResolverOptions {}

export type Resolver<K extends string> = (
	opts: ResolverOptions
) => Record<K, string> | Promise<Record<K, string>>;

/**
 * Merge one or two more resolvers together.
 * @param a
 * @param b
 * @returns
 */
const merge =
	<A extends string, B extends string>(
		a: Resolver<A>,
		b: Resolver<B>
	): Resolver<A | B> =>
	async () => ({ ...(await a({})), ...(await b({})) });

class Kaisaku<K extends string> {
	/**
	 * @returns A Kaisaku with the default resolvers specified.
	 */
	static withDefaults() {
		return this.empty().use(git()).use(simple()).use(packageInfo());
	}

	/**
	 * @returns An empty Kaisaku resolver.
	 */
	static empty() {
		return new Kaisaku(async () => ({}));
	}

	/**
	 * Returns a Kaisaku with the given resolver defined.
	 * @param resolver The resolver.
	 * @returns
	 */
	static use<T extends string>(resolver: Resolver<T>): Kaisaku<T> {
		return this.empty().use(resolver);
	}

	private constructor(private readonly resolver: Resolver<K>) {}

	/**
	 * Append the given resolver to the version generator,
	 */
	use<T extends string>(resolver: Resolver<T>): Kaisaku<K | T> {
		return new Kaisaku(merge(this.resolver, resolver));
	}

	/**
	 * Resolve all the defined resolvers into the version information.
	 * @returns The resolved version information.
	 */
	async resolve(): Promise<Record<K, string>> {
		return this.resolver({});
	}
}

export const { use, withDefaults, empty } = Kaisaku;

export * from "./resolver";
