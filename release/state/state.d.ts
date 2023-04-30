import { State } from 'watch-state';
export type StateValues = Record<string, State>;
export declare function state<This, Value = unknown>(value: ClassAccessorDecoratorTarget<This, Value>, context: ClassAccessorDecoratorContext<This, Value>): {
    get(this: any): any;
    set(this: any, val: any): void;
    init(initialValue: any): any;
};
