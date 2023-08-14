import { TMapDomTokenList } from ".";
export type TCommandAddMapElement = 'addMapElement';
export type TCommandAddElement = 'addElement';
export type TCommands = TCommandAddMapElement | TCommandAddElement;
export interface IOperation {
    command: TCommands;
    data: any;
}
export interface IAddMapElementOperation extends IOperation {
    command: TCommandAddMapElement;
    data: TMapDomTokenList;
}
export declare const domStack: () => {
    "__#4@#_addReferenceElement": any;
    "__#4@#_addMapReferenceElement": any;
    execute: (operations: IOperation[]) => any;
};
