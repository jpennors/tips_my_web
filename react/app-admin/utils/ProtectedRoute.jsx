import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isUserAdmin } from 'tmw-admin/utils/auth-module';

class ProtectedRoute extends React.Component {

    render() {
        const {
            auth, redirection, component: Component, ...routeProps
        } = this.props;
        return (
            <Route
                {...routeProps}
                render={props => (isUserAdmin()
                        ? <Component {...props} />
                        : <Redirect to={redirection} />
                )}
            />
        );
    }
}

ProtectedRoute.defaultProps = {
    redirection: '/admin/login'
};

export default ProtectedRoute;
