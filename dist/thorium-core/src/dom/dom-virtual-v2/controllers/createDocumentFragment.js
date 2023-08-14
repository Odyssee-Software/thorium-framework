"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocumentFragment = void 0;
const __1 = require("..");
const __2 = require("..");
/** Crée un fragment de document virtuel, qui peut être utilisé comme un conteneur temporaire pour d'autres éléments virtuels avant de les ajouter au DOM */
const createDocumentFragment = (elementId) => {
    if (!__1.DOMTokenList.has(elementId))
        return null;
    let recursiveMap = (virtualElement) => {
        let { patern } = virtualElement;
        let newPatern = Object.assign({}, patern);
        if (newPatern.childrens && newPatern.childrens.length > 0) {
            newPatern.childrens = Array.from(patern.childrens, (key) => {
                return recursiveMap((0, __2.getElementByElementId)(key));
            });
        }
        ;
        return newPatern;
    };
    let virtualElement = (0, __2.getElementByElementId)(elementId);
    return recursiveMap(virtualElement);
};
exports.createDocumentFragment = createDocumentFragment;
//# sourceMappingURL=createDocumentFragment.js.map