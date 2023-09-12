"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appContext = void 0;
const thorium_states_1 = require("thorium-states");
const store_context_1 = require("./store-context");
const [appContextState, setAppContext] = (0, thorium_states_1.useState)(new class AppContext extends store_context_1.StoreContext {
}());
const appContextUpdate = (value) => {
    alert('value update');
};
appContextState.subscribe(document.body, appContextUpdate);
const appContext = () => { return appContextState.value; };
exports.appContext = appContext;
//# sourceMappingURL=app-context.js.map