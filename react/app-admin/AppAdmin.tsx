import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ADMIN_APP_ROUTES } from 'tmw-admin/constants/app-constants';
import { ProtectedRoute } from 'tmw-admin/components/ProtectedRoute';
import { LoginPage } from 'tmw-admin/components/LoginPage';
import { PageLayout } from 'tmw-admin/components/PageLayout';

import './app-admin.css';

export const AppAdmin: React.FunctionComponent = () => (
    <BrowserRouter>
        <Switch>
            <ProtectedRoute
                path={ADMIN_APP_ROUTES.LOGIN}
                component={LoginPage}
                shouldBeLoggedOut={true}
                redirection={ADMIN_APP_ROUTES.MAIN}
                exact
            />
            <ProtectedRoute path={ADMIN_APP_ROUTES.MAIN} component={PageLayout} />
        </Switch>
    </BrowserRouter>
);
