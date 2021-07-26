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
        let run = target[propertyKey];
        function getter() {
            globalEvent.start();
            const result = run.apply(this, arguments);
            globalEvent.end();
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

export { event };
