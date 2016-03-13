### Tomatao Blog

**developing**
```shell
npm run dev [-- --open]
```

Builds and serves app with hot reloading and debugging support.

**production build**
```shell
npm run build
```

Creates bundles and assets into `src/static`.

**start the server**
```shell
npm start
```

Expects bundles and assets, runs the server in production mode.

***unit test development server***
```shell
npm test
```

Using mocha and webpack middleware to start test server that will provide browser based testing environment. Loading tests from within `./src` where extension is `.test.js`.

This allows tests to be placed next to the file they are testing as well as a nice developer experience developing tests in a browser. Most server code can also be tested this way.

***unit test single run***
```shell
npm test -- --run
```

Runs the test suite in node environment through mocha, once.

***functional/integration tests run***
```shell
npm test -- --functional
```

The purpose of the functional (integration) tests is to sit between unit tests and acceptance tests. They are for testing groups of units and how they communicate without being too closely coupled to implementation.

Functional tests can only be ran in Node context (not the browser) as they contain tests for the server logic. The functional tests are faster than *Acceptance* tests as they stub out IO. The server render tests stub out all client render logic.

It would be possible here to create specific tests for connections to IO if it's desired to test wiring between a DB or external API also. But as Breko-hub doesn't use either of these, the contracts between client and server code are tested instead.

**lint**
```
npm run lint
npm run lint:styles
```

No semi colons, lots of commas on multi-lines for easy duplication, single-quotes. You may not like it, but it works just fine.

Style linting is all default except for some rules which are not important for css modules.
