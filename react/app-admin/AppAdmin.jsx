import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from 'tmw-admin/utils/ProtectedRoute';
import AdminScreen from 'tmw-admin/screens/AdminScreen';
import { LoginPage } from 'tmw-admin/screens/LoginPage';
import Error404 from 'tmw-admin/screens/Error404';
import 'tmw-admin/utils/Interceptor';

import './app-admin.css';

const AppAdmin = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/admin/login" exact component={LoginPage} />
            <ProtectedRoute path="/admin" component={AdminScreen} />
            <Route component={Error404} />
        </Switch>
    </BrowserRouter>
);

export default AppAdmin;
