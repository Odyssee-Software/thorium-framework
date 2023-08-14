"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProperty = void 0;
const setProperty = (ve, propertyName, value) => {
    ve.patern.proto[propertyName] = value;
    if (ve.element)
        ve.element[propertyName] = value;
};
exports.setProperty = setProperty;
//# sourceMappingURL=setProperty.js.map