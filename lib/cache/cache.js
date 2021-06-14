'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
var getDecors = require('../getDecors/getDecors.js');

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
                    return (decorators[propertyKey] = new watchState.Cache(origin.bind(this), true)).value;
                }
            }
        };
    }
}

exports.cache = cache;
exports.default = cache;
