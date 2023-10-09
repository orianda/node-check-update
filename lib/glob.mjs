import { glob, hasMagic } from 'glob';
export const isGlob = (pattern) => hasMagic(pattern, {
    noext: false,
    nobrace: false
});
export const doGlob = (pattern, cwd) => glob(pattern, {
    cwd,
    ignore: ['**/node_modules/**']
});
//# sourceMappingURL=glob.mjs.map