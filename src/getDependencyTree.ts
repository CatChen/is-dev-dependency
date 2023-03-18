import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildDepTreeFromFiles } from 'snyk-nodejs-lockfile-parser';
import type { PkgTree } from 'snyk-nodejs-lockfile-parser';

/**
 * Get dependency tree of a given package directory.
 * @param root A package's root directory that containers the package.json file with either package-lock.json or yarn.lock file.
 * @returns A tree that represents all the packages in the dependency tree.
 */
export async function getDependencyTree(root: string): Promise<PkgTree> {
  const absoluteRootPath = resolve(process.cwd(), root);
  const absolutePackageJsonPath = resolve(absoluteRootPath, 'package.json');
  const absolutePackageLockJsonPath = resolve(
    absoluteRootPath,
    'package-lock.json',
  );
  const absoluteYarnLockPath = resolve(absoluteRootPath, 'yarn.lock');
  const absoluteLockFilePath = existsSync(absolutePackageLockJsonPath)
    ? absolutePackageLockJsonPath
    : absoluteYarnLockPath;
  return buildDepTreeFromFiles(
    absoluteRootPath,
    absolutePackageJsonPath,
    absoluteLockFilePath,
    true,
  );
}
