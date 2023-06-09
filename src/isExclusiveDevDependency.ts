import { findDependency } from './findDependency';
import type { NodePackage } from './getDependencyTree';

/**
 * Determines if a given package name is used exclusively as a dev dependency in a given package directory.
 * @param root A package's root directory that containers the package.json file with either package-lock.json or yarn.lock file.
 * @param name A package name.
 * @returns An indicator of whether the given package name is used exclusively as a dev dependency.
 */
export async function isExclusiveDevDependency(
  nodePackage: NodePackage,
  name: string,
): Promise<boolean> {
  const dependencies = await findDependency(nodePackage, name);
  return dependencies.every((dependency) => dependency.labels?.scope === 'dev');
}
