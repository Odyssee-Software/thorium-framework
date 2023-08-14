"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
const createNodeElement_1 = require("./createNodeElement");
const render = (template, parent) => {
    return (0, createNodeElement_1.createNodeElement)(template, parent);
};
exports.render = render;
//# sourceMappingURL=render.js.map