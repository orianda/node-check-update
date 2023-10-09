import { satisfies } from 'semver';
export const check = (version, range) => !version ? false : !range || satisfies(version, range);
//# sourceMappingURL=check.mjs.map