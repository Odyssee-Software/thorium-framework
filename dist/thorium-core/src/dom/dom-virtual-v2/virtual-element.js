"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualElement = void 0;
const dom_render_1 = require("../dom-render");
const controllers_1 = require("./controllers");
class VirtualElement {
    constructor(initOptions) {
        this.parent_key = null;
        this.key = null;
        this.element = null;
        this.patern = {
            localName: null,
            attr: null,
            proto: null,
            childrens: []
        };
        this.addEventListener = (eventName, callback) => {
            return (0, controllers_1.addEventListener)(this, eventName, callback);
        };
        this.render = () => {
            let _fragment = (0, controllers_1.createDocumentFragment)(this.key);
            let parent = (0, controllers_1.getElementByElementId)(this.parent_key);
            if (this.element.children.length > 0) {
                (0, controllers_1.removeElement)(this);
                (0, controllers_1.createNodeElement)(_fragment, parent.element);
            }
            else {
                let e = (0, dom_render_1.DOMRender)(_fragment, parent.element);
                this.element.replaceWith(e);
                this.element = e;
                e['_id'] = this.key;
            }
        };
        this.appendChild = (child) => { return (0, controllers_1.appendChild)(this, child); };
        this.remove = () => {
            return (0, controllers_1.removeElement)(this);
        };
        this.setAttribute = (attributeName, attributeValue) => {
            this.patern.attr[attributeName] = attributeValue;
            // this.render();
        };
        this.getAttribute = (attributeName) => {
            return (attributeName ? this.patern.attr[attributeName] : this.patern.attr);
        };
        this.getElementByElementId = controllers_1.getElementByElementId;
        this.setProperty = (propertyName, value) => {
            return (0, controllers_1.setProperty)(this, propertyName, value);
        };
        if (initOptions.parent_key)
            this.parent_key = initOptions.parent_key;
        if (initOptions.key)
            this.key = initOptions.key;
        if (initOptions.element)
            this.element = initOptions.element;
        if (initOptions.patern)
            this.patern = initOptions.patern;
    }
    /** Renvoie l'élément virtuel parent de l'élément virtuel */
    get parentNode() { return (0, controllers_1.getParentNode)(this); }
    /** Renvoie la liste des éléments virtuels enfants de l'élément virtuel */
    get childNodes() { return (0, controllers_1.getChildNodes)(this); }
    /** Renvoie l'élément virtuel suivant (le frère suivant) de l'élément virtuel */
    get nextSibling() { return (0, controllers_1.getNextSibling)(this); }
    /** Renvoie l'élément virtuel précédent (le frère précédent) de l'élément virtuel */
    get previousSibling() { return (0, controllers_1.getPreviousSibling)(this); }
    /** Renvoie le nom de balise de l'élément virtuel */
    get tagName() { return (0, controllers_1.getTagName)(this); }
    get childrens() {
        return this.patern.childrens ? Array.from(this.patern.childrens, (key) => {
            return (0, controllers_1.getElementByElementId)(key);
        }).filter(x => x) : [];
    }
    get children() {
        const virtualElement = this;
        let childrens = this.childrens;
        let childrensMap = new Map(childrens.reduce((arr, ve) => {
            if (ve.patern.attr && 'name' in ve.patern.attr)
                arr.push([ve.patern.attr.name, ve]);
            return arr;
        }, []));
        let childrensByName = Object.fromEntries(childrensMap);
        return Object.assign(Object.assign({}, childrensByName), { 
            /** ajout d'une clée enfant */
            addKey(key) {
                if ('childrens' in virtualElement.patern == false)
                    virtualElement.patern.childrens = [];
                if (!virtualElement.patern.childrens.includes(key))
                    virtualElement.patern.childrens.push(key);
                else
                    return null;
            },
            /** suppression d'une clée enfant */
            removeKey(key) {
                let keyId = virtualElement.patern.childrens.findIndex((k) => k == key);
                console.log(virtualElement.patern.childrens, keyId);
                delete virtualElement.patern.childrens[keyId];
                virtualElement.patern.childrens = virtualElement.patern.childrens.filter((x => x));
            } });
    }
    set innerHTML(value) {
        (0, controllers_1.setInnerHTML)(this, value);
    }
    clone() {
        return (0, controllers_1.cloneElement)(this);
    }
}
exports.VirtualElement = VirtualElement;
//# sourceMappingURL=virtual-element.js.map