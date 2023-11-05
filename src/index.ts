import Core , { DOM } from "thorium-core";
export * from "thorium-core";
export * from "thorium-states";
export * from './element-state';
export { rootContext , applicationContext , pageContext } from "thorium-store-context";


namespace Thorium{

  export const version = '2.0.0';
  export const core = {...Core as any};


  if('thorium' in window == false)window['thorium'] = Thorium;

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

export default Thorium;