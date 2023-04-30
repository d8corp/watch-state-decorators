'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
require('../getDecors/index.js');
var getDecors = require('../getDecors/getDecors.js');

function state(value, context) {
    const propertyKey = context.name;
    return {
        get() {
            return getDecors.getDecors(this)[propertyKey].value;
        },
        set(val) {
            getDecors.getDecors(this)[propertyKey].value = val;
        },
        init(initialValue) {
            const values = getDecors.getDecors(this);
            values[propertyKey] = new watchState.State(initialValue);
            return initialValue;
        },
    };
}

exports.state = state;
