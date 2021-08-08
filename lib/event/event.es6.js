import { globalEvent } from 'watch-state';

function event(target, propertyKey, descriptor) {
    if (descriptor) {
        return {
            value: function () {
                globalEvent.start();
                const result = descriptor.value.apply(this, arguments);
                globalEvent.end();
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
                    globalEvent.start();
                    const result = runner(...args);
                    globalEvent.end();
                    return result;
                };
            }
        });
    }
}

export { event };
