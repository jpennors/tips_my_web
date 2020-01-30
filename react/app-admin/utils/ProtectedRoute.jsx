import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from 'tmw-admin/utils/Auth';

class ProtectedRoute extends React.Component {
    isAuthorized = () => !!(Auth.isUserAdmin());

    render() {
        const {
            auth, redirection, component: Component, ...routeProps
        } = this.props;
        return (
            <Route
                {...routeProps}
                render={props => (this.isAuthorized()
                        ? <Component {...props} />
                        : <Redirect to={redirection} />
                )}
            />
        );
    }
}

ProtectedRoute.defaultProps = {
    redirection: '/login'
};

export default ProtectedRoute;