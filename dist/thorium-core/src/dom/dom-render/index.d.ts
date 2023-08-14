import { ConnectorTemplate } from "../..";
/**
 * Représente la structure d'un nœud dans un template DOM.
 * Il étend `ConnectorTemplate` pour inclure des informations spécifiques au DOM.
 *
 * @template T - Type de l'élément DOM représenté par le nœud du template.
*/
export interface NodeTemplate<T> extends ConnectorTemplate<T> {
    /** Nom local du composant */
    localName: string;
    /** Étend un composant existant */
    extends?: string;
}
/**
 * Permet de générer un élément à partir d'un template DOM.
 *
 * Cette fonction prend un objet `template` représentant la structure du nœud DOM à générer.
 * Elle crée un nouvel élément DOM correspondant à la structure spécifiée dans le template.
 * La fonction renvoie l'élément nouvellement créé.
 *
 * @param template - Le template représentant la structure du nœud DOM à générer.
 * @returns L'élément DOM généré à partir du template.
*/
export declare const DOMRender: <T>(template: NodeTemplate<T>, parentNode?: Element | ShadowRoot) => T;
