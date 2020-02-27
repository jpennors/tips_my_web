/* eslint-disable @typescript-eslint/camelcase */

interface APIBasicModel {
    id: string;
    created_at: Date;
    updated_at: Date | null;
    deleted_at?: Date | null;
}

interface APIBasicTag extends APIBasicModel {
    name: string;
    slug: string;
    parent_id: string | null;
}

export interface APITag extends APIBasicTag {
    parent: APIBasicTag;
    resource_tags: APITag[];
}

export interface APIPrice extends APIBasicModel {
    slug: string;
    name: string;
}

export interface APIResource extends APIBasicModel {
    name: string;
    description: string;
    url: string;
    image: string; // filename ('xxx.png')
    language: string; // locale ('fr')
    score: number;
    interface: number;
    price_id: string;
    type_id: string;
    like: number;
    search_score: number;
    price: APIPrice;
}
