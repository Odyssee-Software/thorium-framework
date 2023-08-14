"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTextNode = void 0;
const createElement_1 = require("./createElement");
/** Crée un nouveau nœud de texte virtuel avec le contenu spécifié */
const createTextNode = (text) => {
    let ve = (0, createElement_1.createElement)('p');
    ve.setProperty('textContent', text);
    return ve;
};
exports.createTextNode = createTextNode;
//# sourceMappingURL=createTextNode.js.map