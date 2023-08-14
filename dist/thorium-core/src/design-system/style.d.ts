import postcss from 'postcss';
export interface CssObject {
    [x: string]: string | CssObject;
}
export declare const StyleSheets: Map<string, StylePatern>;
export type StylePatern = {
    token: string;
    cssObject: CssObject;
    result: ({
        token: string;
    } & postcss.Result);
};
export declare const style: (cssObject?: CssObject) => Promise<StylePatern['result']>;
export declare const createStyleSheet: (cssObject: CssObject) => Promise<StylePatern>;
export declare const getStyleSheet: (sheetToken: string) => StylePatern;
