"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.PaternArea = exports.ViewController = exports.ThoriumController = exports.PageController = exports.ElementController = void 0;
const page_controller_1 = require("./page-controller");
Object.defineProperty(exports, "PageController", { enumerable: true, get: function () { return page_controller_1.PageController; } });
const thorium_controller_1 = require("./thorium-controller");
Object.defineProperty(exports, "ThoriumController", { enumerable: true, get: function () { return thorium_controller_1.ThoriumController; } });
const view_controller_1 = require("./view-controller");
Object.defineProperty(exports, "ViewController", { enumerable: true, get: function () { return view_controller_1.ViewController; } });
const design_system_1 = __importDefault(require("../design-system"));
const dom_1 = require("../dom");
const transactions_1 = require("./transactions");
const effects_1 = require("./effects");
const area_1 = require("./area");
Object.defineProperty(exports, "PaternArea", { enumerable: true, get: function () { return area_1.PaternArea; } });
const DOMCSSOM = __importStar(require("dom-cssom"));
;
const ElementController = (target) => {
    const controller = {
        context(contextNameToFind) {
            /**
             * Fonction récursive pour rechercher le contexte dans les éléments parents.
             *
             * @function findUpperElementContext
             * @param node - L'élément en cours d'examen.
             * @returns L'élément contextuel correspondant ou `undefined` si aucun contexte n'est trouvé.
            */
            const findUpperElementContext = (node) => {
                // Si le parentNode est body, retourner l'élément actuel
                if (node.parentNode == document.body)
                    return node;
                if (!node.parentNode)
                    return node;
                // Si l'élément est un contexte
                if (node.attributes['context']) {
                    // Si nous cherchons le contexte par son nom, nous comparons node.name avec contextNameToFind
                    if (contextNameToFind) {
                        // Si le nom correspond, retourner l'élément
                        if (node.attributes['context'].value == contextNameToFind)
                            return node;
                        // Sinon, essayer de chercher dans les niveaux supérieurs
                        else
                            return findUpperElementContext(node.parentNode);
                    }
                    // Si le contexte est trouvé et que l'élément est différent de celui recherché pour son contexte, retourner l'élément
                    else if (node != target) {
                        return node;
                    }
                    // Sinon, essayer de chercher dans les niveaux supérieurs
                    else
                        return findUpperElementContext(node.parentNode);
                }
                // Sinon, essayer de chercher dans les niveaux supérieurs
                else
                    return findUpperElementContext(node.parentNode);
            };
            // Appeler la fonction de recherche en commençant par l'élément actuel et la convertir en type T
            return findUpperElementContext(target);
        },
        useContext(hook, contextNameToFind) {
            let srcElement = this;
            if (srcElement && 'context' in srcElement) {
                let elementContext = (contextNameToFind ? srcElement.context(contextNameToFind) : srcElement.context());
                return hook.bind(elementContext)(elementContext);
            }
            else
                return;
        },
        useVirtual(hook) {
            let srcElement = this;
            if (srcElement['_id']) {
                let virtualElement = dom_1.DOM.virtual.getElementByElementId(srcElement['_id']);
                return hook.bind(virtualElement)(virtualElement);
            }
        },
        contextPage() {
        },
        // connectedCallback(){
        //   console.log(target,'connectedCallback');
        //   let { patern } = target;
        //   let {transactions , transactions_onload} = target.$Thorium;
        //   // Parcours des transactions et transactions_onload définies dans le modèle du composant
        //   Array.from([...transactions_onload.values()] , (transaction) => {
        //     let template = transaction.template;
        //     // Application des attributs correspondant au template de la transaction
        //     if(template.attr)Array.from( Object.keys(template.attr) , (attributeName) => {
        //         if(attributeName == 'class')target.classList.add(template.attr[attributeName]);
        //         else if(attributeName == 'text') target.innerText = template.attr[attributeName];
        //         else if(attributeName == 'stylesheet'){
        //           console.warn('add style sheet')
        //           let context = target.context<CustomElement<HTMLElement , {}>>();
        //           if(context.isStyleSheetAttached){
        //             let {stylesheet} = template.attr;
        //             DesignSystem().style(stylesheet)
        //             .then((result) => {
        //               console.log(result);
        //             })
        //           }
        //         }
        //         else target.setAttribute(attributeName , (template.attr as Record<string,any>)[attributeName]);
        //     })
        //     // Application des variables et méthodes prototypes correspondant au template de la transaction
        //     if(template.proto)Array.from( Object.keys(template.proto) , (protoKey) => {
        //         target[protoKey] = (template.proto as Record<string,any>)[protoKey];
        //     })
        //   })
        //   // Application des attributs déclaré dans le patern à l'élément custom
        //   if(patern.attr)Array.from( Object.keys(patern.attr) , (attributeName) => {
        //     if(attributeName == 'class')target.classList.add(patern.attr[attributeName] as string);
        //     else if(attributeName == 'text') target.innerText = patern.attr[attributeName] as string;
        //     else if(attributeName == 'stylesheet'){
        //       console.warn('add style sheet')
        //       let context = target.context<CustomElement<HTMLElement , {}>>();
        //       if(!context.isStyleSheetAttached)target.attachStyleSheet();
        //       let { styleSheet } = patern.attr;
        //       DesignSystem().style( styleSheet as CssObject )
        //       .then((result) => {
        //         console.log(result);
        //       })
        //     }
        //     else target.setAttribute(attributeName , (patern.attr as Record<string,any>)[attributeName]);
        //   })
        //   if(target.afterMounting && !target.isMounted)target.afterMounting(target);
        //   if(!target.isMounted)target.isMounted = true;
        // },
        // disconnectedCallback(){
        //   if(target.onunmount)target.onunmount();
        // },
        // attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        //   let mutation = {attributeName:name,oldValue,newValue};
        //   if(target.onmutation)target.onmutation(mutation);
        //   if(target.oncontextchange)target.oncontextchange(newValue);
        //   target.delegateObservedMutation(mutation);
        // },
        useTransaction: (transactionName) => {
            // Récupérer le contrôleur Thorium associé au composant
            let thorium_controller = target.$Thorium;
            // Parcourir toutes les transactions du contrôleur
            Array.from([...thorium_controller.transactions.values()], (transaction) => {
                // Si le nom de la transaction correspond
                if (transaction.name == transactionName) {
                    let template = transaction.template;
                    // Appliquer les attributs de modèle à l'élément
                    if (template.attr)
                        Array.from(Object.keys(template.attr), (attributeName) => {
                            target.setAttribute(attributeName, template.attr[attributeName]);
                        });
                    // Appliquer les variables et méthodes de modèle à l'élément
                    if (template.proto)
                        Array.from(Object.keys(template.proto), (protoKey) => {
                            target[protoKey] = template.proto[protoKey];
                        });
                }
            });
        },
        addTransaction: (transaction) => {
            // Générer un ID unique pour la transaction
            let transactionId = crypto.randomUUID();
            // Ajouter la transaction au contrôleur Thorium en utilisant l'ID généré
            target.$Thorium.transactions.set(transactionId, Object.assign({ id: transactionId }, transaction));
            // Retourner l'ID de la transaction ajoutée
            return transactionId;
        },
        removeTransaction: (transactionId) => {
            return (target.$Thorium.transactions.has(transactionId) ? target.$Thorium.transactions.delete(transactionId) : null);
        },
        useEffect: (operationName, ...options) => {
            let thorium_controller = target.$Thorium;
            // Parcours de tous les effets du contrôleur Thorium
            Array.from([...thorium_controller.effects.values()], (effect) => {
                if (effect.name == operationName)
                    effect.callback(target, options);
            });
        },
        addEffect: (effect) => {
            let effectId = crypto.randomUUID();
            target.$Thorium.effects.set(effectId, Object.assign({ id: effectId }, effect));
            return effectId;
        },
        removeEffect: (effectId) => {
            return (target.$Thorium.effects.has(effectId) ? target.$Thorium.effects.delete(effectId) : null);
        },
        oberservers: new Map(),
        getObserver: (observerId) => {
            return Array.from(target.oberservers.values(), (stack) => {
                return Array.from(stack.values(), (observerInfo) => {
                    if (observerInfo._id == observerId)
                        return observerInfo;
                });
            }).flat().filter((x) => x)[0];
        },
        removeObserver: (observerId) => {
            return Array.from(target.oberservers.values(), (stack) => {
                return (stack.has(observerId) ? stack.delete(observerId) : null);
            }).flat().filter((x) => x)[0];
        },
        delegateObservedMutation: (mutation) => {
            let { attributeName, oldValue, newValue } = mutation;
            // Récupération de la pile d'observateurs correspondant à l'attribut modifié
            let stack = (target.oberservers.has(attributeName) ? target.oberservers.get(attributeName) : null);
            if (stack)
                Array.from(stack.values(), (observer) => {
                    // Vérification si l'observateur a un élément source et si cet élément est toujours présent dans le document
                    if (observer.sourceElement && document.body.contains(observer.sourceElement))
                        observer.callback(mutation);
                    // Si l'observateur n'a pas d'élément source, le rappel du callback est effectué
                    else if (!observer.sourceElement)
                        observer.callback(mutation);
                    // Si l'observateur a un élément source mais il n'est plus présent dans le document,
                    // il est supprimé de la pile d'observateurs
                    else
                        stack.delete(observer._id);
                });
        },
        addComponentObserver: (sourceElement, event, callback) => {
            let patern = ('patern' in sourceElement ? sourceElement.patern : null);
            console.warn('sourceElement : ', sourceElement);
            console.warn('patern : ', patern);
            if (patern) {
                let observedAttibutes = ('observedAttibutes' in patern ? patern.observedAttibutes : null);
                console.warn('observedAttibutes : ', observedAttibutes, event);
                if (observedAttibutes.includes(event)) {
                    return sourceElement.on(event, callback, target);
                }
            }
            else
                console.error("Seems that target sourceElement ins't a thorium-component");
        },
        on: (attributeName, callback, sourceElement) => {
            let stack = (target.oberservers.has(attributeName) ? target.oberservers.get(attributeName) : (() => {
                target.oberservers.set(attributeName, new Map());
                return target.oberservers.get(attributeName);
            })());
            let oberserverId = crypto.randomUUID();
            stack.set(oberserverId, {
                _id: oberserverId,
                attributeName: attributeName,
                target: target,
                sourceElement: sourceElement,
                callback: callback
            });
            return stack.get(oberserverId);
        },
        /// STYLES
        isStyleSheetAttached: false,
        styleSheetId: null,
        appliedStyles: [],
        attachStyleSheet: null,
        styleSheet: () => {
            if (!target.attachStyleSheet)
                target.attachStyleSheet = DOMCSSOM({ scoped: true }).appendTo(target);
            return target.attachStyleSheet;
        },
    };
    return controller;
};
exports.ElementController = ElementController;
__exportStar(require("./page-controller"), exports);
__exportStar(require("./thorium-controller"), exports);
__exportStar(require("./view-controller"), exports);
__exportStar(require("./transactions"), exports);
__exportStar(require("./effects"), exports);
__exportStar(require("./area"), exports);
/**
 * Fonction générique permettant de créer un contrôleur personnalisé pour un composant web.
 *
 * @param paternName - Le nom du modèle de design utilisé pour le composant.
 * @param patern - Le modèle de design utilisé pour le composant.
 * @param sourceClass - La classe source à partir de laquelle le contrôleur est étendu.
 * @returns La classe du contrôleur personnalisé pour le composant web.
*/
const Controller = (paternName, patern, sourceClass) => {
    var _a;
    return _a = class Controller extends sourceClass {
            static get observedAttributes() {
                return [...(patern.observedAttibutes ? patern.observedAttibutes : []), 'context'];
            }
            constructor() {
                super();
                this.isMounted = false;
                this.patern = patern;
                // Création et attache de l'ombre du web component
                if (patern.childrens) {
                    const shadow = this.attachShadow({ mode: 'open' });
                    Array.from(patern.childrens, (children) => {
                        dom_1.DOM.render(children, shadow);
                    });
                }
                // Définition des getters du contrôleur
                if (patern.__getter__ && Object.keys(patern.__getter__).length > 0) {
                    Array.from(Object.keys(patern.__getter__), (key) => {
                        let element = this;
                        this.__defineGetter__(key, () => {
                            return patern.__getter__[key](element);
                        });
                    });
                }
                // Définition des setters du contrôleur
                if (patern.__setter__ && Object.keys(patern.__setter__).length > 0) {
                    Array.from(Object.keys(patern.__setter__), (key) => {
                        let element = this;
                        this.__defineSetter__(key, (value) => {
                            return patern.__setter__[key](value, element);
                        });
                    });
                }
                // Copie des variables et méthodes vers l'instance du controller
                if (patern.proto)
                    Array.from(Object.keys(patern.proto), (protoKey) => {
                        this[protoKey] = patern.proto[protoKey];
                    });
                // Récupération des transactions et des effets depuis le modèle du web component
                let c = customElements.get(paternName);
                let { transactions, transactions_onload } = c.transactions;
                let { effects } = c.effects;
                let $Thorium = {
                    transactions,
                    get transactionList() {
                        return Array.from([...$Thorium.transactions.keys()], (key) => {
                            return { key: key, name: $Thorium.transactions.get(key).name };
                        });
                    },
                    transactions_onload,
                    effects,
                    get effectList() {
                        return Array.from([...$Thorium.effects.keys()], (key) => {
                            return { key: key, name: $Thorium.effects.get(key).name };
                        });
                    },
                };
                this.$Thorium = $Thorium;
                if (this.beforeMounting)
                    this.beforeMounting();
            }
            connectedCallback() {
                console.log(this.parentNode, 'connectedCallback');
                // Object.assign(this , ElementController(this as any));
                let { patern, $Thorium } = this;
                let { transactions, transactions_onload } = $Thorium;
                // Parcours des transactions et transactions_onload définies dans le modèle du composant
                Array.from([...transactions_onload.values()], (transaction) => {
                    let template = transaction.template;
                    // Application des attributs correspondant au template de la transaction
                    if (template.attr)
                        Array.from(Object.keys(template.attr), (attributeName) => {
                            if (attributeName == 'class')
                                this.classList.add(template.attr[attributeName]);
                            else if (attributeName == 'text')
                                this.innerText = template.attr[attributeName];
                            else if (attributeName == 'stylesheet') {
                                console.warn('add style sheet');
                                let context = this.context();
                                if (context.isStyleSheetAttached) {
                                    let { stylesheet } = template.attr;
                                    (0, design_system_1.default)().style(stylesheet)
                                        .then((result) => {
                                        console.log(result);
                                    });
                                }
                            }
                            else
                                this.setAttribute(attributeName, template.attr[attributeName]);
                        });
                    // Application des variables et méthodes prototypes correspondant au template de la transaction
                    if (template.proto)
                        Array.from(Object.keys(template.proto), (protoKey) => {
                            this[protoKey] = template.proto[protoKey];
                        });
                });
                console.log(patern.attr);
                // Application des attributs déclaré dans le patern à l'élément custom
                // if(patern.attr)Array.from( Object.keys(patern.attr) , (attributeName) => {
                //   alert(attributeName)
                //   if(attributeName == 'class')this.classList.add(patern.attr[attributeName] as string);
                //   else if(attributeName == 'text') this.innerText = patern.attr[attributeName] as string;
                //   else if(attributeName == 'stylesheet'){
                //     console.warn('add style sheet')
                //     let context = this.context();
                //     if(!context.isStyleSheetAttached)this.attachStyleSheet();
                //     let { styleSheet } = patern.attr;
                //     DesignSystem().style( styleSheet as CssObject )
                //     .then((result) => {
                //       console.log(result);
                //     })
                //   }
                //   else this.setAttribute(attributeName , (patern.attr as Record<string,any>)[attributeName]);
                // })
                if (this.afterMounting && !this.isMounted)
                    this.afterMounting(this);
                if (!this.isMounted)
                    this.isMounted = true;
            }
            ;
            disconnectedCallback() {
                if (this.onunmount)
                    this.onunmount();
            }
            ;
            attributeChangedCallback(name, oldValue, newValue) {
                let mutation = { attributeName: name, oldValue, newValue };
                if (this.onmutation)
                    this.onmutation(mutation);
                if (this.oncontextchange)
                    this.oncontextchange(newValue);
                if (this.delegateObservedMutation)
                    this.delegateObservedMutation(mutation);
            }
            ;
        },
        _a.transactions = (0, transactions_1.Transactions)(),
        _a.effects = (0, effects_1.Effects)(),
        _a.connector = () => {
            return (connectorTemplate) => {
                return {
                    localName: paternName,
                    attr: (connectorTemplate && connectorTemplate.attr ? connectorTemplate.attr : {}),
                    childrens: (connectorTemplate && connectorTemplate.childrens ? connectorTemplate.childrens : []),
                    proto: (connectorTemplate && connectorTemplate.proto ? connectorTemplate.proto : {})
                };
            };
        },
        _a;
};
exports.Controller = Controller;
//# sourceMappingURL=index.js.map