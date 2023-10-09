import chalk from 'chalk';
import { Version } from './Version.mjs';
export const format = (releaseVersion, processVersion) => {
    const rVersion = Version.parse(releaseVersion);
    if (!rVersion) {
        return processVersion;
    }
    const pVersion = Version.parse(processVersion);
    if (!pVersion) {
        return processVersion;
    }
    const label = [
        'affix',
        'major',
        'minor',
        'patch',
        'sneak',
        'build'
    ].reduce((issue, key, index, keys) => {
        if (issue ||
            index === 0 ||
            rVersion[key] === pVersion[key] ||
            rVersion[key] === undefined ||
            pVersion[key] === undefined) {
            return issue;
        }
        const string = pVersion.toString();
        const length = keys
            .slice(0, index)
            .map((key) => pVersion[key]?.toString().length || 0)
            .reduce((sum, length) => sum + length, 0) + index - 1;
        const prefix = string.substring(0, length);
        const suffix = string.substring(length);
        const color = [
            'red',
            'cyan',
            'green',
            'bold',
            'bold'
        ][index - 1] || 'reset';
        return `${prefix}${chalk[color](suffix)}`;
    }, undefined);
    return label || processVersion;
};
//# sourceMappingURL=format.mjs.map