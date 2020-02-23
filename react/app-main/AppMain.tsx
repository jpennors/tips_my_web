import * as React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LayoutFooter } from 'tmw-main/components/LayoutFooter';
import { LayoutHeader } from 'tmw-main/components/LayoutHeader';
import { ResourceSearch } from 'tmw-main/components/ResourceSearch';
import { MAIN_APP_ROUTES } from 'tmw-main/constants/app-constants';

import './app-main.css';

export const AppMain: React.FunctionComponent = () => (
    <CookiesProvider>
        <div className="app-main">
            <LayoutHeader/>
            <BrowserRouter>
                <Switch>
                    <Route path={MAIN_APP_ROUTES.HOME} component={ResourceSearch} />
                    <Route path={MAIN_APP_ROUTES.SEARCH} component={ResourceSearch} />
                </Switch>
            </BrowserRouter>
            <LayoutFooter/>
        </div>
    </CookiesProvider>
);
