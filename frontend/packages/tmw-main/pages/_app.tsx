import * as React from 'react';
import type { AppProps } from 'next/app';
import 'tmw-main/styles/global-styles.scss';
require('tmw-common/config/config');

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
