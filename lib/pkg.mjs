import { join } from 'node:path';
import { __dirname } from './globals.mjs';
import { readFile } from './readFile.mjs';
const getPkg = async () => {
    const file = join(__dirname, '../package.json');
    const buffer = await readFile(file);
    const string = buffer.toString();
    return JSON.parse(string);
};
export const pkg = getPkg();
//# sourceMappingURL=pkg.mjs.map