import { readFile as read } from 'node:fs/promises';
export const readFile = (file) => read(file, {
    encoding: 'utf8',
    flag: 'r'
});
//# sourceMappingURL=readFile.mjs.map