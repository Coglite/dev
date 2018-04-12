export const flagValue = (key: string) => {
    const index = process
        .argv.indexOf(key);
    if (index === -1) {
        return null;
    }
    return process.argv[index + 1];
};

export const hasFlag = (flag: string) =>
    process.argv.indexOf(flag) !== -1;