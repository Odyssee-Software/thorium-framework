"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appContext = void 0;
const dist_1 = require("../modules/states/dist");
const store_context_1 = require("./store-context");
/** The code is using the `useState` hook from the `thorium-states` library to create a state variable
called `appContextState` and a setter function called `setAppContext`. The initial value of
`appContextState` is set to a new instance of a class `AppContext` that extends `StoreContext`. The
type of `appContextState` is specified as `TStoreContext`. */
const [appContextState, setAppContext] = (0, dist_1.useState)(new class AppContext extends store_context_1.StoreContext {
}());
/**
 * The appContextUpdate function alerts the user that the value has been updated.
 * @param value - The value parameter is the new value that will be used to update the app context.
 */
const appContextUpdate = (value) => {
    alert('value update');
};
/** The code `appContextState.subscribe( document.body , appContextUpdate );` is subscribing the
`appContextUpdate` function to changes in the `appContextState` state variable. Whenever the value
of `appContextState` changes, the `appContextUpdate` function will be called. The `document.body`
argument specifies the element to which the subscription is attached. */
appContextState.subscribe(document.body, appContextUpdate);
/**
 * The above function returns the value of the appContextState.
 * @returns The appContextState.value is being returned.
 */
const appContext = () => { return appContextState.value; };
exports.appContext = appContext;
//# sourceMappingURL=app-context%20copy.js.map