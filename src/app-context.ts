import { useState , State } from "/Users/guillaume/Documents/Thorium/thorium-states";
import { StoreContext , TStoreContext } from './store-context';

const [ appContextState , setAppContext ] = useState<TStoreContext>( new class AppContext extends StoreContext{

}() );

const appContextUpdate = ( value ) => {
  alert('value update')
};

appContextState.subscribe( document.body , appContextUpdate );

export const appContext = () => { return appContextState.value };