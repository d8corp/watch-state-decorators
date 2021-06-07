'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Cache = require('watch-state/Cache');
var getDecors = require('../getDecors/getDecors.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Cache__default = /*#__PURE__*/_interopDefaultLegacy(Cache);

function cache(target, propertyKey, descriptor) {
    const origin = descriptor.get;
    if (origin) {
        return {
            get() {
                const decorators = getDecors.getDecors(this);
                if (propertyKey in decorators) {
                    return decorators[propertyKey].value;
                }
                else {
                    return (decorators[propertyKey] = new Cache__default['default'](origin.bind(this), true)).value;
                }
            }
        };
    }
}

exports.cache = cache;
exports.default = cache;
