/* eslint-disable @typescript-eslint/camelcase */

export interface LoginAPIResponse {
    token: string;
}

export enum APIAuthenticationErrors {
    EXPIRED_TOKEN = 'expired_token',
    UNKNOWN_TOKEN = 'unknown_token',
    UNDEFINED_TOKEN = 'undefined_token'
}

export enum APILoginErrors {
    BAD_CREDENTIALS = 'bad_credentials',
}

export interface APIContact {
    id: string;
    email: string;
    message: string;
    created_at: Date;
    updated_at: Date;
}

export interface APIWebsiteSuggestion {
    id: string;
    url: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

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
