import * as React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LayoutFooter } from 'tmw-main/components/LayoutFooter';
import { LayoutHeader } from 'tmw-main/components/LayoutHeader';
import { SearchPage } from 'tmw-main/components/SearchPage';
import { SearchResultsPage } from 'tmw-main/components/SearchResultsPage';
import { MAIN_APP_ROUTES } from 'tmw-main/constants/app-constants';

import './app-main.css';

export const AppMain: React.FunctionComponent = () => (
    <CookiesProvider>
        <div className="app-main">
            <LayoutHeader/>
            <BrowserRouter>
                <Switch>
                    <Route path={MAIN_APP_ROUTES.HOME} component={SearchPage} exact />
                    <Route path={MAIN_APP_ROUTES.SEARCH} component={SearchPage} />
                    <Route path={MAIN_APP_ROUTES.RESULTS} component={SearchResultsPage} />
                    <Redirect to={MAIN_APP_ROUTES.HOME} />
                </Switch>
            </BrowserRouter>
            <LayoutFooter/>
        </div>
    </CookiesProvider>
);
