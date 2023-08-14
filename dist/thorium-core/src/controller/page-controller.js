"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageController = void 0;
const _1 = require(".");
function PageController(paternName, patern, T) {
    return class extends (0, _1.Controller)(paternName, patern, T) {
        connectedCallback() {
            if (this.parentNode.tagName == "BODY") {
                let { transactions, transactions_onload } = this.$Thorium;
                Array.from([...transactions_onload.values()], (transaction) => {
                    let template = transaction.template;
                    if (template.attr)
                        Array.from(Object.keys(template.attr), (attributeName) => {
                            if (attributeName == 'class')
                                this.classList.add(template.attr[attributeName]);
                            else if (attributeName == 'text')
                                this.innerText = template.attr[attributeName];
                            else
                                this.setAttribute(attributeName, template.attr[attributeName]);
                        });
                    if (template.proto)
                        Array.from(Object.keys(template.proto), (protoKey) => {
                            this[protoKey] = template.proto[protoKey];
                        });
                });
                if (this.afterMounting && !this.isMounted)
                    this.afterMounting(this);
                if (!this.isMounted)
                    this.isMounted = true;
            }
            else {
                alert('Page component have to be mounted on body');
                this.remove();
            }
        }
    };
}
exports.PageController = PageController;
//# sourceMappingURL=page-controller.js.map