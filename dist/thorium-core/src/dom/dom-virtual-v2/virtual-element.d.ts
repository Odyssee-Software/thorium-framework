import { CssObject, CustomElement } from "../../design-system";
import { ConnectorTemplate } from "../../connector";
export interface ITemplateReference {
    localName: string;
    attr: ConnectorTemplate<any>['attr'];
    proto: ConnectorTemplate<any>['proto'];
    childrens?: string[];
    ref?: CustomElement<Element, {}> | HTMLElement;
}
export interface IVirtualElement {
    parent_key?: string;
    key: string;
    element?: CustomElement<HTMLElement, {}> | HTMLElement;
    patern: ITemplateReference;
}
export declare class VirtualElement implements IVirtualElement {
    parent_key: any;
    key: any;
    element: HTMLElement | CustomElement<HTMLElement, any>;
    patern: ITemplateReference;
    constructor(initOptions: IVirtualElement);
    /** Renvoie l'élément virtuel parent de l'élément virtuel */
    get parentNode(): any;
    /** Renvoie la liste des éléments virtuels enfants de l'élément virtuel */
    get childNodes(): VirtualElement[];
    /** Renvoie l'élément virtuel suivant (le frère suivant) de l'élément virtuel */
    get nextSibling(): void;
    /** Renvoie l'élément virtuel précédent (le frère précédent) de l'élément virtuel */
    get previousSibling(): void;
    /** Renvoie le nom de balise de l'élément virtuel */
    get tagName(): any;
    get childrens(): VirtualElement[];
    get children(): Record<string, VirtualElement> & {
        addKey(key: string): string;
        removeKey(key: string): void;
    };
    addEventListener: (eventName: any, callback: any) => any;
    render: () => void;
    appendChild: (child: VirtualElement) => void;
    remove: () => void;
    setAttribute: (attributeName: string, attributeValue: any) => void;
    getAttribute: (attributeName?: string) => string | (Record<string, string> | CssObject);
    getElementByElementId: (elementId: string) => VirtualElement;
    setProperty: (propertyName: string, value: any) => void;
    set innerHTML(value: string);
    clone(): VirtualElement;
}
