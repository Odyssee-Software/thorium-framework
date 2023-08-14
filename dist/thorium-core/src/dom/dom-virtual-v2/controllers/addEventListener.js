"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEventListener = void 0;
/** Ajoute un écouteur d'événement à un élément virtuel */
const addEventListener = (ve, eventName, handler) => {
    return ve.element.addEventListener(eventName, (e) => {
        handler.bind(ve)(e, ve);
    });
};
exports.addEventListener = addEventListener;
//# sourceMappingURL=addEventListener.js.map