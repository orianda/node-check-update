interface VersionValue {
    readonly affix?: string | undefined;
    readonly major?: number | undefined;
    readonly minor?: number | undefined;
    readonly patch?: number | undefined;
    readonly sneak?: string | undefined;
    readonly build?: string | undefined;
}
export declare class Version {
    protected value: VersionValue;
    constructor(value?: VersionValue);
    get affix(): string | undefined;
    set affix(value: string | undefined);
    get major(): number | undefined;
    set major(value: string | number | undefined);
    get minor(): number | undefined;
    set minor(value: string | number | undefined);
    get patch(): number | undefined;
    set patch(value: string | number | undefined);
    get sneak(): string | undefined;
    set sneak(value: string | undefined);
    get build(): string | undefined;
    set build(value: string | undefined);
    static parse(value: string): Version | undefined;
    toString(): string;
    toJSON(): VersionValue;
    isEmpty(): boolean;
    isValid(): boolean;
    isEqual(value: Version): boolean;
    clone(): Version;
}
export {};
//# sourceMappingURL=Version.d.mts.map