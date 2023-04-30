import { createEvent } from 'watch-state';

function event(target, context) {
    return context.kind === 'field' ? createEvent : createEvent(target);
}

export { event };
