import {satisfies} from 'semver';

export const check = (
  version?: string,
  range?: string
) => !version ? false : !range || satisfies(version, range);
