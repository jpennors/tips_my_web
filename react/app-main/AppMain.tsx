import * as React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LayoutFooter } from 'tmw-main/components/LayoutFooter';
import { LayoutHeader } from 'tmw-main/components/LayoutHeader';
import { SearchPage } from 'tmw-main/components/SearchPage';
import { SearchResultsPage } from 'tmw-main/components/SearchResultsPage';
import { TermsPage } from 'tmw-main/components/TermsPage';
import { MAIN_APP_ROUTES } from 'tmw-main/constants/app-constants';
import { ViewportProvider } from 'tmw-common/components/ViewportProvider';

import './app-main.css';

export const AppMain: React.FunctionComponent = () => (
    <CookiesProvider>
        <ViewportProvider>
            <BrowserRouter>
                <div className="app-main">
                    <LayoutHeader />
                    <Switch>
                        <Route path={MAIN_APP_ROUTES.HOME} component={SearchPage} exact />
                        <Route path={MAIN_APP_ROUTES.SEARCH} component={SearchPage} />
                        <Route path={MAIN_APP_ROUTES.TERMS} component={TermsPage} />
                        <Route path={MAIN_APP_ROUTES.RESULTS} component={SearchResultsPage} />
                        <Redirect to={MAIN_APP_ROUTES.HOME} />
                    </Switch>
                    <LayoutFooter />
                </div>
            </BrowserRouter>
        </ViewportProvider>
    </CookiesProvider>
);
