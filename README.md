# kaisaku

A simple tool to generate pre-compiled version information from packages and git versions.

## Features

Kaisaku features three built-in version providers

- `simple` - provides basic timestamp information
- `packageInfo` - reads `package.json` and returns the version of the package
- `git` - fetches the latest commit information

You can also implement your own providers as functions returning records:

```ts
import * as kaisaku from "kaisaku"

// use the default providers
kaisaku.withDefaults()
	.use(() => ({ hello: "world" }))

// generate the version information file
kaisaku.generate()
```

## License

Copyright (c) 2022 Kaylen Dart

Kaisaku is licensed under either the MIT License, or the Apache License, at your discretion. You can find these licenses in their respective files, [LICENSE-MIT](./LICENSE-MIT) and [LICENSE-APACHE](./LICENSE-APACHE).
