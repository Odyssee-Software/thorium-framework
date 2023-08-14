import { DOM , CustomElement , NodeTemplate } from 'thorium-framework';

/**
 * Dans cette exemple nous allons voir les bases de la manipulation DOM avec thorium
*/

/** Création d'un component custom */

interface MyElementControls{
  /** Méthode custom , elle lancera une alerte */
  printAlert():void;
}

type MyCustomElement = CustomElement<MyElementControls , HTMLDivElement>

export let MyComponent = ():NodeTemplate<MyCustomElement> => {

  return <div
    _textContent = {'Hello World !'}
    _afterMounting = {(target:MyCustomElement) => {
      target.printAlert();
    }}
    _printAlert = {() => {
      alert('Hello im an alert launched by a cutomComponent');
    }}
  />;

}

/** 
 * thorium-DOM n'etant pas virtuel, le point d'entrée doit s'exécuter après le chargement du DOM 
 * Il est recommandé d'utilise thorium-virtual-dom
*/
window.onload = () => {

  DOM.render( <MyComponent/> , document.body );

}