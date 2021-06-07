import { Event } from 'watch-state';

const e = new Event();
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

export default event;
export { event };
