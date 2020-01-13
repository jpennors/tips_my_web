import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MainApp } from 'tmw/components/app/MainApp';
import ProtectedRoute from './utils/ProtectedRoute';
import AdminScreen from './screens/AdminScreen';
import LoginScreen from './screens/LoginScreen';
import Error404 from './screens/Error404';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={MainApp} />
            <ProtectedRoute path="/admin" component={AdminScreen} />
            <Route path="/login" exact component={LoginScreen} />
            <Route component={Error404} />
        </Switch>
    </BrowserRouter>
);

export default App;
