import { useState , State } from "thorium-states";
import { StoreContext , TStoreContext } from './store-context';

const [ pageContextState , setPageContext ] = useState<TStoreContext>( new class PageContext extends StoreContext{

}() );

const pageContextUpdate = ( value ) => {
  alert('value update')
};

pageContextState.subscribe( document.body , pageContextUpdate );

export const pageContext = () => { return pageContextState.value };