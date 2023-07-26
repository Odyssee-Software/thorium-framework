import { useState , State } from "../../thorium-states/src";

export type TStoreStateToken = `${string}-${string}-${string}-${string}-${string}`;

export interface IStoreState<T>{
  token:TStoreStateToken;
  key:string;
  state:State<T>,
  value:T;
  setter:(value:T) => T;
  subscribe:State<T>['subscribe'];
  unsubscribe:State<T>['unsubscribe'];
}

export type TStoreContextEvent = 'add' | 'update' | 'delete';

export interface IStoreContext{
  id:`${string}-${string}-${string}-${string}-${string}`;
  tokenList:() => TStoreStateToken[];
  keyList:() => string[];
  values:() => IStoreState<any>[];
  set:<T>(key:string , value:T) => IStoreState<T> | void;
  on:(event:TStoreContextEvent , callback:(oldValue:any , newValue:any) => void) => void;
}

export class StoreContext implements IStoreContext{

  #_id = crypto.randomUUID();
  get id(){
    return this.#_id;
  };
  #_events:Record<TStoreContextEvent , ((x,y) => void) | null> = {
    add : null,
    update : null,
    delete : null
  };
  #_list:Map<TStoreStateToken , IStoreState<any>> = new Map();
  set = <T>(key:string , value:any):IStoreState<T> | void => {

    if(this.keyList().includes(key)){
      console.error(`${key} already existing in store`);
      return ;
    }

    let [ state , setState ] = useState<T>(value);

    let stateToken = crypto.randomUUID();

    if(this.#_events['add'])this.#_events['add'](null , state.value);

    this.#_list.set( stateToken , {
      token:stateToken,
      key,
      state,
      get value(){return state.value},
      set value(value:T){setState(value)},
      setter : setState,
      subscribe : state.subscribe,
      unsubscribe : state.unsubscribe
    } )

    return this.#_list.get(stateToken);

  };
  get = ( identificateur:string|TStoreStateToken ) => {

    if(this.#_list.has(identificateur as TStoreStateToken))return [this.#_list.get(identificateur as TStoreStateToken)];
    else{
      return [...this.#_list.values()].reduce((arr:IStoreState<any>[] , storeState:IStoreState<any>) => {

        if(storeState.key == identificateur)arr.push(storeState);
        return arr;

      } ,  [])
    }

  };
  update = ( identificateur:string|TStoreStateToken , value:any ) => {

    if(this.#_list.has(identificateur as TStoreStateToken))return [this.#_list.set(identificateur as TStoreStateToken , value)];
    else return [...this.#_list.values()].reduce((arr:IStoreState<any>[] , storeState:IStoreState<any>) => {

      if(storeState.key == identificateur)arr.push((this.#_list as any).set(storeState.token as TStoreStateToken , value));
      return arr;

    } , []);

  };
  delete = (identificateur:string|TStoreStateToken) => {
    if(this.#_list.has(identificateur as TStoreStateToken))return [this.#_list.delete(identificateur as TStoreStateToken)];
    else{
      return [...this.#_list.values()].reduce((arr:boolean[] , storeState:IStoreState<any>) => {

        if(storeState.key == identificateur)arr.push((this.#_list as any).delete(storeState.token as TStoreStateToken));
        return arr;

      } ,  [])
    }
  };
  tokenList = () => {
    return [...this.#_list.keys()]
  };
  keyList = () => {
    return this.values().reduce((arr:string[] , value:{key:string}) => {
      arr.push(value.key);
      return arr;
    } , []) as string[];
  };
  values = () => {
    return [...this.#_list.values()];
  };
  on = (event:TStoreContextEvent , callback:(oldValue:any , newValue:any) => void) => {
    if(event in this.#_events)this.#_events[event] = callback;
  };

}

export type TStoreId = `${string}-${string}-${string}-${string}-${string}`;

const StoreStack:Map<TStoreId , StoreContext> = new Map();

export const storeContext = () => {

  return {
    create : ():TStoreContext => {
      let store = new StoreContext();
      StoreStack.set( store.id , store );
      return (StoreStack as any).get( store.id );
    },
    delete : (storeId:TStoreId) => {
      return StoreStack.has(storeId) ? StoreStack.delete(storeId) : null;
    }
  }

}

export const createStoreContext = storeContext().create;
export const deleteStoreContext = storeContext().delete;

export type TStoreContext = StoreContext;