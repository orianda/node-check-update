import chalk from 'chalk';
import {args} from './args.mjs';
import {check} from './check.mjs';
import {engines} from './engines.mjs';
import {release} from './release.mjs';
import {table} from './table.mjs';

export const verify = (): number => {
  const {lts} = args;
  const issue = engines.map(({file, node, npm}) => {
    const nodeCode = check(release?.version, node) ? 0 : 2;
    const npmCode = check(release?.npm, npm) ? 0 : 4;
    const code = nodeCode | npmCode;
    return {
      file,
      node: !node ? '-' : nodeCode ? chalk.red(node) : chalk.green(node),
      npm: !npm ? '-' : npmCode ? chalk.red(npm) : chalk.green(npm),
      code
    };
  });

  table(issue, [{
    name: 'file',
    align: 'left',
    padding: 1,
    minWidth: 25
  }, {
    name: 'node',
    align: 'right',
    paddingLeft: 1,
    paddingRight: 2,
    minWidth: 9
  }, {
    name: 'npm',
    align: 'right',
    padding: 1,
    minWidth: 9
  }], {
    file: chalk.bold('Engine settings'),
    node: 'Node.js',
    npm: 'NPM',
    code: 0
  }, {
    file: chalk.bold(`${lts ? 'LTS' : 'Current'} release`),
    node: release?.version,
    npm: release?.npm,
    code: 0
  });

  return issue.reduce((code, row) => Math.max(code, row.code), 0);
};
