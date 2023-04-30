'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');

function event(target, context) {
    return context.kind === 'field' ? watchState.createEvent : watchState.createEvent(target);
}

exports.event = event;
