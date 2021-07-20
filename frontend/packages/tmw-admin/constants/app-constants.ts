export enum LOCALES {
    FRENCH = 'fr',
    ENGLISH = 'en',
    ENGLISH_FRENCH = 'en,fr',
}

export const LOCALES_NAMES = {
    [LOCALES.FRENCH]: 'French',
    [LOCALES.ENGLISH]: 'English',
    [LOCALES.ENGLISH_FRENCH]: 'English / French',
};

export enum MAX_CONTENT_LENGTH {
    OVERVIEW_PAGE_LOG_DESCRIPTION = 25,
    RESOURCES_INDEX_PAGE_URL = 20,
    RESOURCES_INDEX_PAGES_TAGS = 2,
}

export const RESOURCES_IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_API_HOST_URL + '/api/resources/image/';
export const MAIN_APP_URL = process.env.NEXT_PUBLIC_MAIN_APP_URL;

/*
 * Admin app routes
 */
export enum ADMIN_APP_ROUTES {
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
