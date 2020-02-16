import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { APIAuthenticationErrors } from 'tmw-admin/constants/api-types';
import { getLocalToken, logout } from 'tmw-admin/utils/auth-module';

interface RequestConfigOptions {
    contentType?: string | null;
    contentLength?: string | null;
}

/*
 * Build request headers by adding the authentication token and some
 * additional information about the content that is sent.
 */
const buildRequestConfig = ({
    contentLength= null,
    contentType = 'application/json',
}: RequestConfigOptions): AxiosRequestConfig => (
    {
        headers: {
            ...(contentType !== null && { ContentType: contentType }),
            ...(contentLength !== null && { ContentLength: contentLength }),
            Authorization: getLocalToken() || '',
        },
    }
);

/*
 * Intercept all axios error and redirect users to the login page
 * if they try to access an api that requires to be logged in.
 */
const catchAuthError = (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
        const response = error.response;
        if (response.status == 403 || response.status == 401) {
            if (Object.values(APIAuthenticationErrors).includes(response.data.message)) {
                logout();
            }
        }
    }
    return Promise.reject(error);
};

axios.interceptors.response.use(response => response, catchAuthError);

export const ajaxGet = (path: string): Promise<any> => {
    const config = buildRequestConfig({});
    return axios.get(`/api/${path}`, config);
};

export const ajaxPost = (path: string, data: object): Promise<any> => {
    const config = buildRequestConfig({});
    return axios.post(`/api/${path}`, data, config);
};

export const ajaxPut = (path: string, data: object): Promise<any> => {
    const config = buildRequestConfig({});
    return axios.put(`/api/${path}`, data, config);
};

export const ajaxDelete = (path: string): Promise<any> => {
    const config = buildRequestConfig({});
    return axios.delete(`/api/${path}`, config);
};

export const ajaxPostImage = (path: string, data: object): Promise<any> => {
    const config = buildRequestConfig({ contentType: null });
    return axios.post(`/api/${path}`, data, config);
};

/*
export const putFile = (file: any): void => {
    const fileReader = new FileReader();
    fileReader.onload = async (e): Promise<any> => {
        const { result } = e.target; //TODO: Fix type error
        const config = buildRequestConfig({ contentType: file.type, contentLength: file.length });
        return axios.post('/api/file', result, config);
    };
};
 */
