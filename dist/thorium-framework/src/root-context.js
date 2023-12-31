"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootContext = void 0;
const src_1 = require("../../thorium-states/src");
const store_context_1 = require("./store-context");
const [rootContextState, setRootContext] = (0, src_1.useState)(new class RootContext extends store_context_1.StoreContext {
}());
const rootContextUpdate = (value) => {
    alert('value update');
};
rootContextState.subscribe(document.body, rootContextUpdate);
const rootContext = () => { return rootContextState.value; };
exports.rootContext = rootContext;
//# sourceMappingURL=root-context.js.map