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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const htmlTags = __importStar(require("html-tags"));
const dom_render_1 = require("../dom/dom-render");
const controller_1 = require("../controller");
const transactions_1 = require("../controller/transactions");
/**
 * Enregistre un composant personnalisé dans le registre des composants.
 *
 * @param type - Le type du composant personnalisé. Peut être "page", "thorium", "local" ou "views".
 * @param patern - Le modèle de conception du composant personnalisé à enregistrer.
 * @returns Le constructeur de l'élément personnalisé enregistré.
 */
const register = (type, patern) => {
    var _a;
    let paternName = `${type}-${patern.baseName}`;
    const isUnknownElement = () => {
        let tags = Object.values(htmlTags);
        return !tags.includes(patern.baseName);
    };
    if (!isUnknownElement() && type == 'local') {
        const constructor = document.createElement(patern.baseName).__proto__.constructor.name;
        if (!customElements.get(paternName))
            customElements.define(paternName, (_a = class extends (0, controller_1.ThoriumController)(paternName, patern, window[constructor]) {
                    constructor() {
                        super();
                        if (patern.attr)
                            Array.from(Object.keys(patern.attr), (attributeName) => {
                                this.setAttribute(attributeName, patern.attr[attributeName]);
                            });
                        if (patern.childrens) {
                            const shadow = this.attachShadow({ mode: 'open' });
                            Array.from(patern.childrens, (children) => {
                                (0, dom_render_1.DOMRender)(children, shadow);
                            });
                        }
                        if (patern.proto)
                            Array.from(Object.keys(patern.proto), (protoKey) => {
                                this[protoKey] = patern.proto[protoKey].bind(this);
                            });
                    }
                },
                _a.transactions = (0, transactions_1.Transactions)(),
                _a), { extends: patern.baseName });
        return customElements.get(`${type}-${patern.baseName}`);
    }
    else {
        if (type == 'page' && !customElements.get(paternName))
            customElements.define(paternName, (0, controller_1.PageController)(paternName, patern, HTMLElement));
        if (type == 'views' && !customElements.get(paternName))
            customElements.define(paternName, (0, controller_1.ViewController)(paternName, patern, HTMLElement));
        else if (type == 'thorium' && !customElements.get(paternName))
            customElements.define(paternName, (0, controller_1.ThoriumController)(paternName, patern, HTMLElement));
        return customElements.get(paternName);
    }
};
exports.register = register;
//# sourceMappingURL=register.js.map