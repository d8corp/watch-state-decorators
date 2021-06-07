'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');

const e = new watchState.Event();
function event(target, propertyKey, descriptor) {
    return {
        value: function () {
            e.start();
            const result = descriptor.value.apply(this, arguments);
            e.end();
            return result;
        },
        enumerable: true
    };
}

exports.default = event;
exports.event = event;
