"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThoriumController = void 0;
const _1 = require(".");
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
function ThoriumController(paternName, patern, T) {
    return class extends (0, _1.Controller)(paternName, patern, T) {
    };
}
exports.ThoriumController = ThoriumController;
//# sourceMappingURL=thorium-controller.js.map