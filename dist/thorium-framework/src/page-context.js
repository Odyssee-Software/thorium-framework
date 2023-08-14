"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageContext = void 0;
const src_1 = require("../../thorium-states/src");
const store_context_1 = require("./store-context");
const [pageContextState, setPageContext] = (0, src_1.useState)(new class PageContext extends store_context_1.StoreContext {
}());
const pageContextUpdate = (value) => {
    alert('value update');
};
pageContextState.subscribe(document.body, pageContextUpdate);
const pageContext = () => { return pageContextState.value; };
exports.pageContext = pageContext;
//# sourceMappingURL=page-context.js.map