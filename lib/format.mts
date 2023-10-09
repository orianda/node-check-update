import chalk from 'chalk';
import {Version} from './Version.mjs';

export const format = (
  releaseVersion: string,
  processVersion: string
): string => {
  const rVersion = Version.parse(releaseVersion);
  if (!rVersion) {
    return processVersion;
  }

  const pVersion = Version.parse(processVersion);
  if (!pVersion) {
    return processVersion;
  }

  const label = [
    'affix' as const,
    'major' as const,
    'minor' as const,
    'patch' as const,
    'sneak' as const,
    'build' as const
  ].reduce<string | undefined>((issue, key, index, keys) => {
    if (
      issue ||
      index === 0 ||
      rVersion[key] === pVersion[key] ||
      rVersion[key] === undefined ||
      pVersion[key] === undefined
    ) {
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
      'red' as const,
      'cyan' as const,
      'green' as const,
      'bold' as const,
      'bold' as const
    ][index - 1] || 'reset';
    return `${prefix}${chalk[color](suffix)}`;
  }, undefined);

  return label || processVersion;
};
