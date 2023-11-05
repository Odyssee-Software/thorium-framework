// import { useState , State } from "thorium-states";

// export type TStoreStateToken = `${string}-${string}-${string}-${string}-${string}`;

// /** The `IStoreState<T>` interface defines the structure of a store state object. It has the following
// properties: */
// export interface IStoreState<T>{

//   /** The `token:TStoreStateToken;` property in the `IStoreState<T>` interface is used to uniquely
//   identify a store state object. It is of type `TStoreStateToken`, which is a string type. Each
//   store state object will have a different token value, allowing for easy identification and
//   retrieval of specific store state objects. */
//   token:TStoreStateToken;

//   /** The `key:string;` property in the `IStoreState<T>` interface is used to identify a specific store
//   state object within a store context. It is a string value that represents the key or identifier
//   for the state value. Each store state object in the store context will have a unique key. This key
//   is used to retrieve, update, or delete the corresponding state value in the store context. */
//   key:string;

//   /** The `state:State<T>` property in the `IStoreState<T>` interface is used to store the state value
//   of a store state object. It is of type `State<T>`, which is a generic type that represents the
//   current value and allows for subscribing to changes in the state value. The `State<T>` type is
//   likely defined in the "thorium-states" library that is imported at the beginning of the code. */
//   state:State<T>;

//   /** The `value:T;` property in the `IStoreState<T>` interface is used to store the current value of
//   the state in a store state object. It is of type `T`, which is a generic type that represents the
//   type of the state value. This property allows you to access and update the state value in the
//   store context. */
//   value:T;

//   /** The `setter` property in the `IStoreState<T>` interface is a function that takes a value of type
//   `T` and returns a value of type `T`. It is used to update the state value of a store state object. */
//   setter:(value:T) => T;

//   /** The line `subscribe:State<T>['subscribe'];` is defining the `subscribe` property in the
//   `IStoreState<T>` interface. It is of type `State<T>['subscribe']`, which means it is referencing
//   the `subscribe` method of the `State<T>` type. */
//   subscribe:State<T>['subscribe'];

//   /** The line `unsubscribe:State<T>['unsubscribe'];` in the `IStoreState<T>` interface is defining the
//   `unsubscribe` property. It is of type `State<T>['unsubscribe']`, which means it is referencing the
//   `unsubscribe` method of the `State<T>` type. */
//   unsubscribe:State<T>['unsubscribe'];
  
// }

// export type TStoreContextEvent = 'add' | 'update' | 'delete';

// /** The `IStoreContext` interface defines the structure and methods that a store context object should
// have. */
// export interface IStoreContext{

//   /** The `id:TStoreId;` is defining a property called `id` in the `IStoreContext` interface. The type
//   of this property is `TStoreId`, which is a string type. This property is used to uniquely identify
//   a store context object. */
//   id:TStoreId;

//   /** The `tokenList` property in the `IStoreContext` interface is a method that returns an array of
//   `TStoreStateToken` values. */
//   tokenList:() => TStoreStateToken[];

//   /** The `keyList` method in the `IStoreContext` interface is a function that returns an array of
//   strings. This method is used to retrieve a list of all the keys or identifiers for the state
//   values in a store context. Each state value in the store context is associated with a unique key,
//   and this method allows you to get all those keys. */
//   keyList:() => string[];

//   /** The `values` method in the `StoreContext` class is a function that returns an array of
//   `IStoreState<any>` objects. */
//   values:() => IStoreState<any>[];

//   /** The `set` method in the `StoreContext` class is a generic method that takes a `key` of type
//   `string` and a `value` of type `T`. It is used to add a new state value to the store context. */
//   set:<T>(key:string , value:T) => IStoreState<T> | void;

//   /** The `on` method in the `StoreContext` class is used to register event listeners for specific
//   events in the store context. It takes two parameters: `event` and `callback`. */
//   on:(event:TStoreContextEvent , callback:(oldValue:any , newValue:any) => void) => void;

// }

// /** The `StoreContext` class is an implementation of the `IStoreContext` interface in TypeScript,
// providing methods for managing a store of state values. */
// export class StoreContext implements IStoreContext{

//   /** The line `#_id:TStoreId = crypto.randomUUID();` is initializing a private instance variable `#_id`
//   with a randomly generated unique identifier using the `crypto.randomUUID()` function. The
//   `crypto.randomUUID()` function generates a random UUID (Universally Unique Identifier) string,
//   which is a 128-bit value that is guaranteed to be unique across all devices and time. The
//   `TStoreId` type represents the type of the unique identifier. By assigning the result of
//   `crypto.randomUUID()` to `#_id`, each instance of the `StoreContext` class will have a unique
//   identifier associated with it. */
//   #_id:TStoreId = crypto.randomUUID();
//   get id(){
//     return this.#_id;
//   };

