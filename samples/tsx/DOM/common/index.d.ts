import { CustomElement, NodeTemplate } from 'thorium-framework';
/**
 * Dans cette exemple nous allons voir les bases de la manipulation DOM avec thorium
*/
/** Création d'un component custom */
interface MyElementControls {
    /** Méthode custom , elle lancera une alerte */
    printAlert(): void;
}
type MyCustomElement = CustomElement<MyElementControls, HTMLDivElement>;
export declare let MyComponent: () => NodeTemplate<MyCustomElement>;
export {};
