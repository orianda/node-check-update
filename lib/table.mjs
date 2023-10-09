import stripAnsi from 'strip-ansi';
export const table = (body, cols, head, foot) => {
    const rows = [head, foot, ...body]
        .map((row) => row && cols.reduce((issue, col) => {
        const value = row?.[col.name]?.toString();
        const length = value ? stripAnsi(value).length : 0;
        issue[col.name] = { value, length };
        return issue;
    }, {}));
    const sizes = cols
        .map((col) => rows
        .reduce((maxLength, row) => Math.max(maxLength, row?.[col.name]?.length || 0), 0));
    const print = (row, fillString = ' ') => {
        const line = cols
            .map((col, index) => {
            const cell = row[col.name];
            const value = cell?.value || '';
            const length = cell?.length || 0;
            const size = sizes[index];
            const diff = Math.max(size || 0, col.minWidth || 0) - length;
            const prefixLength = col.align === 'left' ? 0 : col.align === 'right' ? diff : Math.round(diff / 2);
            const prefix = fillString.repeat(prefixLength);
            const suffix = fillString.repeat(diff - prefixLength);
            const paddingLeft = fillString.repeat(col.paddingLeft ?? col.padding ?? 0);
            const paddingRight = fillString.repeat(col.paddingRight ?? col.padding ?? 0);
            return `${paddingLeft}${prefix}${value}${suffix}${paddingRight}`;
        })
            .join(fillString);
        console.info(line);
    };
    const [headRow, footRow, ...bodyRows] = rows;
    print({});
    if (headRow) {
        print(headRow);
        print({}, '-');
    }
    bodyRows.forEach((row) => row && print(row));
    if (footRow) {
        print({}, '=');
        print(footRow);
    }
    print({});
};
//# sourceMappingURL=table.mjs.map