//   /** The `#_events` property is a private instance variable in the `StoreContext` class. It is of type
//   `Record<TStoreContextEvent, ((x, y) => void) | null>`, which is a TypeScript type that represents
//   an object with keys of type `TStoreContextEvent` (which can be either `'add'`, `'update'`, or
//   `'delete'`) and values that are either a function that takes two parameters `(x, y)` and returns
//   `void`, or `null`. */
//   #_events:Record<TStoreContextEvent , ((x,y) => void) | null> = {
//     add : null,
//     update : null,
//     delete : null
//   };

//   /** The line `#_list:Map<TStoreStateToken , IStoreState<any>> = new Map();` is initializing a private
//   instance variable `#_list` with a new Map object. The Map object is a built-in data structure in
//   TypeScript that allows you to store key-value pairs. In this case, the keys are of type
//   `TStoreStateToken` and the values are of type `IStoreState<any>`. */
//   #_list:Map<TStoreStateToken , IStoreState<any>> = new Map();

//   set = <T>(key:string , value:any):IStoreState<T> | void => {

//     if(this.keyList().includes(key)){
//       console.error(`${key} already existing in store`);
//       return ;
//     }

//     let [ state , setState ] = useState<T>(value);

//     let stateToken = crypto.randomUUID();

//     if(this.#_events['add'])this.#_events['add'](null , state.value);

//     this.#_list.set( stateToken , {
//       token:stateToken,
//       key,
//       state,
//       get value(){return state.value},
//       set value(value:T){setState(value)},
//       setter : ( value:T ) => { 
//         if(this.#_events['update'])this.#_events['update'](state.value , value);
//         return setState( value ) 
//       },
//       subscribe : state.subscribe,
//       unsubscribe : state.unsubscribe,
//     } )

//     return this.#_list.get(stateToken);

//   };

//   get = <T>( identificateur:string|TStoreStateToken ):IStoreState<T> => {

//     if(this.#_list.has(identificateur as TStoreStateToken)){
//       return this.#_list.get(identificateur as TStoreStateToken);
//     }
//     else{
//       return [...this.#_list.values()].reduce((result:IStoreState<any> , storeState:IStoreState<any>) => {

//         if(storeState.key == identificateur)result = storeState;
//         return result;

//       } , null);
//     }

//   };

//   update = ( identificateur:string|TStoreStateToken , value:any ) => {

//     if(this.#_list.has(identificateur as TStoreStateToken))return [this.#_list.set(identificateur as TStoreStateToken , value)];
//     else return [...this.#_list.values()].reduce((arr:IStoreState<any>[] , storeState:IStoreState<any>) => {

//       if(storeState.key == identificateur)arr.push((this.#_list as any).set(storeState.token as TStoreStateToken , value));
//       return arr;

//     } , []);

//   };

//   delete = (identificateur:string|TStoreStateToken) => {
//     if(this.#_list.has(identificateur as TStoreStateToken))return [this.#_list.delete(identificateur as TStoreStateToken)];
//     else{
//       return [...this.#_list.values()].reduce((arr:boolean[] , storeState:IStoreState<any>) => {

//         if(storeState.key == identificateur)arr.push((this.#_list as any).delete(storeState.token as TStoreStateToken));
//         return arr;

//       } ,  [])
//     }
//   };

//   tokenList = () => {
//     return [...this.#_list.keys()]
//   };

//   keyList = () => {
//     return this.values().reduce((arr:string[] , value:{key:string}) => {
//       arr.push(value.key);
//       return arr;
//     } , []) as string[];
//   };

//   values = () => {
//     return [...this.#_list.values()];
//   };
  
//   on = (event:TStoreContextEvent , callback:(oldValue:any , newValue:any) => void) => {
//     if(event in this.#_events)this.#_events[event] = callback;
//   };

// }

// export type TStoreId = `${string}-${string}-${string}-${string}-${string}`;

// /** The line `const StoreStack:Map<TStoreId , StoreContext> = new Map();` is creating a new Map object
// called `StoreStack`. The Map is a built-in data structure in TypeScript that allows you to store
// key-value pairs. In this case, the keys are of type `TStoreId` and the values are of type
// `StoreContext`. The `new Map()` creates an empty Map object. */
// const StoreStack:Map<TStoreId , StoreContext> = new Map();

// export const storeContext = () => {

//   return {
//     create : ():TStoreContext => {
//       let store = new StoreContext();
//       StoreStack.set( store.id , store );
//       return (StoreStack as any).get( store.id );
//     },
//     delete : (storeId:TStoreId) => {
//       return StoreStack.has(storeId) ? StoreStack.delete(storeId) : null;
//     }
//   }

// }

// export const createStoreContext = storeContext().create;
// export const deleteStoreContext = storeContext().delete;

// export type TStoreContext = StoreContext;