export const tryGet = <T>(getter: () => T, defaultValue: T, onError?: (e: Error) => void) => {
    onError = typeof onError === "function" ? onError : ((e) => {
        if (process.env.NODE_ENV !== "production") {
            console.error(e);
        }
    });
    try {
        return getter();
    } catch (e) {
        onError(e);
        return defaultValue;
    }
};