import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isUserAdmin } from 'tmw-admin/utils/auth-module';

interface LoggedInRouteProps extends RouteProps {
    component: React.ComponentType;
    redirection?: string;
}

export const LoggedInRoute: React.FunctionComponent<LoggedInRouteProps> = ({
    redirection = '/admin/login',
    component: Component,
    ...routeProps
}) => {
    const renderedComponent = (props: any): React.ReactNode => (
        isUserAdmin() ? <Component {...props} /> : <Redirect to={redirection} />
    );

    return (
        <Route
            {...routeProps}
            render={renderedComponent}
        />
    );
};
