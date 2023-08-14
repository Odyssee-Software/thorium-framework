import { DesignPatern } from '../design-system';
import { NodeTemplate } from '../dom/dom-render';
/**
 * Interface décrivant le patron de conception pour une vue.
*/
export interface ViewDesignPatern<T> extends DesignPatern<T> {
    defaultView: string;
    views: Record<string, NodeTemplate<any>>;
    'views-elements'?: Record<string, HTMLElement>;
}
/**
 * Interface décrivant les fonctionnalités d'un contrôleur de vue.
*/
export interface IViewController {
    /** Récupère le contexte de la vue courante */
    getContext(): string;
    /** Récupère la liste des contextes de vue disponibles */
    getContextList(): string[];
    /** Définit le contexte de la vue */
    setContext(context: string): void;
}
/**
 * Fonction qui génère un contrôleur de vue.
 *
 * @param paternName - Nom du modèle de conception du contrôleur.
 * @param patern - Modèle de conception de la vue.
 * @param T - Type générique pour les données du contrôleur.
 * @returns Une classe qui étend le contrôleur de base avec le modèle de conception de la vue.
*/
export declare function ViewController<T, X, Z>(paternName: string, patern: ViewDesignPatern<T>, T: any): any;
