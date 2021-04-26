import '../global-styles-main.scss';
import * as React from 'react';
import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { ViewportProvider } from 'tmw-common/components/ViewportProvider';
import { LayoutFooter } from 'tmw-main/components/LayoutFooter';
import { LayoutHeader } from 'tmw-main/components/LayoutHeader';
import { ToastMessageProvider } from 'tmw-main/components/ToastMessage';
require('tmw-common/config/config');

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CookiesProvider>
            <ViewportProvider>
                <ToastMessageProvider>
                    <div className="app-main">
                        <LayoutHeader />
                        <Component {...pageProps} />
                        <LayoutFooter />
                    </div>
                </ToastMessageProvider>
            </ViewportProvider>
        </CookiesProvider>
    );
}

export default MyApp;
