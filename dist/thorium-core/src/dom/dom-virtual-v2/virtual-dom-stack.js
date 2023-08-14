"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __addReferenceElement, __addMapReferenceElement, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.domStack = void 0;
const _1 = require(".");
function addReferenceElement() {
}
function addMapReferenceElement(referenceElements) {
    return [...referenceElements.values()].map((reference) => {
        if (reference.element == document.body)
            (0, _1.setBodyToken)(reference.key);
        return _1.DOMTokenList.set(reference.key, reference);
    });
}
const stack = new (_a = class {
        constructor() {
            __addReferenceElement.set(this, addReferenceElement.bind(this));
            __addMapReferenceElement.set(this, addMapReferenceElement.bind(this));
            this.execute = (operations) => {
                console.log('Virtual Stack Execution');
                return operations.reduce((arr, operation) => {
                    let { command, data } = operation;
                    // if(command == 'addElement')return this.#_addReferenceElement(data);
                    if (command == 'addMapElement')
                        return __classPrivateFieldGet(this, __addMapReferenceElement, "f").call(this, data);
                    return arr;
                }, []);
            };
        }
    },
    __addReferenceElement = new WeakMap(),
    __addMapReferenceElement = new WeakMap(),
    _a);
const domStack = () => {
    return stack;
};
exports.domStack = domStack;
//# sourceMappingURL=virtual-dom-stack.js.map