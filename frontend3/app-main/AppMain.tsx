import * as React from 'react';
import { CookiesProvider } from 'react-cookie';
import { ContactPage } from 'tmw-main/components/ContactPage';
import { LayoutFooter } from 'tmw-main/components/LayoutFooter';
import { LayoutHeader } from 'tmw-main/components/LayoutHeader';
import { NotFoundErrorPage } from 'tmw-main/components/NotFoundErrorPage';
import { SearchPage } from 'tmw-main/components/SearchPage';
import { SearchResultsPage } from 'tmw-main/components/SearchResultsPage';
import { SuggestionPage } from 'tmw-main/components/SuggestionPage';
import { TermsPage } from 'tmw-main/components/TermsPage';
import { AboutPage } from 'tmw-main/components/AboutPage';
import { ToastMessageProvider } from 'tmw-main/components/ToastMessage';
import { MAIN_APP_ROUTES } from 'tmw-main/constants/app-constants';
import { ViewportProvider } from 'tmw-common/components/ViewportProvider';

import styles from './AppMain.module.css';

export const AppMain: React.FunctionComponent = () => (
    <CookiesProvider>
        <ViewportProvider>
            <ToastMessageProvider>
                <div className={styles.appMain}>
                    <LayoutHeader />
                    <SearchPage />
                    {/*<Route path={MAIN_APP_ROUTES.SEARCH} component={SearchPage} />*/}
                    {/*<Route path={MAIN_APP_ROUTES.TERMS} component={TermsPage} />*/}
                    {/*<Route path={MAIN_APP_ROUTES.ABOUT} component={AboutPage} />*/}
                    {/*<Route path={MAIN_APP_ROUTES.RESULTS} component={SearchResultsPage} />*/}
                    {/*<Route path={MAIN_APP_ROUTES.CONTACT} component={ContactPage} />*/}
                    {/*<Route path={MAIN_APP_ROUTES.SUGGESTION} component={SuggestionPage} />*/}
                    {/*<Route component={NotFoundErrorPage} />*/}
                    {/*<Redirect href={MAIN_APP_ROUTES.HOME} />*/}
                    <LayoutFooter />
                </div>
            </ToastMessageProvider>
        </ViewportProvider>
    </CookiesProvider>
);
