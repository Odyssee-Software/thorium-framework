import { CssObject, PageHandler, StyleProxy } from "thorium-core";
import * as Context from 'thorium-store-context';
import * as UUID from 'thorium-huid';
import { TState } from 'thorium-states';
import { preload, PreloadStack, PreloadModule } from './preload';
export { preload, PreloadStack, PreloadModule, };
declare namespace Thorium {
    const version = "2.0.0";
    const core: any;
    const context: typeof Context;
    const uuid: typeof UUID;
}
export declare function preloadStyle<T extends string[]>(cssObject: CssObject<T>): TState<StyleProxy<T>>;
/**
 * The `useState` function is a TypeScript function that sets a value in the root context and returns
 * the updated state.
 * @param {string} key - The key parameter is a string that represents the key under which the value
 * will be stored in the state.
 * @param {T} value - The `value` parameter is the initial value that you want to set for the state
 * variable. It can be of any type, as it is defined as a generic type `<T>`.
 * @returns the value of `rootContext().set(key, value)` casted as `IStoreState<T>`.
 */
export declare const useState: <T>(key: string, value: T) => Context.IStoreState<T>;
export interface PagesAPI extends PageHandler {
    onHashChange(): void;
    onRenderPage(): void;
}
export declare function pages(): PagesAPI;
export * from "thorium-core";
export * from './element-state';
export { rootContext, applicationContext, pageContext } from "thorium-store-context";
export { uuid } from 'thorium-huid';
export default Thorium;