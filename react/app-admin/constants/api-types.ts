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
