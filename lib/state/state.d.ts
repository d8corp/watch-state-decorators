import { State } from 'watch-state';
export interface StateValues {
    [key: string]: State;
}
export declare function state(target: Object, propertyKey: string, desc?: any): any;
