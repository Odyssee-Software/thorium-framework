"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effects = void 0;
/**
 * Fonction permettant de créer un modèle de gestion des effets utilisés par un élément personnalisé.
 *
 * @template Z - Le type de nom d'effet.
 * @returns Un objet contenant les méthodes pour gérer les effets.
 */
const Effects = () => {
    return new class {
        constructor() {
            this.effects = new Map();
        }
        /**
         * Ajoute un nouvel effet à la collection d'effets.
         *
         * @method set
         * @param {IEffect} effect - L'effet à ajouter.
         * @returns {string} L'identifiant unique de l'effet ajouté.
        */
        set(effect) {
            let effectId = crypto.randomUUID();
            this.effects.set(effectId, Object.assign({ id: effectId }, effect));
            return effectId;
        }
        /**
         * Récupère la fonction de rappel associée à un effet à partir de son nom.
         *
         * @method get
         * @param {string} effectName - Le nom de l'effet à récupérer.
         * @returns {Function} La fonction de rappel associée à l'effet, ou undefined si l'effet n'est pas trouvé.
        */
        get(effectName) {
            return Array.from([...this.effects.values()], (effect) => {
                if (effect.name == effectName)
                    return effect.callback;
            })[0];
        }
    };
};
exports.Effects = Effects;
//# sourceMappingURL=index.js.map