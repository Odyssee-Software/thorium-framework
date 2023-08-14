"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChildNodes = void 0;
const __1 = require("../");
/** Renvoie la liste des éléments virtuels enfants d'un élément virtuel donné */
const getChildNodes = (ve) => {
    if ('patern' in ve == false)
        return [];
    else if ('childrens' in ve.patern == false)
        return [];
    else
        return Array.from(ve.patern.childrens, (key) => {
            return __1.DOMTokenList.get(key);
        });
};
exports.getChildNodes = getChildNodes;
//# sourceMappingURL=getChildNodes.js.map