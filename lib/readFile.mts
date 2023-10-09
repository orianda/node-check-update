import {readFile as read} from 'node:fs/promises';

export const readFile = (
  file: string
): Promise<string> => read(file, {
  encoding: 'utf8',
  flag: 'r'
});
