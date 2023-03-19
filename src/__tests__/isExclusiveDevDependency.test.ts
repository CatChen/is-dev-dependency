import { describe, expect, test } from '@jest/globals';

import { isExclusiveDevDependency } from '..';

describe('isExclusiveDevDependency', () => {
  test('Prod dependency is not dev dependency', async () => {
    const result = await isExclusiveDevDependency(
      process.cwd(),
      'snyk-nodejs-lockfile-parser',
    );
    expect(result).toBe(false);
  });

  test('Dev dependency is dev dependency', async () => {
    const result = await isExclusiveDevDependency(process.cwd(), 'eslint');
    expect(result).toBe(true);
  });

  test('Mixed dependency is not dev dependency', async () => {
    const result = await isExclusiveDevDependency(process.cwd(), '@types/node');
    expect(result).toBe(false);
  });

  test('Self is not dev dependency', async () => {
    const result = await isExclusiveDevDependency(
      process.cwd(),
      'is-dev-dependency',
    );
    expect(result).toBe(false);
  });
});
