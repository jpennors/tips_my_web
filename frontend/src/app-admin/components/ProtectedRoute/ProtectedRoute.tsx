import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { ADMIN_APP_ROUTES } from 'tmw-admin/constants/app-constants';
import { checkAuthentication } from 'tmw-admin/utils/auth-module';

interface ProtectedRouteProps extends RouteProps {
    component: React.ComponentType;
    shouldBeLoggedOut?: boolean;
    redirection?: string;
}

export const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({
    component: Component,
    shouldBeLoggedOut,
    redirection = ADMIN_APP_ROUTES.LOGIN,
    ...routeProps
}) => {
    const isAuthenticated = checkAuthentication();

    const renderedComponent = (props: any): React.ReactNode => {
        if ((isAuthenticated && !shouldBeLoggedOut) || (!isAuthenticated && shouldBeLoggedOut)) {
            return <Component {...props} />;
        } else {
            return <Redirect to={redirection} />;
        }
    };

    return <Route {...routeProps} render={renderedComponent} />;
};
