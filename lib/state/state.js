'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getDecors = require('../getDecors/getDecors.js');
var watchState = require('watch-state');

function state(target, propertyKey, desc) {
    const value = desc ? (desc.initializer ? desc.initializer() : desc.value) : undefined;
    return {
        get() {
            const values = getDecors.getDecors(this);
            if (!values[propertyKey]) {
                values[propertyKey] = new watchState.State(value);
            }
            return values[propertyKey].value;
        },
        set(v) {
            const values = getDecors.getDecors(this);
            if (propertyKey in values) {
                values[propertyKey].value = v;
            }
            else {
                values[propertyKey] = new watchState.State(v);
            }
        },
        enumerable: true
    };
}

exports.default = state;
exports.state = state;
