'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const VALUES = Symbol('state values');
function getDecors(target) {
    if (!(VALUES in target)) {
        // @ts-expect-error: TODO
        target[VALUES] = {};
    }
    return target[VALUES];
}

exports.getDecors = getDecors;
