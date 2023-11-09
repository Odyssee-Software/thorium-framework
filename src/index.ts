import Core , { DOM } from "thorium-core";
import * as Context from 'thorium-store-context';
import { rootContext , IStoreState } from "thorium-store-context";
import * as UUID from 'thorium-huid';
import { StateMutator } from 'thorium-states';


/* The `namespace Thorium` block is defining a namespace called `Thorium` and exporting it. Within this
namespace, there are several properties defined: */
namespace Thorium{

  export const version = '2.0.0';
  export const core = {...Core as any};
  export const context = Context;
  export const uuid = UUID;

  if('thorium' in window == false)window['thorium'] = Thorium;

}

/**
 * The `useState` function is a TypeScript function that sets a value in the root context and returns
 * the updated state.
 * @param {string} key - The key parameter is a string that represents the key under which the value
 * will be stored in the state.
 * @param {T} value - The `value` parameter is the initial value that you want to set for the state
 * variable. It can be of any type, as it is defined as a generic type `<T>`.
 * @returns the value of `rootContext().set(key, value)` casted as `IStoreState<T>`.
 */
export const useState = <T>( key:string , value:T ) => {
  return rootContext().set( key , value ) as IStoreState<T>;
}

const renderPage = () => {
  let { location } = window;
  let { hash } = location;
  let baseHash = hash.split('/')[1];

  let { pages } = Core;

  let route = pages.recognize(`/${baseHash}`);

  if(route && route.length > 0){

    let baseRouteHandler = route[0];
    return (baseRouteHandler as unknown as { handler:()=>void }).handler();

  }
}

let currentPageId = null;

const onHashChange = () => {
  let f = DOM.virtual.getElementByElementId(currentPageId);
  if(f)f.remove();
  currentPageId = renderPage();
}

window.onload = () => {

  let { location } = window;
  let { hash } = location;

  currentPageId = renderPage();

  window.addEventListener("hashchange", onHashChange , false);

  if(!hash)window.location.hash = '/';

  if(DOM.onload)DOM.onload();

}

export * from "thorium-core";
export * from './element-state';
export { 
  rootContext , 
  applicationContext , 
  pageContext 
} from "thorium-store-context";
export { uuid } from 'thorium-huid';

export default Thorium;