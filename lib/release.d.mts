export interface Release {
    version: string;
    date: string;
    files: ReadonlyArray<string>;
    npm?: string;
    v8: string;
    uv?: string;
    zlib?: string;
    openssl?: string;
    modules?: string;
    lts: string | boolean;
    security: boolean;
}
export declare const release: Release | undefined;
//# sourceMappingURL=release.d.mts.map