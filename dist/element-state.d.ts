import { State } from "../modules/states";
import { IConnectorTemplate, INodeTemplate } from "thorium-core";
export declare const elementState: <T>(data: any) => [State<T>, (value: T) => T, (template?: (IConnectorTemplate<HTMLParagraphElement> & {
    localName?: 'span' | 'input';
})) => INodeTemplate<HTMLSpanElement>];
