import axios from 'axios';

const token = localStorage.getItem('token');
const defaultConfig = { headers: { ContentType: 'application/json', Authorization: '' } };

if (token) {
    defaultConfig.headers.Authorization = token;
}

export const ajaxGet = (path: string): Promise<any> => {
    return axios.get(`/api/${path}`, defaultConfig);
};

export const ajaxPost = (path: string, data: object): Promise<any> => {
    return axios.post(`/api/${path}`, data, defaultConfig);
};

export const ajaxPut = (path: string, data: object): Promise<any> => {
    return axios.put(`/api/${path}`, data, defaultConfig);
};

export const ajaxDelete = (path: string): Promise<any> => {
    return axios.delete(`/api/${path}`, defaultConfig);
};

export const ajaxPostImage = (path: string, data: object): Promise<any> => {
    let config = {};
    if (token) {
        config = { headers: { Authorization: token } };
    }
    return axios.post(`/api/${path}`, data, config);
};

export const putFile = (file: any): void => {
    const fileReader = new FileReader();
    fileReader.onload = async (e): Promise<any> => {
        // @ts-ignore
        const { result } = e.target; //TODO: Fix type error
        const config = { headers: { ContentType: file.type, ContentLength: file.size, Authorization: token } };
        return axios.post('/api/file', result, config);
    };
};
