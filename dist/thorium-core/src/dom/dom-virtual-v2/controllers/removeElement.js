"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeElement = void 0;
const getElementByElementId_1 = require("./getElementByElementId");
const __1 = require("../");
const removeElement = (virtualElement) => {
    // Childrens du virtualElement
    let childrens = (virtualElement.patern.childrens ? virtualElement.patern.childrens.reduce((arr, key) => {
        arr.push((0, getElementByElementId_1.getElementByElementId)(key));
        return arr;
    }, []) : []);
    let parent = (0, getElementByElementId_1.getElementByElementId)(virtualElement.parent_key);
    if (parent)
        parent.children.removeKey(virtualElement.key);
    childrens.forEach((ve) => {
        (0, exports.removeElement)(ve);
    });
    virtualElement.element.remove();
    __1.DOMTokenList.delete(virtualElement.key);
};
exports.removeElement = removeElement;
//# sourceMappingURL=removeElement.js.map