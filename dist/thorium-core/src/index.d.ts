import RouteRecognizer from 'route-recognizer';
import DesignSystem from './design-system';
import { DOM, NodeTemplate } from './dom';
export * from './connector';
export * from './design-system';
export * from './dom';
export * from './controller';
declare class Page {
    #private;
    constructor(component: any);
    /**
     * Build the page
     */
    show(): void;
}
export interface Route {
    name: string;
    component: any;
}
export declare class PageHandler extends RouteRecognizer {
    #private;
    get list(): {
        [k: string]: any;
    };
    /**
     * Define the endpoint of the page
     * @param pageOption
     * @returns
     */
    set(pageOption: Route): Page;
    render(pagePath: string): void;
}
declare namespace Core {
    const router: () => typeof RouteRecognizer;
    var Page: any;
    const pages: PageHandler;
}
export default Core;
export { DesignSystem, NodeTemplate, DOM };
