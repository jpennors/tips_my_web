import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import LoginScreen from './screens/LoginScreen';
import Error404 from './screens/Error404';

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
				<Switch>
					<Route path="/" exact component={HomeScreen}/>
					<ProtectedRoute path="/admin" component={AdminScreen}/>
					<Route path="/login" exact component={LoginScreen}/>
                    <Route component={Error404}/>
				</Switch>
			</BrowserRouter>
        )
    }
}

export default App;
