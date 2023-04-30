import { Cache } from 'watch-state';
import '../getDecors/index.es6.js';
import { getDecors } from '../getDecors/getDecors.es6.js';

function cache(value, context) {
    const propertyKey = context.name;
    return function () {
        const decorators = getDecors(this);
        if (propertyKey in decorators) {
            return decorators[propertyKey].value;
        }
        else {
            return (decorators[propertyKey] = new Cache(value.bind(this), true)).value;
        }
    };
}

export { cache };
