"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRouter = exports.PageLink = exports.Page = exports.RootPage = void 0;
const design_system_1 = __importDefault(require("../design-system"));
const __1 = __importDefault(require(".."));
const RootPage = (options) => {
    return (0, exports.Page)(Object.assign(Object.assign({}, options), { name: '/' }));
};
exports.RootPage = RootPage;
const Page = (options) => {
    let patern = (0, design_system_1.default)().register('page', {
        baseName: options.name,
        attr: {},
        childrens: [{ localName: 'slot' }],
        proto: {}
    });
    let connector = patern.connector()(Object.assign(Object.assign({}, options), { attr: { context: `${options.name}-page` } }));
    __1.default.pages.set({
        name: `/${options.name}`,
        component: connector,
    });
    return connector;
};
exports.Page = Page;
const PageLink = (props) => {
    console.log({ props });
    return {
        localName: 'p',
        childrens: [
            { localName: 'a', proto: { textContent: props.title } }
        ],
        proto: {
            onmousedown: () => {
                window.location.hash = props.to;
            }
        }
    };
};
exports.PageLink = PageLink;
const PageRouter = (props) => {
    if (props && 'pages' in props) {
        let { pages } = props;
        return pages;
    }
    else
        return null;
};
exports.PageRouter = PageRouter;
//# sourceMappingURL=page.js.map