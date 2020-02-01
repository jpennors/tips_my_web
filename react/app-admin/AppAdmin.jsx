import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoggedInRoute } from 'tmw-admin/utils/LoggedInRoute';
import { LoginPage } from 'tmw-admin/screens/LoginPage';
import AdminScreen from 'tmw-admin/screens/AdminScreen';
import Error404 from 'tmw-admin/screens/Error404';
import 'tmw-admin/utils/Interceptor';

import './app-admin.css';

const AppAdmin = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/admin/login" exact component={LoginPage} />
            <LoggedInRoute path="/admin" component={AdminScreen} />
            <Route component={Error404} />
        </Switch>
    </BrowserRouter>
);

export default AppAdmin;
