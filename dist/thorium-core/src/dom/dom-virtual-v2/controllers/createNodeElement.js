"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNodeElement = void 0;
const virtual_element_1 = require("../virtual-element");
const dom_render_1 = require("../../dom-render");
const getElementByElementId_1 = require("./getElementByElementId");
const __1 = require("../");
const createNodeElement = (template, parent) => {
    let elementUUID = crypto.randomUUID().toString();
    let virtualParent = parent && '_id' in parent ? (0, getElementByElementId_1.getElementByElementId)(parent['_id']) : null;
    let ref = new virtual_element_1.VirtualElement({
        parent_key: (parent && parent['_id'] ? parent['_id'] : null),
        key: elementUUID,
        patern: {
            localName: template.localName,
            attr: template.attr,
            proto: template.proto
        }
    });
    ref.element = (0, dom_render_1.DOMRender)(ref.patern, parent);
    ref.element['_id'] = ref.key;
    if (virtualParent)
        console.warn({ parent_key: virtualParent.key });
    if (virtualParent)
        ref.element['parent_id'] = virtualParent.key;
    if (virtualParent)
        virtualParent.children.addKey(ref.key);
    if (template.childrens && template.childrens.length > 0)
        ref.patern.childrens = Array.from(template.childrens, (template) => {
            return (0, exports.createNodeElement)(template, ref.element);
        });
    __1.DOMTokenList.set(ref.key, ref);
    return ref.key;
};
exports.createNodeElement = createNodeElement;
//# sourceMappingURL=createNodeElement.js.map