import React, { Component } from 'react';
import {ajaxPost} from "../utils/Ajax";
import Auth from "../utils/Auth";

class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username : '',
            password : '',
        };

        this.login = this.login.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    async login(){
        Auth.login({"username": this.state.username, "password": this.state.password});
    }


    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    
    render() {
        return (
            <div className="body-admin">
                <div className="ui two column centered grid">
                <form className="ui form top150">
                    <div className="field">
                        <label>Identifiant</label>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="field">
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <a className="ui button" onClick={this.login}>Se connecter</a>
                </form>
                </div>
            </div>
        )
    }
}

export default LoginScreen;









