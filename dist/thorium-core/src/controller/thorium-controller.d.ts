import { DesignPatern } from '../design-system';
/**
 * Fonction qui génère un contrôleur Thorium personnalisé.
 *
 * Cette fonction prend trois paramètres :
 * @param paternName - Le nom du patron de conception associé au contrôleur.
 * @param patern - Le patron de conception associé au contrôleur.
 * @param T - Le type de données du contrôleur.
 *
 * La fonction renvoie une classe qui étend le contrôleur de base (`Controller`) en utilisant le patron de conception spécifié.
 * Le contrôleur Thorium personnalisé est ainsi créé.
 *
 * @returns La classe du contrôleur Thorium personnalisé.
*/
export declare function ThoriumController<T, X, Z>(paternName: string, patern: DesignPatern<T>, T: any): any;
