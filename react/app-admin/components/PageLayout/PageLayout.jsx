import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';
import AdminResourceComponent from 'tmw-admin/components/resources/AdminResourceComponent';
import AdminImportComponent from 'tmw-admin/components/import/AdminImportComponent';
import AdminSuggestionComponent from 'tmw-admin/components/AdminSuggestionComponent';
import { ContactPage } from 'tmw-admin/components/ContactPage';
import { SideNavMenu } from 'tmw-admin/components/SideNavMenu';
import { TopNavMenu } from 'tmw-admin/components/TopNavMenu';
import { ProtectedRoute } from 'tmw-admin/utils/ProtectedRoute';
import Error404 from 'tmw-admin/screens/Error404';
import AdminTagComponent from 'tmw-admin/components/tag/AdminTagComponent';
import DashboardComponent from 'tmw-admin/components/DashboardComponent';
import {
    ADMIN_APP_CONTACT_URL,
    ADMIN_APP_IMPORT_URL,
    ADMIN_APP_MAIN_URL,
    ADMIN_APP_RESOURCES_URL,
    ADMIN_APP_SUGGESTIONS_URL,
    ADMIN_APP_TAGS_URL,
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
                                        <ProtectedRoute path={ADMIN_APP_MAIN_URL} exact component={DashboardComponent} />
                                        <ProtectedRoute path={ADMIN_APP_TAGS_URL} exact component={AdminTagComponent} />
                                        <ProtectedRoute path={ADMIN_APP_IMPORT_URL} exact component={AdminImportComponent} />
                                        <ProtectedRoute path={ADMIN_APP_SUGGESTIONS_URL} exact component={AdminSuggestionComponent} />
                                        <ProtectedRoute path={ADMIN_APP_CONTACT_URL} exact component={ContactPage} />
                                        <ProtectedRoute path={ADMIN_APP_RESOURCES_URL} exact component={AdminResourceComponent} />
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
