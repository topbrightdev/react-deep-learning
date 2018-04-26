export function integral(n) {
    return `∫x^${n}dx = x^${n+1}/${n+1} + C`;
}

export function cubicRoot(x) {
    const cRoot = Math.cbrt(x);
    return `3√${x} = ${cRoot}`;
}

export function pow(x, n) {
    const powA = Math.pow(x, n);
    return `${x}^${n} = ${powA}`;
}