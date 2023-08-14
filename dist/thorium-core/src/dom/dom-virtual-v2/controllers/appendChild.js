"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendChild = void 0;
const dom_render_1 = require("../../dom-render");
/** Ajoute un élément virtuel enfant à un élément virtuel parent */
const appendChild = (parent, child) => {
    if ('patern' in parent == false)
        return;
    else if ('childrens' in parent.patern == false)
        parent.patern.childrens = [];
    if (!parent.patern.childrens.includes(child.key)) {
        child.element = (0, dom_render_1.DOMRender)(child.patern, parent.element);
        child.element['_id'] = child.key;
        child['parent_key'] = parent.key;
        child.element['parent_id'] = parent.key;
        parent.patern.childrens.push(child.key);
    }
};
exports.appendChild = appendChild;
//# sourceMappingURL=appendChild.js.map