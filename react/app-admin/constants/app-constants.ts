// WARNING: The equivalent constant in the backend should be the same value !
export const TOKEN_VALIDITY_TIME = 2 * 3600 * 1000;

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

export const RESOURCES_IMAGE_BASE_URL = '/api/resources/image/';

/*
 * Admin app routes
 */
export enum ADMIN_APP_ROUTES {
    MAIN = '/admin',
    LOGIN = '/admin/login',
    RESOURCES = '/admin/resources',
    RESOURCES_ADD = '/admin/resources/add',
    RESOURCES_EDIT = '/admin/resources/edit/:id',
    TAGS = '/admin/tags',
    TAGS_ADD = '/admin/tags/add',
    TAGS_EDIT = '/admin/tags/edit/:id',
    IMPORT = '/admin/import',
    SUGGESTIONS = '/admin/suggestions',
    CONTACT = '/admin/contact',
    STATISTICS = '/admin/statistics'
}
