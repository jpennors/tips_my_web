import '../global-styles-main.css';
import '../app-main/constants/ui-constants.css';
import * as React from 'react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
