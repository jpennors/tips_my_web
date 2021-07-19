import * as React from 'react';
import type { AppProps } from 'next/app';
import 'tmw-admin/styles/global-styles.scss';
import 'semantic-ui-css/semantic.min.css';
import { PageLayout } from 'tmw-admin/components/PageLayout';
import { ADMIN_APP_ROUTES } from 'tmw-admin/constants/app-constants';
require('tmw-common/config/config');

function MyApp({ Component, pageProps, router }: AppProps) {
    if (router.pathname.startsWith(ADMIN_APP_ROUTES.LOGIN)) {
        return <Component {...pageProps} />;
    }
    return (
        <PageLayout>
            <Component {...pageProps} />
        </PageLayout>
    );
}

export default MyApp;
