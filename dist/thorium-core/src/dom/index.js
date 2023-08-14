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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOM = void 0;
const dom_render_1 = require("./dom-render");
// import { DOMVirtual , htmlDocument as document , body , head , applyDOMChanges } from "./dom-virtual";
__exportStar(require("./dom-render"), exports);
// export * from "./dom-virtual";
const VDOM = __importStar(require("./dom-virtual-v2"));
/**
 * # DOM
 */
exports.DOM = {
    onload: null,
    loading: (callback) => {
        exports.DOM.onload = callback;
    },
    /**
     * La fonction `render` permet de rendre un `NodeTemplate` dans le DOM réel.
     * @function render
     * @memberof DOM
     * @param {NodeTemplate} template - Le template à rendre.
    */
    render: dom_render_1.DOMRender,
    /**
     * La classe `virtual` permet de créer et manipuler un DOM virtuel.
     * @class virtual
     * @memberof DOM
    */
    virtual: VDOM,
    /**
     * L'élément `document` représente l'élément racine du DOM virtuel.
     * @member document
     * @memberof DOM
     * @type {HTMLElement}
    */
    // document,
    /**
      * L'élément `head` représente la balise `<head>` du DOM virtuel.
      * @member head
      * @memberof DOM
      * @type {HTMLElement}
    */
    // head,
    /**
     * L'élément `body` représente la balise `<body>` du DOM virtuel.
     * @member body
     * @memberof DOM
     * @type {HTMLElement}
    */
    // body,
    /**
     * Applique les changements du DOM virtuel au DOM réel.
     *
     * Cette fonction est utilisée pour synchroniser le DOM virtuel avec le DOM réel en appliquant les modifications nécessaires.
     * Elle permet de rendre le contenu du DOM virtuel visible dans le navigateur en mettant à jour le DOM réel avec les changements correspondants.
     *
     * @param callback - La fonction de rappel contenant les modifications du DOM virtuel à appliquer.
    */
    // applyDOMChanges
};
//# sourceMappingURL=index.js.map