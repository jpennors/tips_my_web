export interface AuthToken {
    token: string;
    expiration: number;
}

export interface Contact {
    id: string;
    email: string;
    message: string;
    createdAt: Date;
}

export interface WebsiteSuggestion {
    id: string;
    url: string;
    description: string;
    createdAt: Date;
}

export interface Tag {
    id: string;
    name: string;
    parentId: string | null;
    parentName: string | null;
}

export interface ResourceTag {
    tagId: string;
    belonging: number;
    tag: Tag;
}

export interface TagsMap {
    [id: string]: Tag;
}

export interface Resource {
    id: string;
    name: string;
    description: string;
    url: string;
    iconFilename: string;
    locale: string;
    score: number;
    interfaceScore: number;
    priceId: string;
    typeId: string;
    likes: number;
    createdAt: Date;
    tags: ResourceTag[];
    priceName: string;
    typeName: string;
}

export interface Price {
    id: string;
    name: string;
}

export interface ResourceType {
    id: string;
    name: string;
}
