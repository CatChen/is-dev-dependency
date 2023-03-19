import { describe, expect, test } from '@jest/globals';

import { isDependency } from '../';

describe('isDependency', () => {
  test('Prod dependency is dependency', async () => {
    const result = await isDependency(
      process.cwd(),
      'snyk-nodejs-lockfile-parser',
    );
    expect(result).toBe(true);
  });

  test('Dev dependency is dependency', async () => {
    const result = await isDependency(process.cwd(), 'eslint');
    expect(result).toBe(true);
  });

  test('Self is dependency', async () => {
    const result = await isDependency(process.cwd(), 'is-dev-dependency');
    expect(result).toBe(true);
  });
});
