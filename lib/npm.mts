import {exec} from 'node:child_process';
import {promisify} from 'node:util';

const run = promisify(exec);

const {stdout} = await run('npm --version');
export const npmVersion = stdout.trim();
