const evalBanned = () => {
    throw new Error("Calling eval is disabled - common/extensions.");
};

if (typeof window !== "undefined") {
    (window as any).eval = evalBanned;
}

if (typeof global !== "undefined") {
    global.eval = evalBanned;
}
