"use strict";
// const autoprefixer = require('autoprefixer')
// const postcss = require('postcss')
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStyleSheet = exports.createStyleSheet = exports.style = exports.StyleSheets = void 0;
const postcss_1 = __importDefault(require("postcss"));
const autoprefixer_1 = __importDefault(require("autoprefixer"));
// import autoprefixer = require('autoprefixer');
const ObjectCSS = __importStar(require("json-to-css"));
exports.StyleSheets = new Map();
const style = (cssObject) => __awaiter(void 0, void 0, void 0, function* () {
    let s = ObjectCSS.of(cssObject);
    // let css:CssPatern = CSSOM(cssObject);
    return new Promise((next) => {
        (0, postcss_1.default)([autoprefixer_1.default])
            .process(s, { from: undefined })
            .then(result => {
            result.token = crypto.randomUUID();
            next(result);
        });
    });
});
exports.style = style;
const createStyleSheet = (cssObject) => {
    return new Promise((next) => {
        (0, exports.style)(cssObject)
            .then((result) => {
            exports.StyleSheets.set(result.token, {
                token: result.token,
                cssObject: cssObject,
                result: result
            });
            next(exports.StyleSheets.get(result.token));
        });
    });
};
exports.createStyleSheet = createStyleSheet;
const getStyleSheet = (sheetToken) => {
    return (exports.StyleSheets.has(sheetToken) ? exports.StyleSheets.get(sheetToken) : null);
};
exports.getStyleSheet = getStyleSheet;
//# sourceMappingURL=style.js.map