export type PreloadStack = PreloadModule<any>[] & {
    execute(): Promise<any[]>;
};
export interface PreloadModule<T = void> {
    main(): T;
}
export interface PreloadAPI {
    push(item: PreloadModule): PreloadStack['push'];
    execute: PreloadStack['execute'];
}
/**
 * The function returns the preload stack.
 * @returns the value of the variable `preloadStack`.
*/
export declare function preload(): PreloadAPI;
