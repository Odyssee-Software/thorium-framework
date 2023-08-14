"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInnerHTML = void 0;
const removeElement_1 = require("./removeElement");
const html_transform_1 = require("../html-transform");
const createNodeElement_1 = require("./createNodeElement");
/** Définit le contenu HTML d'un élément virtuel */
const setInnerHTML = (ve, html) => {
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(html, "text/html");
    let content = parsedDocument.body.children[0];
    // netoyage des enfants
    ve.childrens.forEach((childVeElement) => {
        (0, removeElement_1.removeElement)(childVeElement);
    });
    if (content) {
        let _nodeTemplate = (0, html_transform_1.htmlToNodeTemplate)(content);
        (0, createNodeElement_1.createNodeElement)(_nodeTemplate, ve.element);
    }
    else
        ve.element.innerHTML = html;
};
exports.setInnerHTML = setInnerHTML;
//# sourceMappingURL=setInnerHTML.js.map