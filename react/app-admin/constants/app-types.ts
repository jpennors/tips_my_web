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
