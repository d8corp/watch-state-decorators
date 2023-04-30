import { State } from 'watch-state';
import '../getDecors/index.es6.js';
import { getDecors } from '../getDecors/getDecors.es6.js';

function state(value, context) {
    const propertyKey = context.name;
    return {
        get() {
            return getDecors(this)[propertyKey].value;
        },
        set(val) {
            getDecors(this)[propertyKey].value = val;
        },
        init(initialValue) {
            const values = getDecors(this);
            values[propertyKey] = new State(initialValue);
            return initialValue;
        },
    };
}

export { state };
