import { beforeAll, describe, expect, test } from '@jest/globals';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { isDependency } from '../';

describe('isDependency', () => {
  describe('Using package path', () => {
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

  describe('Using package.json and yarn.lock', () => {
    let packageJsonContent: string;
    let yarnLockContent: string;

    beforeAll(async () => {
      packageJsonContent = await readFile(
        resolve(process.cwd(), 'package.json'),
        { encoding: 'utf8' },
      );
      yarnLockContent = await readFile(resolve(process.cwd(), 'yarn.lock'), {
        encoding: 'utf8',
      });
    });

    test('Prod dependency is dependency', async () => {
      const result = await isDependency(
        {
          packageJsonContent,
          yarnLockContent,
        },
        'snyk-nodejs-lockfile-parser',
      );
      expect(result).toBe(true);
    });

    test('Dev dependency is dependency', async () => {
      const result = await isDependency(
        { packageJsonContent, yarnLockContent },
        'eslint',
      );
      expect(result).toBe(true);
    });

    test('Self is dependency', async () => {
      const result = await isDependency(
        { packageJsonContent, yarnLockContent },
        'is-dev-dependency',
      );
      expect(result).toBe(true);
    });
  });
});
