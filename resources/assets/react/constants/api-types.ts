/* eslint-disable @typescript-eslint/camelcase */

export interface APITag {
    id: string;
    name: string;
    parent_id: string | null;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    parent: {
        id: string;
        name: string;
        parent_id: string | null;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
    };
    resource_tags: APITag[];
}

export interface APIResource {
    id: string;
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
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    search_score: number;
}

