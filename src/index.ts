import Core , { DOM, PageHandler } from "thorium-core";
import * as Context from 'thorium-store-context';
import { applicationContext , IStoreState } from "thorium-store-context";
import * as UUID from 'thorium-huid';
import { StateMutator } from 'thorium-states';
import { preload , PreloadStack , PreloadModule } from './preload';

export {
  preload,
  PreloadStack,
  PreloadModule,
};

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
  return applicationContext().set( key , value ) as IStoreState<T>;
}

let _onRenderPage = null;
let _onHashChange = null;

const renderPage = () => {

  let { location } = window;
  let { hash } = location;
  let baseHash = hash.split('/')[1];

  let { pages } = Core;

  let route = pages.recognize(`/${baseHash}`);

  if(route && route.length > 0){

    let baseRouteHandler = route[0];
    if(_onRenderPage)_onRenderPage();
    return (baseRouteHandler as unknown as { handler:()=>void }).handler();

  }

}

let currentPageId = null;

const onHashChange = () => {

  let f = DOM.virtual.getElementByElementId(currentPageId);
  if(f)f.remove();
  if(_onHashChange)_onHashChange();
  currentPageId = renderPage();

}

export interface PagesAPI extends PageHandler{
  onHashChange():void;
  onRenderPage():void;
}

export function pages():PagesAPI{

  let { pages } = Core;

  return new Proxy( pages as any , {
    get( target , key ){
      if(target[key])return target[key];
      else if(key == 'onHashChange')return _onHashChange;
      else if(key == 'onRenderPage')return _onRenderPage;
    },
    set( target , key , value ){

      if(key == 'onHashChange'){
        _onHashChange = value;
      }
      else if( key == 'onRenderPage' ){
        _onRenderPage = value;
      }

      return true;
    }
  })

}

window.onload = () => {

  let { location } = window;
  let { hash } = location;

  preload().execute().then(() => {

    currentPageId = renderPage();

    window.addEventListener("hashchange", onHashChange , false);
  
    if(!hash)window.location.hash = '/';
  
    if(DOM.onload)DOM.onload();

  })

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