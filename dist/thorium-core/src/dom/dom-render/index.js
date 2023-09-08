"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMRender = void 0;
// import { body } from "../dom-virtual";
const __1 = require("../..");
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
const DOMRender = (template, parentNode) => {
    console.log(parentNode);
    if (!template)
        return;
    // Vérifie si le template est local
    let isLocal = (template && template.localName && template.localName.includes('local-') ? true : false);
    // Crée un nouvel élément DOM en fonction du template
    const element = (() => {
        if (!isLocal)
            return document.createElement(template.localName);
        else {
            let tag = template.localName.split('local-').filter((x) => x).join('');
            return document.createElement(tag, { is: template.localName });
        }
    })();
    element.patern = template;
    let controller = (0, __1.ElementController)(element);
    Object.keys(controller).forEach(key => {
        element[key] = (typeof controller[key] == 'function' ? controller[key].bind(element) : controller[key]);
    });
    // Parcours les enfants du template et les ajoute à l'élément parent
    if (template.childrens)
        Array.from(template.childrens, (childTemplate) => {
            let e = (0, exports.DOMRender)(childTemplate, element);
            // // Design pattern avec la méthode `connectedCallback`
            // if('connectedCallback' in e)element.appendChild(e);
            // // Autre cas sans design pattern
            // else {
            //   // Appel à la méthode `beforeMounting` du prototype si elle existe
            //   (childTemplate.proto && childTemplate.proto.beforeMounting ? childTemplate.proto.beforeMounting(e) : null);
            //   element.appendChild(e);
            //   // Appel à la méthode `afterMounting` du prototype si elle existe
            //   (childTemplate.proto && childTemplate.proto.afterMounting ? childTemplate.proto.afterMounting(e) : null);
            // }
        });
    // Implémente les variables et méthodes au nouvel élément DOM
    if (template.proto)
        Array.from(Object.keys(template.proto), (protoKey) => {
            element[protoKey] = template.proto[protoKey];
        });
    // Applique les attributs au nouvel élément DOM
    if (template.attr)
        Array.from(Object.keys(template.attr), (attributeName) => {
            if (attributeName == 'text')
                element.innerText = template.attr[attributeName];
            else if (attributeName == 'stylesheet') {
                // Récuperation du context
                let context = element.context();
                // Récuperation ou création de la feuille de style associé
                let styleSheet = context.styleSheet();
                // Récuperation du token de la fuille de style
                let styleToken = template.attr[attributeName];
                // REcuperation de la fuille de style enregistrée dans le systeme
                let styleSheetObject = __1.StyleSheets.get(styleToken);
                // Récuperation des feuilles de style appliquée au context
                let contextAppliedStyles = context.appliedStyles;
                if (!contextAppliedStyles.includes(styleToken)) {
                    context.appliedStyles.push(template.attr[attributeName]);
                    addElementCompiledCssProperties(styleSheet, styleSheetObject);
                }
            }
            else
                element.setAttribute(attributeName, template.attr[attributeName]);
        });
    if (parentNode && (parentNode instanceof Element || parentNode instanceof ShadowRoot)) {
        if ('beforeMounting' in element)
            element.afterMounting(element);
        parentNode.appendChild(element);
        if ('afterMounting' in element)
            element.afterMounting(element);
    }
    return element;
};
exports.DOMRender = DOMRender;
const addElementStyleSheet = (styleSheetContext, styleSheetObject) => {
    (0, __1.DesignSystem)().style(styleSheetObject)
        .then((result) => {
        let { nodes } = result.root;
        console.log(result);
        Array.from(nodes, (rule) => {
            let { selector, source, nodes } = rule;
            Array.from(nodes, (declaration) => {
                return [declaration.prop, declaration.value];
            }).reduce((arr, declaration) => {
                let insertCssValue = (arr, declaration, iterator = 0) => {
                    let [prop, value] = declaration;
                    if (!arr[iterator])
                        arr[iterator] = {};
                    let object = arr[iterator];
                    if (prop in object == false) {
                        object[prop] = value;
                        return arr;
                    }
                    else
                        return insertCssValue(arr, declaration, iterator + 1);
                };
                return insertCssValue(arr, declaration);
            }, []).forEach((cssObject) => {
                styleSheetContext.add(selector, cssObject);
            });
        });
    });
};
const addElementCompiledCssProperties = (styleSheetContext, stylePatern) => {
    let { result } = stylePatern;
    let { nodes } = result.root;
    Array.from(nodes, (rule) => {
        let { selector, source, nodes } = rule;
        Array.from(nodes, (declaration) => {
            return [declaration.prop, declaration.value];
        }).reduce((arr, declaration) => {
            let insertCssValue = (arr, declaration, iterator = 0) => {
                let [prop, value] = declaration;
                if (!arr[iterator])
                    arr[iterator] = {};
                let object = arr[iterator];
                if (prop in object == false) {
                    object[prop] = value;
                    return arr;
                }
                else
                    return insertCssValue(arr, declaration, iterator + 1);
            };
            return insertCssValue(arr, declaration);
        }, []).forEach((cssObject) => {
            styleSheetContext.add(selector, cssObject);
        });
    });
};
//# sourceMappingURL=index.js.map