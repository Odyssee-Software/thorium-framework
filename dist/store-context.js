"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StoreContext__id, _StoreContext__events, _StoreContext__list;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStoreContext = exports.createStoreContext = exports.storeContext = exports.StoreContext = void 0;
const thorium_states_1 = require("thorium-states");
class StoreContext {
    constructor() {
        _StoreContext__id.set(this, crypto.randomUUID());
        _StoreContext__events.set(this, {
            add: null,
            update: null,
            delete: null
        });
        _StoreContext__list.set(this, new Map());
        this.set = (key, value) => {
            if (this.keyList().includes(key)) {
                console.error(`${key} already existing in store`);
                return;
            }
            let [state, setState] = (0, thorium_states_1.useState)(value);
            let stateToken = crypto.randomUUID();
            if (__classPrivateFieldGet(this, _StoreContext__events, "f")['add'])
                __classPrivateFieldGet(this, _StoreContext__events, "f")['add'](null, state.value);
            __classPrivateFieldGet(this, _StoreContext__list, "f").set(stateToken, {
                token: stateToken,
                key,
                state,
                get value() { return state.value; },
                set value(value) { setState(value); },
                setter: setState,
                subscribe: state.subscribe,
                unsubscribe: state.unsubscribe
            });
            return __classPrivateFieldGet(this, _StoreContext__list, "f").get(stateToken);
        };
        this.get = (identificateur) => {
            if (__classPrivateFieldGet(this, _StoreContext__list, "f").has(identificateur))
                return [__classPrivateFieldGet(this, _StoreContext__list, "f").get(identificateur)];
            else {
                return [...__classPrivateFieldGet(this, _StoreContext__list, "f").values()].reduce((arr, storeState) => {
                    if (storeState.key == identificateur)
                        arr.push(storeState);
                    return arr;
                }, []);
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