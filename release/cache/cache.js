'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
require('../getDecors/index.js');
var getDecors = require('../getDecors/getDecors.js');

function cache(value, context) {
    const propertyKey = context.name;
    return function () {
        const decorators = getDecors.getDecors(this);
        if (propertyKey in decorators) {
            return decorators[propertyKey].value;
        }
        else {
            return (decorators[propertyKey] = new watchState.Cache(value.bind(this), true)).value;
        }
    };
}

exports.cache = cache;
