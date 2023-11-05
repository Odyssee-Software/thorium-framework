// import { useState , State } from "thorium-states";
// import { StoreContext , TStoreContext } from './x.store-context';
// /** The code is using the `useState` hook from the `thorium-states` library to create a state variable
// called `pageContextState` and a function called `setPageContext` to update that state variable. The
// initial value of `pageContextState` is an instance of a class `PageContext` that extends
// `StoreContext`. The type of `pageContextState` is specified as `TStoreContext`. */
// const [ pageContextState , setPageContext ] = useState<TStoreContext>( new class PageContext extends StoreContext{
// }() );
// /**
//  * The function `pageContextUpdate` displays an alert message with the text "value update".
//  * @param value - The value parameter is a variable that represents the updated value that will be
//  * passed to the pageContextUpdate function.
//  */
// const pageContextUpdate = ( value ) => {
//   alert('value update')
// };
// /** The code `pageContextState.subscribe( document.body , pageContextUpdate );` is subscribing the
// `pageContextState` to changes and specifying that the `pageContextUpdate` function should be called
// whenever the state value changes. The `document.body` is passed as the first argument, which means
// that the `pageContextUpdate` function will be called with the updated value whenever the state
// changes. */
// pageContextState.subscribe( document.body , pageContextUpdate );
// /**
//  * The function returns the value of the page context state.
//  * @returns The value of the `pageContextState.value` variable.
//  */
// export const pageContext = () => { return pageContextState.value };
//# sourceMappingURL=x.page-context.js.map