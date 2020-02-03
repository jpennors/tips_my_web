import { LoginAPIResponse } from 'tmw-admin/constants/api-types';
import { ajaxPost } from 'tmw-common/utils/ajax';

export const emptyLocalStorage = (): void => localStorage.clear();

export const getLocalToken = (): string | null => localStorage.getItem('token');

export const setLocalToken = (token: string): void => localStorage.setItem('token', token);

export const removeLocalToken = (): void => localStorage.removeItem('token');

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
