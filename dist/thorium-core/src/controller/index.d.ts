import { PageController } from "./page-controller";
import { ThoriumController } from "./thorium-controller";
import { ViewController, IViewController, ViewDesignPatern } from "./view-controller";
import { DesignPatern, CustomElement } from "../design-system";
import { NodeTemplate } from "../dom";
import { ConnectorTemplate } from "../connector";
import { PaternArea } from "./area";
import { VirtualElement } from "../dom/dom-virtual-v2";
import * as DOMCSSOM from 'dom-cssom';
export interface CustomElementController {
    /**
      * Récupère le contexte de l'élément personnalisé.
      *
      * @method context
      * @typeparam T - Le type de l'élément contextuel recherché.
      * @param contextNameToFind - Le nom optionnel du contexte à rechercher.
      * @returns L'élément contextuel correspondant ou `undefined` si aucun contexte n'est trouvé.
    */
    context<T>(contextNameToFind?: string): T;
    useContext<T>(hook: (context: T) => void): void;
    contextPage<T>(): T;
    useVirtual(hook: (virtualElement: VirtualElement) => void): void;
    /** Gestionnaire de cycle de vie : connectedCallback */
    connectedCallback(): void;
    /** Gestionnaire de cycle de vie : disconnectedCallback */
    disconnectedCallback(): void;
    /** Gestionnaire de changement d'attribut observé */
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    /**
       * Active une transaction spécifique sur le composant.
       *
       * @method useTransaction
       * @param transactionName - Le nom de la transaction à activer.
      */
    useTransaction: (transactionName: string) => void;
    /**
       * Ajoute une transaction au contrôleur Thorium.
       *
       * @method addTransaction
       * @param transaction - La transaction à ajouter.
       * @returns L'ID de la transaction ajoutée.
      */
    addTransaction: (transaction: any) => string;
    /**
      * Supprime une transaction au contrôleur Thorium.
      *
      * @method removeTransaction
      * @param transactionId - L'ID de la transaction à supprimer.
      * @returns True si la transaction a été supprimée avec succès, sinon null.
    */
    removeTransaction: (transactionId: string) => boolean;
    /**
      * Active un effet spécifique du contrôleur Thorium.
      *
      * @method useEffect
      * @param operationName - Le nom de l'effet à activer.
      * @param options - Options supplémentaires à transmettre à l'effet.
    */
    useEffect: (operationName: string, ...options: any[]) => void;
    /**
      * Ajoute un nouvel effet au contrôleur Thorium.
      *
      * @method addEffect
      * @param effect - L'effet à ajouter, représenté par un objet contenant les propriétés `name` (nom de l'effet) et `callback` (fonction callback de l'effet).
      * @returns L'ID de l'effet ajouté.
    */
    addEffect: (effect: any) => string;
    /**
      * Supprime un effet du contrôleur Thorium.
      *
      * @method removeEffect
      * @param effectId - L'ID de l'effet à supprimer.
      * @returns `true` si l'effet a été supprimé avec succès, sinon `false`.
    */
    removeEffect: (effectId: string) => boolean;
    /**
      * Map contenant les observateurs pour chaque attribut.
      * Chaque clé de la map correspond à un nom d'attribut,
      * et chaque valeur est un map contenant les observateurs
      * associés à cet attribut.
    */
    oberservers: Observers;
    /**
      * Récupère l'observateur correspondant à l'ID spécifié.
      *
      * @param observerId L'ID de l'observateur à récupérer.
      * @returns L'observateur correspondant à l'ID spécifié, s'il existe ; sinon, null.
    */
    getObserver: (observerId: string) => Observer;
    /**
      * Supprime l'observateur correspondant à l'ID spécifié.
      *
      * @param observerId L'ID de l'observateur à supprimer.
      * @returns True si l'observateur a été supprimé avec succès ; sinon, false.
    */
    removeObserver: (observerId: string) => boolean;
    /**
      * Déclenche les rappels des observateurs en réponse à une mutation observée.
      *
      * @param mutation La mutation observée.
    */
    delegateObservedMutation: (mutation: Mutation) => void;
    /**
      * Ajoute un observateur pour surveiller les modifications d'attributs d'un composant tiers.
      * @param sourceElement L'élément personnalisé ou l'élément HTML correspondant au composant tiers.
      * @param event L'événement correspondant à la modification d'attribut à observer.
      * @param callback La fonction de rappel à appeler lorsque la modification d'attribut est détectée.
      * @returns L'observateur créé pour la surveillance des modifications d'attributs.
      * @throws Une erreur si `sourceElement` n'est pas un composant Thorium valide.
    */
    addComponentObserver: (sourceElement: CustomElement<Element, {}> | Element, event: string, callback: (mutation: Mutation) => void) => Observer;
    /**
      * Attache un observateur à un attribut spécifique d'un élément personnalisé ou d'un élément DOM.
      * L'observateur sera déclenché lorsqu'un changement est détecté sur l'attribut spécifié.
      *
      * @param attributeName - Le nom de l'attribut à observer.
      * @param callback - La fonction de rappel qui sera exécutée lorsque le changement est détecté.
      *                   La fonction de rappel reçoit un argument contenant des informations sur la mutation.
      * @param sourceElement - (Facultatif) L'élément personnalisé ou l'élément DOM à observer.
      *                       Si non spécifié, l'observateur sera attaché à l'élément courant.
      * @returns L'observateur créé, qui peut être utilisé pour le détacher ultérieurement.
    */
    on: (attributeName: string, callback: (mutation: Mutation) => void, sourceElement?: CustomElement<Element, {}> | Element) => Observer;
    isStyleSheetAttached: boolean;
    styleSheetId: string;
    appliedStyles: string[];
    attachStyleSheet: DOMCSSOM;
    styleSheet: () => DOMCSSOM;
}
export declare const ElementController: <X, Y = null, Z = null>(target: CustomElement<HTMLElement, X, Y, Z>) => CustomElementController;
export { PageController, ThoriumController, ViewController, IViewController, ViewDesignPatern, PaternArea };
export * from "./page-controller";
export * from "./thorium-controller";
export * from "./view-controller";
export * from "./transactions";
export * from "./effects";
export * from "./area";
/**
 * Fonction générique permettant de créer un contrôleur personnalisé pour un composant web.
 *
 * @param paternName - Le nom du modèle de design utilisé pour le composant.
 * @param patern - Le modèle de design utilisé pour le composant.
 * @param sourceClass - La classe source à partir de laquelle le contrôleur est étendu.
 * @returns La classe du contrôleur personnalisé pour le composant web.
*/
export declare const Controller: <T, X, Z>(paternName: string, patern: DesignPatern<T>, sourceClass: any) => {
    new (): {
        [x: string]: any;
        patern: DesignPatern<T>;
        isMounted: boolean;
        connectedCallback(): void;
        disconnectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    };
    [x: string]: any;
    transactions: import("./transactions").TransactionPatern<unknown>;
    effects: import("./effects").EffectPatern<unknown>;
    connector: () => (connectorTemplate?: ConnectorTemplate<T>) => NodeTemplate<T>;
    readonly observedAttributes: string[];
};
/**
 * Représente une mutation d'attribut sur un élément.
*/
export interface Mutation {
    /** Le nom de l'attribut qui a été modifié */
    attributeName: string;
    /** La valeur précédente de l'attribut avant la modification */
    oldValue: string;
    /** La nouvelle valeur de l'attribut après la modification */
    newValue: string;
}
/**
 * Type utilisé pour représenter les observateurs.
 * Il s'agit d'un mappage entre le nom de l'attribut observé et la pile d'observateurs associée.
*/
export type Observers = Map<string, ObserversStack>;
/**
 * Type utilisé pour représenter une pile d'observateurs.
 * Il s'agit d'un mappage entre l'identifiant de l'observateur et l'objet observateur lui-même.
 */
export type ObserversStack = Map<string, Observer>;
/**
 * Représente un observateur pour les mutations d'attributs.
*/
export interface Observer {
    /** L'identifiant unique de l'observateur */
    _id: string;
    /** Le nom de l'attribut observé */
    attributeName: string;
    /** La cible de l'observateur, généralement un élément personnalisé */
    target?: CustomElement<Element, {}>;
    /** L'élément source associé à l'observateur */
    sourceElement?: CustomElement<Element, {}> | Element;
    /** La fonction de rappel à appeler lorsque la mutation d'attribut est observée */
    callback: (mutation: Mutation) => void;
}
