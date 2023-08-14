"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const eventsStack = new Map();
const Event = () => {
    return {
        addEventListener: (eventName, handler) => {
            let eventId = crypto.randomUUID().toString();
            let stack = eventsStack.get(eventName);
            if (!stack)
                return false;
            if (!stack.has(eventId))
                stack.set(eventId, {
                    id: eventId,
                    handler: handler
                });
            else
                return false;
            return stack.get(eventId);
        },
        removeEventListener: (eventId) => {
            Array.from(eventsStack.values(), (stack) => {
                if (stack.has(eventId))
                    return stack.delete(eventId);
                else
                    return false;
            }).includes(true);
        }
    };
};
exports.Event = Event;
const GlobalMouseDown = (event) => {
    if (eventsStack.has('mousedown'))
        [...eventsStack.get('mousedown').values()].map((e) => {
            e.handler(event);
        });
};
const GlobalMouseUp = (event) => {
    if (eventsStack.has('mousedup'))
        [...eventsStack.get('mousedup').values()].map((e) => {
            e.handler(event);
        });
};
document.addEventListener('mousedown', GlobalMouseDown);
document.addEventListener('mouseup', GlobalMouseUp);
//# sourceMappingURL=index.js.map