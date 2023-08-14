"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDOMTokenList = exports.prepare_addMapElement = exports.DOMTokenList = exports.getBody = exports.setBodyToken = exports.bodyToken = void 0;
const virtual_dom_stack_1 = require("./virtual-dom-stack");
const virtual_element_1 = require("./virtual-element");
const controllers_1 = require("./controllers");
__exportStar(require("./controllers"), exports);
__exportStar(require("./virtual-element"), exports);
/** Contient le token ( référence virtuelle du body ) */
exports.bodyToken = null;
const setBodyToken = (value) => {
    exports.bodyToken = value;
};
exports.setBodyToken = setBodyToken;
const getBody = () => {
    return exports.bodyToken ? (0, controllers_1.getElementByElementId)(exports.bodyToken) : null;
};
exports.getBody = getBody;
exports.DOMTokenList = new Map();
const prepare_addMapElement = (data) => {
    return {
        command: 'addMapElement',
        data: data
    };
};
exports.prepare_addMapElement = prepare_addMapElement;
const mapDOMTokenList = (target) => {
    let mapElement = (src, parentKey) => {
        let templateReference = {
            localName: ('patern' in src ? src.patern.localName : null),
            attr: ('patern' in src ? src.patern.attr : null),
            proto: ('patern' in src ? src.patern.proto : null),
            ref: src
        };
        let key = crypto.randomUUID();
        if (src.children.length > 0)
            return [Object.assign({ element: src, patern: templateReference, key }, (parentKey ? { parent_key: parentKey } : {})), ...Array.from(src.children, (element) => {
                    return mapElement(element, key).flat();
                }).flat()
            ];
        else
            return [Object.assign({ element: src, patern: templateReference, key }, (parentKey ? { parent_key: parentKey } : {}))];
    };
    if (!target)
        return new Map();
    let mapResult = mapElement(target);
    let mapReduce = new Map(mapResult.reduce((arr, data) => {
        // let key = crypto.randomUUID();
        let key = data.key;
        arr.push([key, new virtual_element_1.VirtualElement(data)]);
        return arr;
    }, []));
    return mapReduce;
};
exports.mapDOMTokenList = mapDOMTokenList;
let result = (0, virtual_dom_stack_1.domStack)().execute([
    (0, exports.prepare_addMapElement)((0, exports.mapDOMTokenList)(document.body))
]);
console.log({ result });
//# sourceMappingURL=index.js.map