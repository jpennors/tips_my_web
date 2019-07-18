import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import LoginScreen from './screens/LoginScreen';
import { URL, API_URL } from './utils/config';

class App extends React.Component {

    render() {
        return (
            <div>
                <Route exact path="/" component={HomeScreen} />
                <Route path="/login" component={LoginScreen}/>
                <Route path="/admin" component={AdminScreen}/>
            </div>
        )
    }
}

export default App;
