'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');

function event(target, propertyKey, descriptor) {
    if (descriptor) {
        return {
            value: function () {
                watchState.globalEvent.start();
                const result = descriptor.value.apply(this, arguments);
                watchState.globalEvent.end();
                return result;
            },
            enumerable: true
        };
    }
    else {
        const EVENT = Symbol('event');
        Object.defineProperty(target, propertyKey, {
            get() {
                return this[EVENT];
            },
            set(runner) {
                this[EVENT] = (...args) => {
                    watchState.globalEvent.start();
                    const result = runner(...args);
                    watchState.globalEvent.end();
                    return result;
                };
            }
        });
    }
}

exports.event = event;
