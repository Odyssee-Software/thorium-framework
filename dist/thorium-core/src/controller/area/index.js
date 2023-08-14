"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaternArea = void 0;
// export const ThoriumAreaPatern = DesignSystem().register('thorium' , {
//   baseName : 'area',
//   childrens : [
//     { localName : 'start' },
//     { localName : 'slot' },
//     { localName : 'end' }
//   ]
// });
const PaternArea = (patern) => {
    return {
        localName: 'thorium-area',
        attr: (patern && patern.attr ? patern.attr : {}),
        childrens: [
            { localName: 'start' },
            { localName: 'slot' },
            ...(patern && patern.childrens ? patern.childrens : []),
            { localName: 'end' },
        ]
    };
};
exports.PaternArea = PaternArea;
//# sourceMappingURL=index.js.map