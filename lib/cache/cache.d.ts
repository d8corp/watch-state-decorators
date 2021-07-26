interface CachePropertyDescriptor {
    get?: () => any;
    set?: (value: any) => void;
}
export declare function cache(target: object, propertyKey: string, descriptor: CachePropertyDescriptor): CachePropertyDescriptor;
export {};
