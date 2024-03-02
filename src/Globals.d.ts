// declare type JSXElement = HTMLElement & {
//   localname?:string
// }

declare interface JSXIntrinsicElement {

  [elementName: string]: import('thorium-core').JSXNodeTemplate<{} , {}>;

}

declare module JSX {

  type IntrinsicElements = JSXIntrinsicElement;

}