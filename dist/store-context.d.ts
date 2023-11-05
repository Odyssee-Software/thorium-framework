import { State } from "../modules/states/dist";
export type TStoreStateToken = `${string}-${string}-${string}-${string}-${string}`;
/** The `IStoreState<T>` interface defines the structure of a store state object. It has the following
properties: */
export interface IStoreState<T> {
    /** The `token:TStoreStateToken;` property in the `IStoreState<T>` interface is used to uniquely
    identify a store state object. It is of type `TStoreStateToken`, which is a string type. Each
    store state object will have a different token value, allowing for easy identification and
    retrieval of specific store state objects. */
    token: TStoreStateToken;
    /** The `key:string;` property in the `IStoreState<T>` interface is used to identify a specific store
    state object within a store context. It is a string value that represents the key or identifier
    for the state value. Each store state object in the store context will have a unique key. This key
    is used to retrieve, update, or delete the corresponding state value in the store context. */
    key: string;
    /** The `state:State<T>` property in the `IStoreState<T>` interface is used to store the state value
    of a store state object. It is of type `State<T>`, which is a generic type that represents the
    current value and allows for subscribing to changes in the state value. The `State<T>` type is
    likely defined in the "thorium-states" library that is imported at the beginning of the code. */
    state: State<T>;
    /** The `value:T;` property in the `IStoreState<T>` interface is used to store the current value of
    the state in a store state object. It is of type `T`, which is a generic type that represents the
    type of the state value. This property allows you to access and update the state value in the
    store context. */
    value: T;
    /** The `setter` property in the `IStoreState<T>` interface is a function that takes a value of type
    `T` and returns a value of type `T`. It is used to update the state value of a store state object. */
    setter: (value: T) => T;
    /** The line `subscribe:State<T>['subscribe'];` is defining the `subscribe` property in the
    `IStoreState<T>` interface. It is of type `State<T>['subscribe']`, which means it is referencing
    the `subscribe` method of the `State<T>` type. */
    subscribe: State<T>['subscribe'];
    /** The line `unsubscribe:State<T>['unsubscribe'];` in the `IStoreState<T>` interface is defining the
    `unsubscribe` property. It is of type `State<T>['unsubscribe']`, which means it is referencing the
    `unsubscribe` method of the `State<T>` type. */
    unsubscribe: State<T>['unsubscribe'];
}
export type TStoreContextEvent = 'add' | 'update' | 'delete';
/** The `IStoreContext` interface defines the structure and methods that a store context object should
have. */
export interface IStoreContext {
    /** The `id:TStoreId;` is defining a property called `id` in the `IStoreContext` interface. The type
    of this property is `TStoreId`, which is a string type. This property is used to uniquely identify
    a store context object. */
    id: TStoreId;
    /** The `tokenList` property in the `IStoreContext` interface is a method that returns an array of
    `TStoreStateToken` values. */
    tokenList: () => TStoreStateToken[];
    /** The `keyList` method in the `IStoreContext` interface is a function that returns an array of
    strings. This method is used to retrieve a list of all the keys or identifiers for the state
    values in a store context. Each state value in the store context is associated with a unique key,
    and this method allows you to get all those keys. */
    keyList: () => string[];
    /** The `values` method in the `StoreContext` class is a function that returns an array of
    `IStoreState<any>` objects. */
    values: () => IStoreState<any>[];
    /** The `set` method in the `StoreContext` class is a generic method that takes a `key` of type
    `string` and a `value` of type `T`. It is used to add a new state value to the store context. */
    set: <T>(key: string, value: T) => IStoreState<T> | void;
    /** The `on` method in the `StoreContext` class is used to register event listeners for specific
    events in the store context. It takes two parameters: `event` and `callback`. */
    on: (event: TStoreContextEvent, callback: (oldValue: any, newValue: any) => void) => void;
}
/** The `StoreContext` class is an implementation of the `IStoreContext` interface in TypeScript,
providing methods for managing a store of state values. */
export declare class StoreContext implements IStoreContext {
    #private;
    get id(): `${string}-${string}-${string}-${string}-${string}`;
    set: <T>(key: string, value: any) => void | IStoreState<T>;
    get: <T>(identificateur: string | TStoreStateToken) => IStoreState<T>;
    update: (identificateur: string | TStoreStateToken, value: any) => IStoreState<any>[] | Map<`${string}-${string}-${string}-${string}-${string}`, IStoreState<any>>[];
    delete: (identificateur: string | TStoreStateToken) => boolean[];
    tokenList: () => `${string}-${string}-${string}-${string}-${string}`[];
    keyList: () => string[];
    values: () => IStoreState<any>[];
    on: (event: TStoreContextEvent, callback: (oldValue: any, newValue: any) => void) => void;
}
export type TStoreId = `${string}-${string}-${string}-${string}-${string}`;
export declare const storeContext: () => {
    create: () => TStoreContext;
    delete: (storeId: TStoreId) => boolean;
};
export declare const createStoreContext: () => TStoreContext;
export declare const deleteStoreContext: (storeId: TStoreId) => boolean;
export type TStoreContext = StoreContext;
