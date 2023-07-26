import { useState , State } from "../../thorium-states/src";
import { StoreContext , TStoreContext } from './store-context';

const [ appContextState , setAppContext ] = useState<TStoreContext>( new class AppContext extends StoreContext{

}() );

const appContextUpdate = ( value ) => {
  alert('value update')
};

appContextState.subscribe( document.body , appContextUpdate );

export const appContext = () => { return appContextState.value };