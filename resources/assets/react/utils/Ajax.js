import axios from 'axios';

const token = localStorage.getItem('token');
const defaultConfig = { headers: { ContentType: 'application/json' } };
if (token) {
    defaultConfig.headers.Authorization = token;
}

function ajaxGet(path) {
    return axios.get(`/api/${path}`, defaultConfig);
}

function ajaxPost(path, data) {
    return axios.post(`/api/${path}`, data, defaultConfig);
}

function ajaxPut(path, data) {
    return axios.put(`/api/${path}`, data, defaultConfig);
}

function ajaxDelete(path) {
    return axios.delete(`/api/${path}`, defaultConfig);
}

function ajaxPostImage(path, data) {
    let config = {};
    if (token) {
        config = { headers: { Authorization: token } };
    }
    return axios.post(`/api/${path}`, data, config);
}


function putFile(file) {
    const fileReader = new FileReader();
    fileReader.onload = async e => {
        const config = { headers: { ContentType: file.type, ContentLength: file.size, Authorization: token } };
        return axios.post('/api/file', e.target.result, config);
    };
}

export {
 ajaxGet, ajaxPost, ajaxPut, ajaxDelete, ajaxPostImage, putFile
};
