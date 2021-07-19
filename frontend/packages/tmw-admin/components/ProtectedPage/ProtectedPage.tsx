import { useRouter } from 'next/router';
import * as React from 'react';
import { checkAuthentication } from 'tmw-admin/utils/auth-module';
import { ADMIN_APP_ROUTES } from 'tmw-admin/constants/app-constants';

interface ProtectedPageProps {
    component: React.ComponentType;
    shouldBeLoggedOut?: boolean;
    redirection?: string;
}

export const ProtectedPage: React.FunctionComponent<ProtectedPageProps> = ({
    component: Component,
    shouldBeLoggedOut,
    redirection = ADMIN_APP_ROUTES.LOGIN,
}) => {
    const router = useRouter();
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
        const isAuthenticated = checkAuthentication();

        if ((isAuthenticated && !shouldBeLoggedOut) || (!isAuthenticated && shouldBeLoggedOut)) {
            return <Component />;
        }

        router.replace(redirection);
        return null;
    }
    // If we are on server, return null
    return null;
};
