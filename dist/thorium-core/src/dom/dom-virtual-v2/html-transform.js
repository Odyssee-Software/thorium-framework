"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlToNodeTemplate = exports.getPrototypeName = exports.isPrototypeAttribute = void 0;
const isPrototypeAttribute = (attributeName) => {
    return attributeName[0] == '_' ? true : false;
};
exports.isPrototypeAttribute = isPrototypeAttribute;
const getPrototypeName = (attributeName) => {
    return attributeName.slice(1);
};
exports.getPrototypeName = getPrototypeName;
const htmlToNodeTemplate = (srcElement) => {
    /// Attributes & Prototypes
    let elementAttributes = srcElement.attributes;
    let attributesKey = Object.keys(elementAttributes);
    let [attributesMap, prototypesMap] = attributesKey.reduce((arr, key) => {
        let attribute = elementAttributes[key];
        let attributeName = attribute.name;
        let attributeValue = attribute.value;
        // attributes
        if (!(0, exports.isPrototypeAttribute)(attributeName))
            arr[0].push([attributeName, attributeValue]);
        // prototypes
        else
            arr[1].push([(0, exports.getPrototypeName)(attributeName), eval(attributeValue)]);
        return arr;
    }, [[], []]);
    let attributes = Object.fromEntries(new Map(attributesMap));
    let prototypes = Object.fromEntries(new Map(prototypesMap));
    /// Childrens
    let childrens = [];
    if (srcElement.children.length > 0)
        childrens = [...srcElement.children].reduce((arr, element) => {
            arr.push((0, exports.htmlToNodeTemplate)(element));
            return arr;
        }, []);
    return {
        localName: String(srcElement.tagName).toLowerCase(),
        attr: attributes,
        childrens: childrens,
        proto: prototypes,
    };
};
exports.htmlToNodeTemplate = htmlToNodeTemplate;
//# sourceMappingURL=html-transform.js.map