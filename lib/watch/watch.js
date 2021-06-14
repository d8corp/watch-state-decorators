'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');

function watch(target, propertyKey) {
    const origin = target[propertyKey];
    return {
        value() {
            return new watchState.Watch(origin.bind(this));
        },
        enumerable: true
    };
}

exports.default = watch;
exports.watch = watch;
