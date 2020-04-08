export enum SIZES {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

export enum VIEWPORT_BREAKPOINTS {
    MOBILE = 450,
}

export enum PRICING_OPTIONS {
    FREE = 'Free',
    FREEMIUM = 'Freemium',
    PAID = '$$',
}

export enum LOCALES {
    FRENCH = 'fr',
}

export const RESOURCES_BASE_URL = '/api/resources/image/';
export const DEFAULT_RESOURCE_URL = '/images/default-resource-img.jpg';

export enum MAIN_APP_ROUTES {
    HOME = '/',
    SEARCH = '/search',
    RESULTS = '/results/:searchTags',
    TERMS = '/terms',
}
