'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Watch = require('watch-state/Watch');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Watch__default = /*#__PURE__*/_interopDefaultLegacy(Watch);

function watch(target, propertyKey) {
    const origin = target[propertyKey];
    return {
        value() {
            return new Watch__default['default'](origin.bind(this));
        },
        enumerable: true
    };
}

exports.default = watch;
exports.watch = watch;
