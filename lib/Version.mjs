export class Version {
    value = {
        affix: undefined,
        major: undefined,
        minor: undefined,
        patch: undefined,
        sneak: undefined,
        build: undefined
    };
    constructor(value) {
        const { affix, major, minor, patch, sneak, build } = { ...this.value, ...value };
        this.affix = affix;
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.sneak = sneak;
        this.build = build;
    }
    get affix() {
        return this.value.affix;
    }
    set affix(value) {
        const affix = parsePrefix('affix', value);
        this.value = { ...this.value, affix };
    }
    get major() {
        return this.value.major;
    }
    set major(value) {
        const major = parseInfix('major', value);
        this.value = { ...this.value, major };
    }
    get minor() {
        return this.value.minor;
    }
    set minor(value) {
        const minor = parseInfix('minor', value);
        this.value = { ...this.value, minor };
    }
    get patch() {
        return this.value.patch;
    }
    set patch(value) {
        const patch = parseInfix('patch', value);
        this.value = { ...this.value, patch };
    }
    get sneak() {
        return this.value.sneak;
    }
    set sneak(value) {
        const sneak = parseSuffix('sneak', value);
        this.value = { ...this.value, sneak };
    }
    get build() {
        return this.value.build;
    }
    set build(value) {
        const build = parseSuffix('build', value);
        this.value = { ...this.value, build };
    }
    static parse(value) {
        const version = value.trim();
        if (!version || version === '*') {
            return new Version();
        }
        const pattern = /^([a-z]+)?(\d+)\.(\d+)\.(\d+)(?:-([^+\s]+))?(?:\+([^+\s]+))?$/i;
        const match = version.match(pattern);
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
    toString() {
        const affix = this.affix || '';
        const major = this.major ?? 'x';
        const minor = this.minor ?? 'x';
        const patch = this.patch ?? 'x';
        const sneak = this.sneak ? `-${this.sneak}` : '';
        const build = this.build ? `+${this.build}` : '';
        return `${affix}${major}.${minor}.${patch}${sneak}${build}`;
    }
    toJSON() {
        return this.value;
    }
    isEmpty() {
        return this.major === undefined && this.minor === undefined || this.patch === undefined;
    }
    isValid() {
        return this.major !== undefined && this.minor !== undefined || this.patch !== undefined;
    }
    isEqual(value) {
        return this.toString() === value.toString();
    }
    clone() {
        return new Version(this.value);
    }
}
const parsePrefix = (name, value) => {
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
const parseInfix = (name, value) => {
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
const isString = (value) => typeof value === 'string' || value instanceof String;
const isInteger = (value) => Number.isInteger(value);
const parseSuffix = (name, value) => {
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
const toError = (name, value) => new TypeError(`Invalid ${name} value "${value}"`);
//# sourceMappingURL=Version.mjs.map