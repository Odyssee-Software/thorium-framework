/** Crée un fragment de document virtuel, qui peut être utilisé comme un conteneur temporaire pour d'autres éléments virtuels avant de les ajouter au DOM */
export declare const createDocumentFragment: (elementId: string) => import("..").ITemplateReference | {
    childrens: any[];
};
