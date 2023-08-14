import { NodeTemplate } from "../dom/dom-render";
import { CssObject } from "../design-system/style";
export type AttributePropertie = 'id' | 'class' | 'name' | 'local-name' | 'context' | 'style' | 'stylesheet' | string;
export interface ConnectorTemplate<T> {
    /** Attributs du component */
    attr?: Record<AttributePropertie, string | CssObject>;
    /** Enfants du component */
    childrens?: NodeTemplate<any>[];
    /** Méthodes et variables du component */
    proto?: Partial<T>;
}
export * from './page';
export declare const Connector: <T>(localName: string) => (connectorTemplate?: ConnectorTemplate<T>) => {
    localName: string;
    attr: Record<string, string | CssObject>;
    childrens: NodeTemplate<any>[];
    proto: {};
};
