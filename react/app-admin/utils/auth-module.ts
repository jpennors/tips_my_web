import { LoginAPIResponse } from 'tmw-admin/constants/api-types';
import { TOKEN_VALIDITY_TIME } from 'tmw-admin/constants/app-constants';
import { AuthToken } from 'tmw-admin/constants/app-types';
import { ajaxPost } from 'tmw-common/utils/ajax';

export const emptyLocalStorage = (): void => localStorage.clear();

export const removeLocalToken = (): void => localStorage.removeItem('token');

export const getLocalToken = (): string | null => {
    const rawAuthToken = localStorage.getItem('token');
    if (rawAuthToken) {
        const authToken: AuthToken = JSON.parse(rawAuthToken);
        if (authToken.expiration > Date.now() && authToken.expiration <= Date.now() + TOKEN_VALIDITY_TIME) {
            return authToken.token;
        }
        removeLocalToken(); // Remove token if it's not valid anymore
    }
    return null;
};

export const setLocalToken = (token: string): void => {
    const authToken: AuthToken = {
        token,
        expiration: Date.now() + TOKEN_VALIDITY_TIME,
    };
    localStorage.setItem('token', JSON.stringify(authToken));
};

export const checkAuthentication = (): boolean => !!getLocalToken();

export const redirectUser = (): void => {
    if (checkAuthentication()) {
        window.location.href = '/admin';
    } else {
        window.location.href = '/admin/login';
    }
};

export const login = async (data: any): Promise<void | string> => {
    emptyLocalStorage();
    return ajaxPost('login', data).then((res: {data: LoginAPIResponse}) => {
        setLocalToken(res.data.token);
        redirectUser();
    });
};
