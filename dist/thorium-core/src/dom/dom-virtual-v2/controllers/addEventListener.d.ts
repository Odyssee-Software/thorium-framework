import { VirtualElement } from "../virtual-element";
import { TEventName, TEventHandler } from "../events";
/** Ajoute un écouteur d'événement à un élément virtuel */
export declare const addEventListener: (ve: VirtualElement, eventName: TEventName, handler: TEventHandler) => any;
