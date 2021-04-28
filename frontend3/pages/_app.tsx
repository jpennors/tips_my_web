import * as React from 'react';
import type { AppProps } from 'next/app';
import '../global-styles-main.scss';
require('tmw-common/config/config');

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
