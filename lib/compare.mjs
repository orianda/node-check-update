import chalk from 'chalk';
import { version } from 'node:process';
import { format } from './format.mjs';
import { npmVersion } from './npm.mjs';
import { release } from './release.mjs';
import { table } from './table.mjs';
export const compare = () => {
    const rows = [{
            label: 'Node.js',
            process: version,
            release: release?.version
        }, {
            label: 'NPM',
            process: npmVersion,
            release: release?.npm
        }]
        .map(({ label, release, process }) => release && {
        label,
        process,
        sep: '→',
        release: format(process, release)
    })
        .filter((row) => !!row);
    table(rows, [{
            name: 'label',
            align: 'left',
            padding: 1,
            minWidth: 25
        }, {
            name: 'process',
            align: 'right',
            padding: 1,
            minWidth: 9
        }, {
            name: 'sep',
            align: 'center',
            padding: 0
        }, {
            name: 'release',
            align: 'right',
            padding: 1,
            minWidth: 9
        }], {
        label: chalk.bold('Update info'),
        process: 'System',
        sep: '',
        release: 'Release'
    });
};
//# sourceMappingURL=compare.mjs.map