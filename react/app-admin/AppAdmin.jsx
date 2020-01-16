import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from 'tmw-common/utils/ProtectedRoute';
import AdminScreen from 'tmw-admin/screens/AdminScreen';
import LoginScreen from 'tmw-admin/screens/LoginScreen';
import Error404 from 'tmw-admin/screens/Error404';
import 'tmw-common/utils/Interceptor';

import './app-admin.css';

const AppAdmin = () => (
    <BrowserRouter>
        <Switch>
            <ProtectedRoute path="/admin" component={AdminScreen} />
            <Route path="/login" exact component={LoginScreen} />
            <Route component={Error404} />
        </Switch>
    </BrowserRouter>
);

export default AppAdmin;
