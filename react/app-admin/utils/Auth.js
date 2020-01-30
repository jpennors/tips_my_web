import { ajaxPost } from 'tmw-common/utils/ajax';


class Auth {
    static isUserAdmin() {
        return localStorage.getItem('admin');
    }


    static async login(data) {
        this.emptyLocalStorage();
        ajaxPost('login', data).then(res => {
            Auth.authenticateUser(res.data);
            Auth.redirectUser();
        })
        .catch(() => {
            Auth.redirectUser();
        });
    }


    static getToken() {
        return localStorage.getItem('token');
    }


    static authenticateUser(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('admin', 'true');
    }


    static redirectUser() {
        if (Auth.isUserAdmin()) {
            window.location = '/admin';
        } else {
            window.location = '/login';
        }
    }


    static emptyLocalStorage() {
        localStorage.clear();
    }
}

export default Auth;
