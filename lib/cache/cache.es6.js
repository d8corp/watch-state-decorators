import { Cache } from 'watch-state';
import { getDecors } from '../getDecors/getDecors.es6.js';

function cache(target, propertyKey, descriptor) {
    const origin = descriptor.get;
    if (origin) {
        return {
            get() {
                const decorators = getDecors(this);
                if (propertyKey in decorators) {
                    return decorators[propertyKey].value;
                }
                else {
                    return (decorators[propertyKey] = new Cache(origin.bind(this), true)).value;
                }
            }
        };
    }
}

export { cache };
