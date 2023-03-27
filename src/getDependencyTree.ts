import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  LockfileType,
  buildDepTree,
  buildDepTreeFromFiles,
} from 'snyk-nodejs-lockfile-parser';
import type { PkgTree } from 'snyk-nodejs-lockfile-parser';

type PackagePath = string;
type NpmPackageFiles = {
  packageJsonContent: string;
  packageLockJsonContent: string;
};
type YarnPackageFiles = {
  packageJsonContent: string;
  yarnLockContent: string;
};
export type NodePackage = PackagePath | NpmPackageFiles | YarnPackageFiles;

/**
 * Get dependency tree of a given package directory.
 * @param root A package's root directory that containers the package.json file with either package-lock.json or yarn.lock file.
 * @returns A tree that represents all the packages in the dependency tree.
 */
export async function getDependencyTree(
  nodePackage: NodePackage,
): Promise<PkgTree> {
  if (typeof nodePackage === 'string') {
    const packagePath = nodePackage;
    const absoluteRootPath = resolve(process.cwd(), packagePath);
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
  } else if ('packageLockJsonContent' in nodePackage) {
    return buildDepTree(
      nodePackage.packageJsonContent,
      nodePackage.packageLockJsonContent,
      true,
      LockfileType.npm,
    );
  } else {
    return buildDepTree(
      nodePackage.packageJsonContent,
      nodePackage.yarnLockContent,
      true,
      nodePackage.yarnLockContent.includes('__metadata')
        ? LockfileType.yarn2
        : LockfileType.yarn,
    );
  }
}
