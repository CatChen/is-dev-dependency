# is-dev-dependency

[![Build](https://github.com/CatChen/is-dev-dependency/actions/workflows/build.yml/badge.svg)](https://github.com/CatChen/is-dev-dependency/actions/workflows/build.yml)
[![Test](https://github.com/CatChen/is-dev-dependency/actions/workflows/test.yml/badge.svg)](https://github.com/CatChen/is-dev-dependency/actions/workflows/test.yml)
[![ESLint](https://github.com/CatChen/is-dev-dependency/actions/workflows/eslint.yml/badge.svg)](https://github.com/CatChen/is-dev-dependency/actions/workflows/eslint.yml)
[![CodeQL](https://github.com/CatChen/is-dev-dependency/actions/workflows/codeql.yml/badge.svg)](https://github.com/CatChen/is-dev-dependency/actions/workflows/codeql.yml)
[![Ship](https://github.com/CatChen/is-dev-dependency/actions/workflows/ship.yml/badge.svg)](https://github.com/CatChen/is-dev-dependency/actions/workflows/ship.yml)
[![codecov](https://codecov.io/gh/CatChen/is-dev-dependency/branch/main/graph/badge.svg)](https://codecov.io/gh/CatChen/is-dev-dependency)

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
