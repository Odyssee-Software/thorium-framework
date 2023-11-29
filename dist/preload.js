"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preload = void 0;
/* The `preloadStack` constant is an instance of a class that extends the `Array` class. It represents
a stack of preload modules that need to be executed. */
const preloadStack = new class extends Array {
    /**
     * The function executes a series of asynchronous modules and returns an array of their results.
     * @returns The `execute` function returns an array of results.
    */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let results = [];
            if (this.length > 0) {
                results = yield Promise.all(Array.from(this, (module) => {
                    return module.main();
                }));
                // for await (const module of this){
                //   results.push(await module.main());
                // }
            }
            return results;
        });
    }
};
/**
 * The function returns the preload stack.
 * @returns the value of the variable `preloadStack`.
*/
function preload() {
    return new Proxy(preloadStack, {
        get(target, key) {
            if (target[key])
                return target[key];
            else
                console.warn(`${String(key)} is not a property of preload API`);
        }
    });
}
exports.preload = preload;
//# sourceMappingURL=preload.js.map