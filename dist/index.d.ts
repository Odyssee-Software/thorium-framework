import * as Context from 'thorium-store-context';
import * as UUID from 'thorium-huid';
declare namespace Thorium {
    const version = "2.0.0";
    const core: any;
    const context: typeof Context;
    const uuid: typeof UUID;
}
export declare const useState: <T>(key: string, value: T) => Context.IStoreState<T>;
export * from "thorium-core";
export * from "thorium-states";
export * from './element-state';
export { rootContext, applicationContext, pageContext } from "thorium-store-context";
export { uuid } from 'thorium-huid';
export default Thorium;
