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
    slug: string;
    parentName: string | null;
    parentId: string | null;
    disabled: boolean;
    deleted_at: Date | null;
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

export interface Log {
    id: string;
    description: string;
    level: string;
    routeUri: string | null;
    routeMethod: string | null;
    geoipContinent: string | null;
    geoipTimezone: string | null;
    geoipCountry: string | null;
    geoipStateName: string | null;
    geoipCity: string | null;
}

export interface VisitorStat {
    formatted_date: Date;
    visitors: number;
}

export interface SearchTagStat {
    count: number;
    id: string;
    name: string;
    slug: string;
    parent_id: string | null;
    is_parent: boolean;
}

