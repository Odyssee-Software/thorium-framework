import { NodeTemplate } from "./dom-render";
export * from "./dom-render";
import * as VDOM from "./dom-virtual-v2";
/**
 * # DOM
 */
export declare const DOM: {
    onload: any;
    loading: (callback: () => void) => void;
    /**
     * La fonction `render` permet de rendre un `NodeTemplate` dans le DOM réel.
     * @function render
     * @memberof DOM
     * @param {NodeTemplate} template - Le template à rendre.
    */
    render: <T>(template: NodeTemplate<T>, parentNode?: Element | ShadowRoot) => T;
    /**
     * La classe `virtual` permet de créer et manipuler un DOM virtuel.
     * @class virtual
     * @memberof DOM
    */
    virtual: typeof VDOM;
};
