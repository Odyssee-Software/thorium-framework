import { ConnectorTemplate } from '.';
import { NodeTemplate } from '../dom';
export declare const RootPage: (options: ConnectorTemplate<any>) => NodeTemplate<unknown>;
type PageInitOptions = ConnectorTemplate<any> & {
    name: string;
};
export declare const Page: (options: PageInitOptions) => NodeTemplate<unknown>;
export declare const PageLink: (props: {
    to: string;
    title: string;
}) => NodeTemplate<any>;
export declare const PageRouter: (props?: {
    pages: NodeTemplate<any>[];
} | {}) => NodeTemplate<any>[];
export {};
