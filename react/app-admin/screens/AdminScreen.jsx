import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';
import AdminResourceComponent from 'tmw-admin/components/resources/AdminResourceComponent';
import AdminImportComponent from 'tmw-admin/components/import/AdminImportComponent';
import AdminSuggestionComponent from 'tmw-admin/components/AdminSuggestionComponent';
import AdminContactComponent from 'tmw-admin/components/AdminContactComponent';
import { SideNavMenu } from 'tmw-admin/components/SideNavMenu';
import { TopNavMenu } from 'tmw-admin/components/TopNavMenu';
import { ProtectedRoute } from 'tmw-admin/utils/ProtectedRoute.tsx';
import Error404 from 'tmw-admin/screens/Error404';
import AdminTagComponent from 'tmw-admin/components/tag/AdminTagComponent';
import DashboardComponent from 'tmw-admin/components/DashboardComponent';

import './admin-screen.css';

class AdminScreen extends React.Component {

    render() {
        const baseUrl = this.props.match.url;

        return (
            <div>
                <TopNavMenu />
                <Container style={{ marginTop: '5em' }}>
                    <Grid padded>
                        <Grid.Row centered columns={1} only='mobile'>
                            <SideNavMenu horizontalDisplay />
                        </Grid.Row>
                        <Grid.Row>
                            <div className="admin-screen__content-container">
                                <Grid padded className='tablet computer only'>
                                    <div>
                                        <SideNavMenu />
                                    </div>
                                </Grid>
                                <div className="admin-screen__main-content">
                                    <Switch>
                                        <ProtectedRoute path={`${baseUrl}/`} exact component={DashboardComponent} />
                                        <ProtectedRoute path={`${baseUrl}/tags`} exact component={AdminTagComponent} />
                                        <ProtectedRoute path={`${baseUrl}/import`} exact component={AdminImportComponent} />
                                        <ProtectedRoute path={`${baseUrl}/suggestions`} exact component={AdminSuggestionComponent} />
                                        <ProtectedRoute path={`${baseUrl}/contacts`} exact component={AdminContactComponent} />
                                        <ProtectedRoute path={`${baseUrl}/resources`} exact component={AdminResourceComponent} />
                                        <Route component={Error404} />
                                    </Switch>
                                </div>
                            </div>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default AdminScreen;
