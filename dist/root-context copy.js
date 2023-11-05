"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootContext = void 0;
const dist_1 = require("../modules/states/dist");
const store_context_1 = require("./store-context");
/** The line `const [ rootContextState , setRootContext ] = useState<TStoreContext>( new class
RootContext extends StoreContext{ */
const [rootContextState, setRootContext] = (0, dist_1.useState)(new class RootContext extends store_context_1.StoreContext {
}());
/**
 * The function `rootContextUpdate` displays an alert message when the value is updated.
 * @param value - The value parameter is the new value that will be used to update the root context.
 */
const rootContextUpdate = (value) => {
    alert('value update');
};
/** `rootContextState.subscribe( document.body , rootContextUpdate );` is subscribing the
`rootContextState` to changes and calling the `rootContextUpdate` function whenever the value of
`rootContextState` is updated. The `document.body` is passed as the first argument to specify the
target element to listen for changes. */
rootContextState.subscribe(document.body, rootContextUpdate);
/**
 * The function returns the value of the root context state.
 * @returns The value of the `rootContextState.value` variable is being returned.
 */
const rootContext = () => { return rootContextState.value; };
exports.rootContext = rootContext;
//# sourceMappingURL=root-context%20copy.js.map