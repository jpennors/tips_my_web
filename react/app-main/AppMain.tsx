import * as React from 'react';
import { CookiesProvider } from 'react-cookie';
import { LayoutFooter } from 'tmw-main/components/LayoutFooter';
import { LayoutHeader } from 'tmw-main/components/LayoutHeader';
import { ResourceSearch } from 'tmw-main/components/ResourceSearch';

import './app-main.css';

export const AppMain: React.FunctionComponent = () => (
    <CookiesProvider>
        <div className="app-main">
            <LayoutHeader/>
            <ResourceSearch/>
            <LayoutFooter/>
        </div>
    </CookiesProvider>
);
