import axios from 'axios';
import Auth from './Auth';

axios.interceptors.response.use( (response) => {
    return response;
}, (error) => {
    // if (error.response.status == 403 || error.response.status == 401) {
    //     Auth.emptyLocalStorage();
    //     Auth.redirectUser();
    // } else {
        return Promise.reject(error);
    // }   
});