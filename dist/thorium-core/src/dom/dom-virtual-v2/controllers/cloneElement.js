"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneElement = void 0;
const createElement_1 = require("./createElement");
/** Crée une copie d'un élément virtuel existant. */
const cloneElement = (ve) => {
    return (0, createElement_1.createElement)(ve.patern.localName);
};
exports.cloneElement = cloneElement;
//# sourceMappingURL=cloneElement.js.map