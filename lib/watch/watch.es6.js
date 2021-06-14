import { Watch } from 'watch-state';

function watch(target, propertyKey) {
    const origin = target[propertyKey];
    return {
        value() {
            return new Watch(origin.bind(this));
        },
        enumerable: true
    };
}

export default watch;
export { watch };
