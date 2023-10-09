interface VersionValue {
  readonly affix?: string | undefined;
  readonly major?: number | undefined;
  readonly minor?: number | undefined;
  readonly patch?: number | undefined;
  readonly sneak?: string | undefined;
  readonly build?: string | undefined;
}

export class Version {

  protected value: VersionValue = {
    affix: undefined,
    major: undefined,
    minor: undefined,
    patch: undefined,
    sneak: undefined,
    build: undefined
  };

  constructor(value?: VersionValue) {
    const {affix, major, minor, patch, sneak, build} = {...this.value, ...value};
    this.affix = affix;
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.sneak = sneak;
    this.build = build;
  }

  get affix(): string | undefined {
    return this.value.affix;
  }

  set affix(value: string | undefined) {
    const affix = parsePrefix('affix', value);
    this.value = {...this.value, affix};
  }

  get major(): number | undefined {
    return this.value.major;
  }

  set major(value: string | number | undefined) {
    const major = parseInfix('major', value);
    this.value = {...this.value, major};
  }

  get minor(): number | undefined {
    return this.value.minor;
  }

  set minor(value: string | number | undefined) {
    const minor = parseInfix('minor', value);
    this.value = {...this.value, minor};
  }

  get patch(): number | undefined {
    return this.value.patch;
  }

  set patch(value: string | number | undefined) {
    const patch = parseInfix('patch', value);
    this.value = {...this.value, patch};
  }

  get sneak(): string | undefined {
    return this.value.sneak;
  }

  set sneak(value: string | undefined) {
    const sneak = parseSuffix('sneak', value);
    this.value = {...this.value, sneak};
  }

  get build(): string | undefined {
    return this.value.build;
  }

  set build(value: string | undefined) {
    const build = parseSuffix('build', value);
    this.value = {...this.value, build};
  }

  static parse(value: string): Version | undefined {
    const version = value.trim();
    if (!version || version === '*') {
      return new Version();
    }

    const pattern = /^([a-z]+)?(\d+)\.(\d+)\.(\d+)(?:-([^+\s]+))?(?:\+([^+\s]+))?$/i;
    const match = version.match(pattern) as [
      match: string,
      affix: string | undefined,
      major: string,
      minor: string,
      patch: string,
      sneak: string | undefined,
      build: string | undefined
    ] | null;
    if (!match) {
      return;
    }

    const [, affix, major, minor, patch, sneak, build] = match;
    return new Version({
      affix,
      major: major === 'x' ? undefined : parseFloat(major),
      minor: minor === 'x' ? undefined : parseFloat(minor),
      patch: patch === 'x' ? undefined : parseFloat(patch),
      sneak,
      build
    });
  }

  toString(): string {
    const affix = this.affix || '';
    const major = this.major ?? 'x';
    const minor = this.minor ?? 'x';
    const patch = this.patch ?? 'x';
    const sneak = this.sneak ? `-${this.sneak}` : '';
    const build = this.build ? `+${this.build}` : '';
    return `${affix}${major}.${minor}.${patch}${sneak}${build}`;
  }

  toJSON(): VersionValue {
    return this.value;
  }

  isEmpty(): boolean {
    return this.major === undefined && this.minor === undefined || this.patch === undefined;
  }

  isValid(): boolean {
    return this.major !== undefined && this.minor !== undefined || this.patch !== undefined;
  }

  isEqual(value: Version): boolean {
    return this.toString() === value.toString();
  }

  clone(): Version {
    return new Version(this.value);
  }
}

const parsePrefix = (
  name: 'affix',
  value: string | undefined
): string | undefined => {
  if (value === undefined) {
    return;
  }

  const string = value.trim();
  if (!string) {
    return;
  }
  if (string === 'v') {
    return string;
  }

  throw toError(name, value);
};

const parseInfix = (
  name: 'major' | 'minor' | 'patch',
  value: string | number | undefined
): number | undefined => {
  if (value === undefined) {
    return;
  }

  const string = isString(value)
    ? value
      .trim()
      .toLowerCase()
    : undefined;
  if (string === '' || string === 'x') {
    return;
  }
  if (string === '0') {
    return 0;
  }
  if (string?.startsWith('0')) {
    throw toError(name, value);
  }

  const number = string
    ? parseFloat(string)
    : value;
  if (isInteger(number) && number >= 0) {
    return number;
  }

  throw toError(name, value);
};

const isString = (
  value: unknown
): value is string => typeof value === 'string' || value instanceof String;

const isInteger = (
  value: unknown
): value is number => Number.isInteger(value);

const parseSuffix = (
  name: 'sneak' | 'build',
  value: string | undefined
): string | undefined => {
  if (value === undefined) {
    return;
  }

  const string = value.trim();
  const pattern = name === 'sneak'
    ? /^(?:0|[1-9]\d*|\d*[a-z-][\da-z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-z-][\da-z-]*))*$/i
    : /^[\da-z-]+(?:\.[\da-z-]+)*$/;
  if (pattern.test(string)) {
    return string;
  }

  throw toError(name, value);
};

const toError = (
  name: keyof VersionValue,
  value: string | number
): Error => new TypeError(`Invalid ${name} value "${value}"`);
