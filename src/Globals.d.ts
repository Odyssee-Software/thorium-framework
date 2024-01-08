// declare type JSXElement = HTMLElement & {
//   localname?:string
// }

declare interface JSXIntrinsicElement {

  element: import('thorium-core').JSXNodeTemplate<T>;
  div: import('thorium-core').JSXNodeTemplate<T>;
  button: import('thorium-core').JSXNodeTemplate<T>;
  form: import('thorium-core').JSXNodeTemplate<T>;
  h1: import('thorium-core').JSXNodeTemplate<T>;
  h2: import('thorium-core').JSXNodeTemplate<T>;
  h3: import('thorium-core').JSXNodeTemplate<T>;
  h4: import('thorium-core').JSXNodeTemplate<T>;

}

declare module JSX {

  type IntrinsicElements = JSXIntrinsicElement;

}