// WARNING: The equivalent constant in the backend should be the same value !
export const TOKEN_VALIDITY_TIME = 2 * 3600 * 1000;

export enum LOCALES {
    FRENCH = 'fr',
    ENGLISH = 'en',
    ENGLISH_FRENCH = 'en,fr',
    SPANISH = 'es',
    FRENCH_SPANISH = 'fr,es',
    ENGLISH_SPANISH = 'en,es',
    ENGLISH_FRENCH_SPANISH = 'en,fr,es'
}

export const LOCALES_NAMES = {
    [LOCALES.FRENCH]: 'French',
    [LOCALES.ENGLISH]: 'English',
    [LOCALES.ENGLISH_FRENCH]: 'English / French',
    [LOCALES.SPANISH]: 'Spanish',
    [LOCALES.FRENCH_SPANISH]: 'French / Spanish',
    [LOCALES.ENGLISH_SPANISH]: 'English / Spanish',
    [LOCALES.ENGLISH_FRENCH_SPANISH]: 'English / French / Spanish',
};

export enum MAX_CONTENT_LENGTH {
    OVERVIEW_PAGE_LOG_DESCRIPTION = 25,
    RESOURCES_INDEX_PAGE_URL = 20,
    RESOURCES_INDEX_PAGES_TAGS = 2,
};

export const RESOURCES_IMAGE_BASE_URL = '/api/resources/image/';

/*
 * Admin app routes
 */
export enum ADMIN_APP_ROUTES {
    PUBLIC_APP = '/',
    MAIN = '/',
    LOGIN = '/login',
    RESOURCES = '/resources',
    RESOURCES_ADD = '/resources/add',
    RESOURCES_EDIT = '/resources/edit/:id',
    TAGS = '/tags',
    TAGS_ADD = '/tags/add',
    TAGS_EDIT = '/tags/edit/:id',
    PRICES = '/prices',
    PRICES_ADD = '/prices/add',
    PRICES_EDIT = '/prices/edit/:id',
    RESOURCE_TYPES = '/types',
    RESOURCE_TYPES_ADD = '/types/add',
    RESOURCE_TYPES_EDIT = '/types/edit/:id',
    IMPORT = '/import',
    SUGGESTIONS = '/suggestions',
    CONTACT = '/contact',
    STATISTICS = '/statistics',
}
