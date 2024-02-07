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
/**
 * La fonction `preloadStyle` précharge un objet feuille de style CSS et renvoie un objet d'état avec
 * une fonction mutateur pour accéder aux styles.
 * @param cssObject - Le paramètre `cssObject` est un objet qui représente les styles CSS à précharger.
 * Il doit avoir la structure suivante :
 * @returns La fonction `preloadStyle` renvoie le premier élément du tableau `state.mutator`.
 */
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
/**
 * La fonction exporte un objet PagesAPI qui agit comme proxy pour l'objet Core.pages, permettant une
 * gestion personnalisée des événements onHashChange et onRenderPage.
 * @returns un objet Proxy qui encapsule l'objet `pages` du module `Core`. L'objet Proxy intercepte les
 * opérations d'accès aux propriétés et d'affectation sur l'objet `pages`. Si une propriété est accédée
 * et existe sur l'objet `pages`, elle est renvoyée. Si la propriété n'existe pas sur l'objet `pages`,
 * mais que la clé de propriété est "onHashChange"
 */
export declare function pages(): PagesAPI;
export * from "thorium-core";
export * from './element-state';
export { rootContext, applicationContext, pageContext } from "thorium-store-context";
export { uuid } from 'thorium-huid';
export default Thorium;
