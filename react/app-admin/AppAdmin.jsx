import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ADMIN_APP_LOGIN_URL, ADMIN_APP_MAIN_URL } from 'tmw-admin/constants/app-constants';
import { ProtectedRoute } from 'tmw-admin/utils/ProtectedRoute.tsx';
import { LoginPage } from 'tmw-admin/components/LoginPage';
import AdminScreen from 'tmw-admin/screens/AdminScreen';
import Error404 from 'tmw-admin/screens/Error404';

// import './app-admin.css';

const AppAdmin = () => (
    <BrowserRouter>
        <Switch>
            <ProtectedRoute path={ADMIN_APP_LOGIN_URL} component={LoginPage} shouldBeLoggedOut={true} redirection={ADMIN_APP_MAIN_URL} exact />
            <ProtectedRoute path={ADMIN_APP_MAIN_URL} component={AdminScreen} />
            <Route component={Error404} />
        </Switch>
    </BrowserRouter>
);

export default AppAdmin;
