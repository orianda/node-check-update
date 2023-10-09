import {join, sep} from 'node:path';
import {args} from './args.mjs';
import {doGlob, isGlob} from './glob.mjs';
import {readFile} from './readFile.mjs';

export interface Engine {
  file: string;
  node?: string | undefined;
  npm?: string | undefined;
}

const {cwd, deep, packageFile} = args;
const files = deep
  ? await doGlob('**/package.json', cwd)
  : isGlob(packageFile)
    ? await doGlob(packageFile, cwd)
    : [join(cwd, packageFile)];
const promises = files.map(readFile);
const contents = await Promise.all(promises);

export const engines: ReadonlyArray<Engine> = contents.map((json, index) => {
  const {engines} = JSON.parse(json) as {
    engines?: {
      node?: string;
      npm?: string
    }
  } || {};
  const {node, npm} = engines || {};
  const path = files[index] || '';
  const file = path.startsWith(cwd) ? path.slice(cwd.length + 1) : path;
  return {
    file: file.split(sep).join('/'),
    node,
    npm
  };
});
