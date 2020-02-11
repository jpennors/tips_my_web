import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ADMIN_APP_LOGIN_URL, ADMIN_APP_MAIN_URL } from 'tmw-admin/constants/app-constants';
import { ProtectedRoute } from 'tmw-admin/components/ProtectedRoute';
import { LoginPage } from 'tmw-admin/components/LoginPage';
import { PageLayout } from 'tmw-admin/components/PageLayout';

const AppAdmin = () => (
    <BrowserRouter>
        <Switch>
            <ProtectedRoute path={ADMIN_APP_LOGIN_URL} component={LoginPage} shouldBeLoggedOut={true} redirection={ADMIN_APP_MAIN_URL} exact />
            <ProtectedRoute path={ADMIN_APP_MAIN_URL} component={PageLayout} />
        </Switch>
    </BrowserRouter>
);

export default AppAdmin;
