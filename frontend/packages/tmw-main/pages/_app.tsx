import Head from 'next/head';
import * as React from 'react';
import type { AppProps } from 'next/app';
import 'tmw-main/styles/global-styles.scss';
require('tmw-common/config/config');

// TODO a bug from next js breaks fontawesome when adding <link>. The following 3 lines fix it but they should be removed when it's fixed nby next js.
import { config as fontawesomeConfig } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
fontawesomeConfig.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff8140" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#f46d7b" />
                <title>TipsMyWeb</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
