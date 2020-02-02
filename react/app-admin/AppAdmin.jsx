import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from 'tmw-admin/utils/ProtectedRoute.tsx';
import { LoginPage } from 'tmw-admin/screens/LoginPage';
import AdminScreen from 'tmw-admin/screens/AdminScreen';
import Error404 from 'tmw-admin/screens/Error404';

import './app-admin.css';

const AppAdmin = () => (
    <BrowserRouter>
        <Switch>
            <ProtectedRoute path="/admin/login" component={LoginPage} shouldBeLoggedOut={true} redirection={'/admin'} exact />
            <ProtectedRoute path="/admin" component={AdminScreen} />
            <Route component={Error404} />
        </Switch>
    </BrowserRouter>
);

export default AppAdmin;
