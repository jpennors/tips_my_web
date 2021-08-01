import * as React from 'react';
import { Switch } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';
import { BatchImportPage } from 'tmw-admin/components/BatchImportPage';
import { NotFoundErrorMessage } from 'tmw-admin/components/NotFoundErrorMessage';
import { OverviewPage } from 'tmw-admin/components/OverviewPage';
import { ContactPage } from 'tmw-admin/components/ContactPage';
import { ResourcesEditPage } from 'tmw-admin/components/ResourcesEditPage';
import { ResourcesPage } from 'tmw-admin/components/ResourcesPage';
import { PricesPage } from 'tmw-admin/components/PricesPage';
import { PricesEditPage } from 'tmw-admin/components/PricesEditPage';
import { ResourceTypesPage } from 'tmw-admin/components/ResourceTypesPage';
import { ResourceTypesEditPage } from 'tmw-admin/components/ResourceTypesEditPage';
import { SideNavMenu } from 'tmw-admin/components/SideNavMenu';
import { SuggestionsPage } from 'tmw-admin/components/SuggestionsPage';
import { TagsEditPage } from 'tmw-admin/components/TagsEditPage';
import { TagsPage } from 'tmw-admin/components/TagsPage';
import { Statistics } from 'tmw-admin/components/Statistics'
import { TopNavMenu } from 'tmw-admin/components/TopNavMenu';
import { ProtectedRoute } from 'tmw-admin/components/ProtectedRoute';
import { ADMIN_APP_ROUTES } from 'tmw-admin/constants/app-constants';

import './page-layout.css';

export const PageLayout: React.FunctionComponent = () => {
    return (
        <>
            <TopNavMenu />
            <Container>
                <Grid padded>
                    <Grid.Row centered columns={1} only="mobile">
                        <SideNavMenu horizontalDisplay />
                    </Grid.Row>
                    <Grid.Row>
                        <div className="page-layout__content-container">
                            <Grid padded className="tablet computer only">
                                <div>
                                    <SideNavMenu />
                                </div>
                            </Grid>
                            <div className="page-layout__main-content">
                                <Switch>
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.MAIN}
                                        exact
                                        component={OverviewPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.TAGS}
                                        exact
                                        component={TagsPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.TAGS_ADD}
                                        exact
                                        component={TagsEditPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.TAGS_EDIT}
                                        exact
                                        component={TagsEditPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.IMPORT}
                                        exact
                                        component={BatchImportPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.SUGGESTIONS}
                                        exact
                                        component={SuggestionsPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.CONTACT}
                                        exact
                                        component={ContactPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.RESOURCES}
                                        exact
                                        component={ResourcesPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.RESOURCES_ADD}
                                        exact
                                        component={ResourcesEditPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.RESOURCES_EDIT}
                                        exact
                                        component={ResourcesEditPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.PRICES}
                                        exact
                                        component={PricesPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.PRICES_ADD}
                                        exact
                                        component={PricesEditPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.PRICES_EDIT}
                                        exact
                                        component={PricesEditPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.RESOURCE_TYPES}
                                        exact
                                        component={ResourceTypesPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.RESOURCE_TYPES_ADD}
                                        exact
                                        component={ResourceTypesEditPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.RESOURCE_TYPES_EDIT}
                                        exact
                                        component={ResourceTypesEditPage}
                                    />
                                    <ProtectedRoute
                                        path={ADMIN_APP_ROUTES.STATISTICS}
                                        exact
                                        component={Statistics}
                                    />
                                    <ProtectedRoute component={NotFoundErrorMessage} />
                                </Switch>
                            </div>
                        </div>
                    </Grid.Row>
                </Grid>
            </Container>
        </>
    );
};
