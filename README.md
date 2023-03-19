# is-dev-dependency

This library helps us identify whether a Node package is used exclusive as a direct or indirect dev dependency in a Node library project. If a Node package is an exclusive dev dependency, we can safely add/remove/upgrade this dependency without modifying the Node project's behavior as an library.

For instance, `is-dev-dependency` uses `jest` to run tests. `jest` is its dev dependency. Adding/removing/upgrading `jest` may affect `is-dev-dependency`'s developer experience but it won't affect anyone using `is-dev-dependency` as a library. (When adding `is-dev-dependency` as a dependency to another Node project it won't bring `jest` into that project as an indirect dependency. Modifying `jest` won't change `is-dev-dependency` as a library.)

## Usage

The Node project directory we target needs to include a `package.json` file and a lock file (either `package-lock.json` or `yarn.lock`). We use the directory's relative or absolute path and a Node package name to find out if this particular package is exclusively a dev dependency.

```TypeScript
import { isExclusiveDevDependency } from 'is-dev-dependency';

// `is-dev-dependency` uses `jest` as a dev dependency.
console.log(isExclusiveDevDependency('./', 'jest')); // true

// `is-dev-dependency` uses `snyk-nodejs-lockfile-parser` as a dependency.
// Both `snyk-nodejs-lockfile-parser` and `jest` use '@types/node' as a dependency so it's a mixed dependency.
console.log(isExclusiveDevDependency('./', '@types/node')); // false

console.log(isExclusiveDevDependency('./', 'snyk-nodejs-lockfile-parser')); // false
```
