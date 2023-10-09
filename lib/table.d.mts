interface Col<T> {
    name: keyof T;
    align: 'left' | 'right' | 'center';
    padding?: number;
    paddingLeft?: number;
    paddingRight?: number;
    minWidth?: number;
}
export declare const table: <T extends object>(body: readonly T[], cols: readonly Col<T>[], head?: T | undefined, foot?: T | undefined) => void;
export {};
//# sourceMappingURL=table.d.mts.map