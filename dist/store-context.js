"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StoreContext__id, _StoreContext__events, _StoreContext__list;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStoreContext = exports.createStoreContext = exports.storeContext = exports.StoreContext = void 0;
const dist_1 = require("../modules/states/dist");
/** The `StoreContext` class is an implementation of the `IStoreContext` interface in TypeScript,
providing methods for managing a store of state values. */
class StoreContext {
    constructor() {
        /** The line `#_id:TStoreId = crypto.randomUUID();` is initializing a private instance variable `#_id`
        with a randomly generated unique identifier using the `crypto.randomUUID()` function. The
        `crypto.randomUUID()` function generates a random UUID (Universally Unique Identifier) string,
        which is a 128-bit value that is guaranteed to be unique across all devices and time. The
        `TStoreId` type represents the type of the unique identifier. By assigning the result of
        `crypto.randomUUID()` to `#_id`, each instance of the `StoreContext` class will have a unique
        identifier associated with it. */
        _StoreContext__id.set(this, crypto.randomUUID());
        /** The `#_events` property is a private instance variable in the `StoreContext` class. It is of type
        `Record<TStoreContextEvent, ((x, y) => void) | null>`, which is a TypeScript type that represents
        an object with keys of type `TStoreContextEvent` (which can be either `'add'`, `'update'`, or
        `'delete'`) and values that are either a function that takes two parameters `(x, y)` and returns
        `void`, or `null`. */
        _StoreContext__events.set(this, {
            add: null,
            update: null,
            delete: null
        });
        /** The line `#_list:Map<TStoreStateToken , IStoreState<any>> = new Map();` is initializing a private
        instance variable `#_list` with a new Map object. The Map object is a built-in data structure in
        TypeScript that allows you to store key-value pairs. In this case, the keys are of type
        `TStoreStateToken` and the values are of type `IStoreState<any>`. */
        _StoreContext__list.set(this, new Map());
        this.set = (key, value) => {
            if (this.keyList().includes(key)) {
                console.error(`${key} already existing in store`);
                return;
            }
            let [state, setState] = (0, dist_1.useState)(value);
            let stateToken = crypto.randomUUID();
            if (__classPrivateFieldGet(this, _StoreContext__events, "f")['add'])
                __classPrivateFieldGet(this, _StoreContext__events, "f")['add'](null, state.value);
            __classPrivateFieldGet(this, _StoreContext__list, "f").set(stateToken, {
                token: stateToken,
                key,
                state,
                get value() { return state.value; },
                set value(value) { setState(value); },
                setter: (value) => {
                    if (__classPrivateFieldGet(this, _StoreContext__events, "f")['update'])
                        __classPrivateFieldGet(this, _StoreContext__events, "f")['update'](state.value, value);
                    return setState(value);
                },
                subscribe: state.subscribe,
                unsubscribe: state.unsubscribe,
            });
            return __classPrivateFieldGet(this, _StoreContext__list, "f").get(stateToken);
        };
        this.get = (identificateur) => {
            if (__classPrivateFieldGet(this, _StoreContext__list, "f").has(identificateur)) {
                return __classPrivateFieldGet(this, _StoreContext__list, "f").get(identificateur);
            }
            else {
                return [...__classPrivateFieldGet(this, _StoreContext__list, "f").values()].reduce((result, storeState) => {
                    if (storeState.key == identificateur)
                        result = storeState;
                    return result;
                }, null);
            }
        };
        this.update = (identificateur, value) => {
            if (__classPrivateFieldGet(this, _StoreContext__list, "f").has(identificateur))
                return [__classPrivateFieldGet(this, _StoreContext__list, "f").set(identificateur, value)];
            else
                return [...__classPrivateFieldGet(this, _StoreContext__list, "f").values()].reduce((arr, storeState) => {
                    if (storeState.key == identificateur)
                        arr.push(__classPrivateFieldGet(this, _StoreContext__list, "f").set(storeState.token, value));
                    return arr;
                }, []);
        };
        this.delete = (identificateur) => {
            if (__classPrivateFieldGet(this, _StoreContext__list, "f").has(identificateur))
                return [__classPrivateFieldGet(this, _StoreContext__list, "f").delete(identificateur)];
            else {
                return [...__classPrivateFieldGet(this, _StoreContext__list, "f").values()].reduce((arr, storeState) => {
                    if (storeState.key == identificateur)
                        arr.push(__classPrivateFieldGet(this, _StoreContext__list, "f").delete(storeState.token));
                    return arr;
                }, []);
            }
        };
        this.tokenList = () => {
            return [...__classPrivateFieldGet(this, _StoreContext__list, "f").keys()];
        };
        this.keyList = () => {
            return this.values().reduce((arr, value) => {
                arr.push(value.key);
                return arr;
            }, []);
        };
        this.values = () => {
            return [...__classPrivateFieldGet(this, _StoreContext__list, "f").values()];
        };
        this.on = (event, callback) => {
            if (event in __classPrivateFieldGet(this, _StoreContext__events, "f"))
                __classPrivateFieldGet(this, _StoreContext__events, "f")[event] = callback;
        };
    }
    get id() {
        return __classPrivateFieldGet(this, _StoreContext__id, "f");
    }
    ;
}
exports.StoreContext = StoreContext;
_StoreContext__id = new WeakMap(), _StoreContext__events = new WeakMap(), _StoreContext__list = new WeakMap();
/** The line `const StoreStack:Map<TStoreId , StoreContext> = new Map();` is creating a new Map object
called `StoreStack`. The Map is a built-in data structure in TypeScript that allows you to store
key-value pairs. In this case, the keys are of type `TStoreId` and the values are of type
`StoreContext`. The `new Map()` creates an empty Map object. */
const StoreStack = new Map();
const storeContext = () => {
    return {
        create: () => {
            let store = new StoreContext();
            StoreStack.set(store.id, store);
            return StoreStack.get(store.id);
        },
        delete: (storeId) => {
            return StoreStack.has(storeId) ? StoreStack.delete(storeId) : null;
        }
    };
};
exports.storeContext = storeContext;
exports.createStoreContext = (0, exports.storeContext)().create;
exports.deleteStoreContext = (0, exports.storeContext)().delete;
//# sourceMappingURL=store-context.js.map