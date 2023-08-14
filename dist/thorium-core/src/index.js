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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Page_instances, _Page__component, _Page__render, _PageHandler__pages;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOM = exports.DesignSystem = exports.PageHandler = void 0;
const route_recognizer_1 = __importDefault(require("route-recognizer"));
const design_system_1 = __importDefault(require("./design-system"));
exports.DesignSystem = design_system_1.default;
// import { DOMRender , NodeTemplate } from './dom/dom-render';
const dom_1 = require("./dom");
Object.defineProperty(exports, "DOM", { enumerable: true, get: function () { return dom_1.DOM; } });
// export declare var DOMwindow: Window ; // vous pouvez spécifier le type de votre variable ici
// export declare var DOMdocument: Document // vous pouvez spécifier le type de votre variable ici
// DOMwindow = ( window ? window : (new JSDOM()).dom );
// DOMdocument = DOMwindow.document;
__exportStar(require("./connector"), exports);
__exportStar(require("./design-system"), exports);
__exportStar(require("./dom"), exports);
__exportStar(require("./controller"), exports);
class Page {
    constructor(component) {
        _Page_instances.add(this);
        _Page__component.set(this, void 0);
        __classPrivateFieldSet(this, _Page__component, component, "f");
    }
    /**
     * Build the page
     */
    show() { __classPrivateFieldGet(this, _Page_instances, "m", _Page__render).call(this); }
}
_Page__component = new WeakMap(), _Page_instances = new WeakSet(), _Page__render = function _Page__render() {
};
class PageHandler extends route_recognizer_1.default {
    constructor() {
        super(...arguments);
        _PageHandler__pages.set(this, new Map());
    }
    get list() { return Object.fromEntries(__classPrivateFieldGet(this, _PageHandler__pages, "f")); }
    /**
     * Define the endpoint of the page
     * @param pageOption
     * @returns
     */
    set(pageOption) {
        // Ajout de la page au répertoir
        __classPrivateFieldGet(this, _PageHandler__pages, "f").set(pageOption.name, new Page(pageOption.component));
        // Ajout du path dans le gestionaire + ajout d'un point de lancement
        this.add([{ path: pageOption.name, handler: () => {
                    return dom_1.DOM.virtual.render(pageOption.component, document.body);
                } }]);
        // Return la page
        return __classPrivateFieldGet(this, _PageHandler__pages, "f").get(pageOption.name);
    }
    render(pagePath) {
        let results = this.recognize(pagePath);
        console.log(results);
        if (results[0]) {
            console.log(results);
            let page = results[0].handler();
            dom_1.DOM.virtual.render(page, document.body);
        }
    }
}
exports.PageHandler = PageHandler;
_PageHandler__pages = new WeakMap();
var Core;
(function (Core) {
    // Distribue un routeur
    Core.router = () => { return route_recognizer_1.default; };
    // Active page
    Core.Page = null;
    // Routeur gérant les pages
    Core.pages = new PageHandler();
})(Core || (Core = {}));
exports.default = Core;
//# sourceMappingURL=index.js.map