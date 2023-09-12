import { State } from "thorium-states";
export type TStoreStateToken = `${string}-${string}-${string}-${string}-${string}`;
export interface IStoreState<T> {
    token: TStoreStateToken;
    key: string;
    state: State<T>;
    value: T;
    setter: (value: T) => T;
    subscribe: State<T>['subscribe'];
    unsubscribe: State<T>['unsubscribe'];
}
export type TStoreContextEvent = 'add' | 'update' | 'delete';
export interface IStoreContext {
    id: `${string}-${string}-${string}-${string}-${string}`;
    tokenList: () => TStoreStateToken[];
    keyList: () => string[];
    values: () => IStoreState<any>[];
    set: <T>(key: string, value: T) => IStoreState<T> | void;
    on: (event: TStoreContextEvent, callback: (oldValue: any, newValue: any) => void) => void;
}
export declare class StoreContext implements IStoreContext {
    #private;
    get id(): `${string}-${string}-${string}-${string}-${string}`;
    set: <T>(key: string, value: any) => void | IStoreState<T>;
    get: (identificateur: string | TStoreStateToken) => IStoreState<any>[];
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
