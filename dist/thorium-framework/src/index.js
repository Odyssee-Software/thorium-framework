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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importStar(require("../../thorium-core/src"));
__exportStar(require("../../thorium-core/src"), exports);
__exportStar(require("../../thorium-states/src"), exports);
__exportStar(require("./element-state"), exports);
__exportStar(require("./app-context"), exports);
__exportStar(require("./root-context"), exports);
__exportStar(require("./page-context"), exports);
__exportStar(require("./store-context"), exports);
var Thorium;
(function (Thorium) {
    Thorium.version = '2.0.0';
    Thorium.core = Object.assign({}, src_1.default);
    if ('thorium' in window == false)
        window['thorium'] = Thorium;
})(Thorium || (Thorium = {}));
const renderPage = () => {
    let { location } = window;
    let { hash } = location;
    let baseHash = hash.split('/')[1];
    let { pages } = src_1.default;
    let route = pages.recognize(`/${baseHash}`);
    if (route && route.length > 0) {
        let baseRouteHandler = route[0];
        return baseRouteHandler.handler();
    }
};
let currentPageId = null;
const onHashChange = () => {
    let f = src_1.DOM.virtual.getElementByElementId(currentPageId);
    if (f)
        f.remove();
    currentPageId = renderPage();
};
window.onload = () => {
    let { location } = window;
    let { hash } = location;
    currentPageId = renderPage();
    window.addEventListener("hashchange", onHashChange, false);
    if (!hash)
        window.location.hash = '/';
    if (src_1.DOM.onload)
        src_1.DOM.onload();
};
exports.default = Thorium;
//# sourceMappingURL=index.js.map