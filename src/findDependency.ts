import type { PkgTree } from 'snyk-nodejs-lockfile-parser';

import { getDependencyTree } from './getDependencyTree';

export type Dependency = PkgTree['dependencies'][keyof PkgTree['dependencies']];

function findDependencyFromPackageTree(
  tree: Dependency,
  name: string,
): Array<Dependency> {
  const dependencies =
    tree.dependencies !== undefined
      ? Object.values(tree.dependencies).flatMap((subTree) =>
          findDependencyFromPackageTree(subTree, name),
        )
      : [];
  if (tree.name === name) {
    return [tree, ...dependencies];
  } else {
    return dependencies;
  }
}

/**
 * Find all instances of a given package name inside the dependency tree of a given package directory.
 * @param root A package's root directory that containers the package.json file with either package-lock.json or yarn.lock file.
 * @param name A package name.
 * @returns An array of all dependency instances of the given package name.
 */
export async function findDependency(
  root: string,
  name: string,
): Promise<Array<Dependency>> {
  const graph = await getDependencyTree(root);
  return findDependencyFromPackageTree(graph, name);
}
