"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = void 0;
const __1 = require("../");
const virtual_element_1 = require("../virtual-element");
const createElement = (tagName) => {
    let elementUUID = crypto.randomUUID();
    let patern = {
        localName: tagName,
        attr: {},
        childrens: [],
        proto: {}
    };
    let ve = new virtual_element_1.VirtualElement({
        parent_key: (parent && '_id' in parent ? parent['_id'] : null),
        key: elementUUID,
        patern: patern
    });
    __1.DOMTokenList.set(elementUUID, ve);
    return __1.DOMTokenList.get(elementUUID);
};
exports.createElement = createElement;
//# sourceMappingURL=createElement.js.map