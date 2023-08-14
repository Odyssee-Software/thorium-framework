import { State } from "../../thorium-states/src";
import { ConnectorTemplate, NodeTemplate } from "../../thorium-core/src";
export declare const elementState: <T>(data: any) => [State<T>, (value: T) => T, (template?: (ConnectorTemplate<HTMLParagraphElement> & {
    localName?: 'span' | 'input';
})) => NodeTemplate<HTMLSpanElement>];
