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
exports.uuid = exports.pageContext = exports.applicationContext = exports.rootContext = exports.useState = void 0;
const thorium_core_1 = __importStar(require("thorium-core"));
const Context = __importStar(require("thorium-store-context"));
const thorium_store_context_1 = require("thorium-store-context");
const UUID = __importStar(require("thorium-huid"));
/* The `namespace Thorium` block is defining a namespace called `Thorium` and exporting it. Within this
namespace, there are several properties defined: */
var Thorium;
(function (Thorium) {
    Thorium.version = '2.0.0';
    Thorium.core = Object.assign({}, thorium_core_1.default);
    Thorium.context = Context;
    Thorium.uuid = UUID;
    if ('thorium' in window == false)
        window['thorium'] = Thorium;
})(Thorium || (Thorium = {}));
/**
 * The `useState` function is a TypeScript function that sets a value in the root context and returns
 * the updated state.
 * @param {string} key - The key parameter is a string that represents the key under which the value
 * will be stored in the state.
 * @param {T} value - The `value` parameter is the initial value that you want to set for the state
 * variable. It can be of any type, as it is defined as a generic type `<T>`.
 * @returns the value of `rootContext().set(key, value)` casted as `IStoreState<T>`.
 */
const useState = (key, value) => {
    return (0, thorium_store_context_1.rootContext)().set(key, value);
};
exports.useState = useState;
const renderPage = () => {
    let { location } = window;
    let { hash } = location;
    let baseHash = hash.split('/')[1];
    let { pages } = thorium_core_1.default;
    let route = pages.recognize(`/${baseHash}`);
    if (route && route.length > 0) {
        let baseRouteHandler = route[0];
        return baseRouteHandler.handler();
    }
};
let currentPageId = null;
const onHashChange = () => {
    let f = thorium_core_1.DOM.virtual.getElementByElementId(currentPageId);
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
    if (thorium_core_1.DOM.onload)
        thorium_core_1.DOM.onload();
};
__exportStar(require("thorium-core"), exports);
__exportStar(require("./element-state"), exports);
var thorium_store_context_2 = require("thorium-store-context");
Object.defineProperty(exports, "rootContext", { enumerable: true, get: function () { return thorium_store_context_2.rootContext; } });
Object.defineProperty(exports, "applicationContext", { enumerable: true, get: function () { return thorium_store_context_2.applicationContext; } });
Object.defineProperty(exports, "pageContext", { enumerable: true, get: function () { return thorium_store_context_2.pageContext; } });
var thorium_huid_1 = require("thorium-huid");
Object.defineProperty(exports, "uuid", { enumerable: true, get: function () { return thorium_huid_1.uuid; } });
exports.default = Thorium;
//# sourceMappingURL=index.js.map