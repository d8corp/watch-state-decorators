import { type Cache, type State } from 'watch-state';
interface Types<V = any> {
    state: State<V>;
    cache: Cache<V>;
}
type Key = string | number | symbol;
type Mapping<K extends Key = Key> = Record<K, keyof Types>;
export type Target<K extends Key = Key> = Record<K, any>;
export type Decors<K extends Mapping, T extends Target<keyof K>> = {
    [key in keyof K]: Types<T[key]>[K[key]];
};
export declare function getDecors<K extends Mapping, T extends Target = any>(target: T): Decors<K, T>;
export {};
