import { State } from "thorium-states";
import { ConnectorTemplate, NodeTemplate } from "thorium-core";
export declare const elementState: <T>(data: any) => [State<T>, (value: T) => T, (template?: (ConnectorTemplate<HTMLParagraphElement> & {
    localName?: 'span' | 'input';
})) => NodeTemplate<HTMLSpanElement>];
