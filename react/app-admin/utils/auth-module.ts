import { LoginAPIResponse } from 'tmw-admin/constants/api-types';
import { ajaxPost } from 'tmw-common/utils/ajax';

export const emptyLocalStorage = (): void => localStorage.clear();

export const getToken = (): string | null => localStorage.getItem('token');

export const isUserAdmin = (): boolean => !!(localStorage.getItem('admin'));

export const authenticateUser = (data: LoginAPIResponse): void => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('admin', 'true');
};

export const redirectUser = (): void => {
    if (isUserAdmin()) {
        window.location.href = '/admin';
    } else {
        window.location.href = '/admin/login';
    }
};

export const login = async (data: any): Promise<void | string> => {
    emptyLocalStorage();
    ajaxPost('login', data).then(res => {
        authenticateUser(res.data as LoginAPIResponse);
        redirectUser();
    }).catch(error => {
        return error;
    });
};
