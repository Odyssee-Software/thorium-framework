import Core , { DOM } from "thorium-core";
import * as Context from 'thorium-store-context';
import { rootContext , IStoreState } from "thorium-store-context";
import * as UUID from 'thorium-huid';
import { StateMutator } from 'thorium-states';


namespace Thorium{

  export const version = '2.0.0';
  export const core = {...Core as any};
  export const context = Context;
  export const uuid = UUID;

  if('thorium' in window == false)window['thorium'] = Thorium;

}

export const useState = <T>( key:string , value:T ) => {
  console.log( 'useState' )
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
export * from "thorium-states";
export * from './element-state';
export { 
  rootContext , 
  applicationContext , 
  pageContext 
} from "thorium-store-context";
export { uuid } from 'thorium-huid';

export default Thorium;