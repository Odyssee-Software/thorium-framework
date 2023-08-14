import { register } from './register';
import { style, createStyleSheet, getStyleSheet } from './style';
export * from './register';
export * from './style';
declare const DesignSystem: () => {
    register: typeof register;
    style: typeof style;
    createStyleSheet: typeof createStyleSheet;
    getStyleSheet: typeof getStyleSheet;
};
export default DesignSystem;
