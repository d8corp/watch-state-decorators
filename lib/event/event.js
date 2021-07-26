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
        let run = target[propertyKey];
        function getter() {
            watchState.globalEvent.start();
            const result = run.apply(this, arguments);
            watchState.globalEvent.end();
            return result;
        }
        Object.defineProperty(target, propertyKey, {
            get() {
                return run ? getter : run;
            },
            set(runner) {
                run = runner;
            }
        });
    }
}

exports.event = event;
