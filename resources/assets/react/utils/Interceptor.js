import axios from 'axios';

axios.interceptors.response.use(response => response, error => {
    // if (error.response.status == 403 || error.response.status == 401) {
    //     Auth.emptyLocalStorage();
    //     Auth.redirectUser();
    // } else {
    Promise.reject(error);
    // }
});
