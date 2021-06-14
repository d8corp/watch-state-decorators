import { Watcher } from 'watch-state';
declare type Target<P extends string = string> = object & Record<P, Watcher>;
export declare function watch<P extends string = string>(target: Target<P>, propertyKey: P): any;
export default watch;
