const VALUES = Symbol('state values');
function getDecors(target) {
    if (!(VALUES in target)) {
        // @ts-expect-error: TODO
        target[VALUES] = {};
    }
    return target[VALUES];
}

export { getDecors };
