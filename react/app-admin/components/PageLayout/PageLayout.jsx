import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';
import { OverviewPage } from 'tmw-admin/components/OverviewPage';
import AdminImportComponent from 'tmw-admin/components/import/AdminImportComponent';
import { ContactPage } from 'tmw-admin/components/ContactPage';
import { ResourcesEditPage } from 'tmw-admin/components/ResourcesEditPage';
import { ResourcesPage } from 'tmw-admin/components/ResourcesPage';
import { SideNavMenu } from 'tmw-admin/components/SideNavMenu';
import { SuggestionsPage } from 'tmw-admin/components/SuggestionsPage';
import { TagsEditPage } from 'tmw-admin/components/TagsEditPage';
import { TagsPage } from 'tmw-admin/components/TagsPage';
import { TopNavMenu } from 'tmw-admin/components/TopNavMenu';
import { ProtectedRoute } from 'tmw-admin/utils/ProtectedRoute';
import Error404 from 'tmw-admin/screens/Error404';
import {
    ADMIN_APP_CONTACT_URL,
    ADMIN_APP_IMPORT_URL,
    ADMIN_APP_MAIN_URL,
    ADMIN_APP_RESOURCES_URL,
    ADMIN_APP_SUGGESTIONS_URL,
    ADMIN_APP_TAGS_URL,
    ADMIN_APP_TAGS_ADD_URL,
    ADMIN_APP_TAGS_EDIT_URL,
    ADMIN_APP_RESOURCES_ADD_URL,
    ADMIN_APP_RESOURCES_EDIT_URL,
} from 'tmw-admin/constants/app-constants';

import './page-layout.css';

export class PageLayout extends React.Component {

    render() {
        return (
            <>
                <TopNavMenu />
                <Container>
                    <Grid padded>
                        <Grid.Row centered columns={1} only='mobile'>
                            <SideNavMenu horizontalDisplay />
                        </Grid.Row>
                        <Grid.Row>
                            <div className="page-layout__content-container">
                                <Grid padded className='tablet computer only'>
                                    <div>
                                        <SideNavMenu />
                                    </div>
                                </Grid>
                                <div className="page-layout__main-content">
                                    <Switch>
                                        <ProtectedRoute path={ADMIN_APP_MAIN_URL} exact component={OverviewPage} />
                                        <ProtectedRoute path={ADMIN_APP_TAGS_URL} exact component={TagsPage} />
                                        <ProtectedRoute path={ADMIN_APP_TAGS_ADD_URL} exact component={TagsEditPage} />
                                        <ProtectedRoute path={ADMIN_APP_TAGS_EDIT_URL} exact component={TagsEditPage} />
                                        <ProtectedRoute path={ADMIN_APP_IMPORT_URL} exact component={AdminImportComponent} />
                                        <ProtectedRoute path={ADMIN_APP_SUGGESTIONS_URL} exact component={SuggestionsPage} />
                                        <ProtectedRoute path={ADMIN_APP_CONTACT_URL} exact component={ContactPage} />
                                        <ProtectedRoute path={ADMIN_APP_RESOURCES_URL} exact component={ResourcesPage} />
                                        <ProtectedRoute path={ADMIN_APP_RESOURCES_ADD_URL} exact component={ResourcesEditPage} />
                                        <ProtectedRoute path={ADMIN_APP_RESOURCES_EDIT_URL} exact component={ResourcesEditPage} />
                                        <Route component={Error404} />
                                    </Switch>
                                </div>
                            </div>
                        </Grid.Row>
                    </Grid>
                </Container>
            </>
        );
    }
}
