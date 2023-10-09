import {glob, hasMagic} from 'glob';

export const isGlob = (
  pattern: string
): boolean => hasMagic(pattern, {
  noext: false,
  nobrace: false
});

export const doGlob = (
  pattern: string,
  cwd: string
): Promise<ReadonlyArray<string>> => glob(pattern, {
  cwd,
  ignore: ['**/node_modules/**']
});
