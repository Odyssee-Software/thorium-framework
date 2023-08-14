"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewController = void 0;
const dom_1 = require("../dom");
const _1 = require(".");
/**
 * Fonction qui génère un contrôleur de vue.
 *
 * @param paternName - Nom du modèle de conception du contrôleur.
 * @param patern - Modèle de conception de la vue.
 * @param T - Type générique pour les données du contrôleur.
 * @returns Une classe qui étend le contrôleur de base avec le modèle de conception de la vue.
*/
function ViewController(paternName, patern, T) {
    return class extends (0, _1.Controller)(paternName, patern, T) {
        constructor() {
            super(...arguments);
            this.patern = patern;
        }
        /**
         * Méthode appelée lorsque l'élément est rattaché au DOM.
         * Effectue les opérations d'initialisation et de montage de la vue.
        */
        connectedCallback() {
            let { transactions, transactions_onload } = this.$Thorium;
            Array.from([...transactions_onload.values()], (transaction) => {
                let template = transaction.template;
                if (template.attr)
                    Array.from(Object.keys(template.attr), (attributeName) => {
                        this.setAttribute(attributeName, template.attr[attributeName]);
                    });
                if (template.proto)
                    Array.from(Object.keys(template.proto), (protoKey) => {
                        this[protoKey] = template.proto[protoKey];
                    });
            });
            if (this.afterMounting && !this.isMounted)
                this.afterMounting(this);
            if (!this.isMounted)
                this.isMounted = true;
            /// Définission des éléments HTML contnenu dans le view
            this.patern["views-elements"] = Object.fromEntries(new Map(Array.from([...this.children].reverse(), (element) => {
                let { tagName } = element;
                let defaultView = this.getAttribute('defaultView');
                if (tagName == 'CONTEXT-VIEW') {
                    let contextName = element.getAttribute('context-name');
                    if (defaultView != contextName)
                        element.remove();
                    return [contextName, element];
                }
                else
                    element.remove();
            }).filter((x) => x)));
            console.log(this.patern);
            if (this.patern.defaultView) {
                this.setAttribute('context', this.patern.defaultView);
            }
        }
        /**
         * Méthode appelée lorsque l'élément est détaché du DOM.
         * Effectue les opérations de démontage de la vue.
        */
        disconnectedCallback() {
            if (this.onunmount)
                this.onunmount();
        }
        /**
         * Méthode appelée lorsqu'un attribut de l'élément est modifié.
         * Gère les changements de contexte et met à jour la vue en conséquence.
         *
         * @param name - Nom de l'attribut modifié.
         * @param oldValue - Ancienne valeur de l'attribut.
         * @param newValue - Nouvelle valeur de l'attribut.
        */
        attributeChangedCallback(name, oldValue, newValue) {
            // let slot = this.slotContainer;
            let views = this.patern.views;
            let viewsElemens = this.patern['views-elements'];
            if (this.onmutation)
                this.onmutation({ name, oldValue, newValue });
            if (this.oncontextchange)
                this.oncontextchange(newValue);
            // console.log(this.views , newValue);
            console.log({ views, viewsElemens });
            if (views && views[newValue]) {
                Array.from([...this.children].reverse(), (element) => {
                    element.remove();
                });
                dom_1.DOM.render(views[newValue], this);
            }
            else if (viewsElemens && viewsElemens[newValue]) {
                Array.from([...this.children].reverse(), (element) => {
                    element.remove();
                });
                this.appendChild(viewsElemens[newValue]);
            }
            else {
                if (oldValue) {
                    console.error(`context ${newValue} is not existing`);
                    this.setAttribute('context', oldValue);
                }
            }
        }
        /**
         * Méthode permettant de récupérer le contexte de la vue courante.
         *
         * @returns Le contexte de la vue courante.
        */
        getContext() { return this.getAttribute('context'); }
        /**
         * Méthode permettant de récupérer la liste des contextes de vue disponibles.
         *
         * @returns La liste des contextes de vue disponibles.
        */
        getContextList() {
            return [...new Set([
                    ...('views' in this.patern ? Object.keys(this.patern.views) : []),
                    ...('views-elements' in this.patern ? Object.keys(this.patern['views-elements']) : []),
                ])];
        }
        /**
         * Méthode permettant de définir le contexte de la vue.
         *
         * @param newContext - Le nouveau contexte de la vue.
        */
        setContext(newContext) {
            if (this.getContextList().includes(newContext))
                this.setAttribute('context', newContext);
            else
                console.error(`context ${newContext} is not existing`);
        }
    };
}
exports.ViewController = ViewController;
//# sourceMappingURL=view-controller.js.map