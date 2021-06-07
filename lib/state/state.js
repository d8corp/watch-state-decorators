'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getDecors = require('../getDecors/getDecors.js');
var State = require('watch-state/State');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var State__default = /*#__PURE__*/_interopDefaultLegacy(State);

function state(target, propertyKey, desc) {
    const value = desc ? (desc.initializer ? desc.initializer() : desc.value) : undefined;
    return {
        get() {
            const values = getDecors.getDecors(this);
            if (!values[propertyKey]) {
                values[propertyKey] = new State__default['default'](value);
            }
            return values[propertyKey].value;
        },
        set(v) {
            const values = getDecors.getDecors(this);
            if (propertyKey in values) {
                values[propertyKey].value = v;
            }
            else {
                values[propertyKey] = new State__default['default'](v);
            }
        },
        enumerable: true
    };
}

exports.default = state;
exports.state = state;
