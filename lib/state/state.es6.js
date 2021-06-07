import { getDecors } from '../getDecors/getDecors.es6.js';
import State from 'watch-state/State';

function state(target, propertyKey, desc) {
    const value = desc ? (desc.initializer ? desc.initializer() : desc.value) : undefined;
    return {
        get() {
            const values = getDecors(this);
            if (!values[propertyKey]) {
                values[propertyKey] = new State(value);
            }
            return values[propertyKey].value;
        },
        set(v) {
            const values = getDecors(this);
            if (propertyKey in values) {
                values[propertyKey].value = v;
            }
            else {
                values[propertyKey] = new State(v);
            }
        },
        enumerable: true
    };
}

export default state;
export { state };
