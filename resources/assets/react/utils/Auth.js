import {ajaxGet, ajaxPost} from './Ajax';
import axios from 'axios';

    
class Auth {

    static isUserAdmin(){
        return localStorage.getItem('admin');
    }


    static async login(data){
        this.emptyLocalStorage();
        const token = Auth.getToken();
        axios.post("/api/login", data, {Authorization: token}).then(res => {
            Auth.authenticateUser(res.data);
            Auth.redirectUser();
        })
        .catch(() => {
            Auth.redirectUser();
        })
        
    }


    static getToken(){
        return localStorage.getItem('token');
    }


    static async checkAuth(){
        return ajaxGet('auth/me');
    }

    
    static authenticateUser(data){
        localStorage.setItem('token', data.token);
        localStorage.setItem('admin', true);
    }


    static redirectUser(){
        if (Auth.isUserAdmin()) {
            window.location = '/admin';
        } else {
            window.location = '/login';
        } 
    }


    static emptyLocalStorage(){
        localStorage.clear()
    }

}

export default Auth;