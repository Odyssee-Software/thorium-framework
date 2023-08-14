"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementByElementId = void 0;
const __1 = require("..");
const getElementByElementId = (elementId) => {
    return (__1.DOMTokenList.has(elementId) ? __1.DOMTokenList.get(elementId) : null);
};
exports.getElementByElementId = getElementByElementId;
//# sourceMappingURL=getElementByElementId.js.map