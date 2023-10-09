import { join, sep } from 'node:path';
import { args } from './args.mjs';
import { doGlob, isGlob } from './glob.mjs';
import { readFile } from './readFile.mjs';
const { cwd, deep, packageFile } = args;
const files = deep
    ? await doGlob('**/package.json', cwd)
    : isGlob(packageFile)
        ? await doGlob(packageFile, cwd)
        : [join(cwd, packageFile)];
const promises = files.map(readFile);
const contents = await Promise.all(promises);
export const engines = contents.map((json, index) => {
    const { engines } = JSON.parse(json) || {};
    const { node, npm } = engines || {};
    const path = files[index] || '';
    const file = path.startsWith(cwd) ? path.slice(cwd.length + 1) : path;
    return {
        file: file.split(sep).join('/'),
        node,
        npm
    };
});
//# sourceMappingURL=engines.mjs.map