import { useState , State } from "../../thorium-states/src";
import { StoreContext , TStoreContext } from './store-context';

const [ rootContextState , setRootContext ] = useState<TStoreContext>( new class RootContext extends StoreContext{

}() );

const rootContextUpdate = ( value ) => {
  alert('value update')
};

rootContextState.subscribe( document.body , rootContextUpdate );

export const rootContext = () => { return rootContextState.value };