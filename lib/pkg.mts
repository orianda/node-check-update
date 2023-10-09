import {join} from 'node:path';
import {__dirname} from './globals.mjs';
import {readFile} from './readFile.mjs';

export interface Pkg {
  description: string;
  homepage: string;
  name: string;
  version: string;
}

const getPkg = async (): Promise<Pkg> => {
  const file = join(__dirname, '../package.json');
  const buffer = await readFile(file);
  const string = buffer.toString();
  return JSON.parse(string) as Pkg;
};

export const pkg = getPkg();
