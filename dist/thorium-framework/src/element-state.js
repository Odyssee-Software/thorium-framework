"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementState = void 0;
const src_1 = require("../../thorium-states/src");
const elementState = (data) => {
    let [state, callback] = (0, src_1.useState)(data);
    let stateElement = (template) => {
        let localName = (template && template.localName ? template.localName : 'span');
        return {
            localName: localName,
            attr: Object.assign({}, (template && template.attr ? template.attr : (localName == 'span' ? { text: state.value } : {}))),
            childrens: [...(template && template.childrens ? template.childrens : [])],
            proto: Object.assign({}, (template && template.proto ? template.proto : Object.assign(Object.assign({}, (localName == 'input' ? { value: state.value } : {})), { afterMounting(target) {
                    if (localName == 'span')
                        target.textContent = state.value;
                    if (localName == 'input')
                        target.value = state.value;
                    state.subscribe(target, (value) => {
                        if (localName == 'span')
                            target.textContent = `${value}`;
                        if (localName == 'input')
                            target.value = `${value}`;
                    });
                } })))
        };
    };
    return [state, callback, stateElement];
};
exports.elementState = elementState;
//# sourceMappingURL=element-state.js.map