import { VirtualElement } from "../virtual-element";
export type TEventName = 'mousedown' | 'mouseup' | 'keydown' | 'keyup' | string;
export type TEventHandler = (event: MouseEvent | KeyboardEvent, ve?: VirtualElement) => void;
export type TEvent = {
    id: string;
    handler: TEventHandler;
};
export type TEventStack = Map<string, TEvent>;
export declare const Event: () => {
    addEventListener: (eventName: TEventName, handler: (event: MouseEvent | KeyboardEvent) => void) => false | TEvent;
    removeEventListener: (eventId: any) => void;
};
