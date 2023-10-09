import process, { argv, env } from 'node:process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { isTrue } from './isTrue.mjs';
import { pkg } from './pkg.mjs';
const { NCV_PACKAGE_FILE, NCV_CWD, NCV_DEEP, NCV_PROXY, NCV_LTS } = env;
const { description, homepage, name, version } = await pkg;
export const args = await yargs()
    .strict(false)
    .scriptName(name)
    .usage('$0', description)
    .epilogue(`For more information, see ${homepage}`)
    .help('help', 'Show help')
    .alias('h', 'help')
    .version('version', 'Show version number', version)
    .alias('v', 'version')
    .option('package-file', {
    description: 'Package file(s) path or glob path',
    alias: 'p',
    type: 'string',
    default: NCV_PACKAGE_FILE || './package.json',
    hidden: false,
    deprecate: false,
    demandOption: false,
    requiresArg: true,
    skipValidation: false
})
    .option('cwd', {
    description: 'Package file(s) base directory',
    alias: 'd',
    type: 'string',
    array: false,
    boolean: false,
    number: false,
    string: true,
    default: NCV_CWD || process.cwd(),
    hidden: false,
    deprecate: false,
    demandOption: false,
    requiresArg: true,
    skipValidation: false
})
    .option('deep', {
    description: 'Deep search for package file(s). Alias for --package-file="**/package.json"',
    alias: 'r',
    type: 'boolean',
    default: isTrue(NCV_DEEP),
    hidden: false,
    deprecate: false,
    demandOption: false,
    requiresArg: false,
    skipValidation: false
})
    .option('proxy', {
    description: 'HTTP(S) proxy setting',
    alias: 'x',
    type: 'string',
    default: NCV_PROXY || undefined,
    deprecate: false,
    demandOption: false,
    requiresArg: true,
    skipValidation: false
})
    .option('lts', {
    description: 'Compare to LTS rather than the current version',
    alias: 'l',
    type: 'boolean',
    default: isTrue(NCV_LTS),
    hidden: false,
    deprecate: false,
    demandOption: false,
    requiresArg: false,
    skipValidation: false
})
    .env('')
    .parse(hideBin(argv));
//# sourceMappingURL=args.mjs.map