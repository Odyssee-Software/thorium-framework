import { CustomElement } from "../../design-system";
import { IOperation } from "./virtual-dom-stack";
import { VirtualElement } from './virtual-element';
export * from './controllers';
export * from './virtual-element';
/** Contient le token ( référence virtuelle du body ) */
export declare var bodyToken: any;
export declare const setBodyToken: (value: string) => void;
export declare const getBody: () => VirtualElement;
export declare const DOMTokenList: TMapDomTokenList;
export declare const prepare_addMapElement: (data: any) => IOperation;
export type TMapDomTokenList = Map<string, VirtualElement>;
export declare const mapDOMTokenList: (target: CustomElement<Element, {}> | HTMLElement) => TMapDomTokenList;
