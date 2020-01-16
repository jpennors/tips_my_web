import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import {
  Button,
  Divider,
  Grid,
  Icon,
  Input,
  Menu
} from 'semantic-ui-react';
import AdminResourceComponent from 'tmw-admin/components/resources/AdminResourceComponent';
import AdminImportComponent from 'tmw-admin/components/import/AdminImportComponent';
import AdminSuggestionComponent from 'tmw-admin/components/AdminSuggestionComponent';
import AdminContactComponent from 'tmw-admin/components/AdminContactComponent';
import ProtectedRoute from 'tmw-common/utils/ProtectedRoute';
import Error404 from 'tmw-admin/screens/Error404';
import AdminTagComponent from 'tmw-admin/components/tag/AdminTagComponent';
import DashboardComponent from 'tmw-admin/components/DashboardComponent';


class AdminScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownMenuStyle: {
                display: 'none'
            }
        };
      }

      handleToggleDropdownMenu = () => {
        const newState = { ...this.state };
        if (newState.dropdownMenuStyle.display === 'none') {
          newState.dropdownMenuStyle = { display: 'flex' };
        } else {
          newState.dropdownMenuStyle = { display: 'none' };
        }
        this.setState(newState);
      };


    render() {
        const baseUrl = this.props.match.url;

        const navItems = [
            {
                name: 'Overview',
                path: '/admin/',
                role: 'primary'
            },
            {
                name: 'Ressources',
                path: '/admin/resources',
                role: 'primary'
            },
            {
                name: 'Tags',
                path: '/admin/tags',
                role: 'primary'
            },
            {
                name: 'Import',
                path: '/admin/import',
                role: 'second'
            },
            {
                name: 'Suggestions',
                path: '/admin/suggestions',
                role: 'second'
            },
            {
                name: 'Contacts',
                path: '/admin/contacts',
                role: 'second'
            }
        ];


        return (
            <div>

                <Grid padded className="tablet computer only">
                    <Menu borderless inverted fluid fixed="top">
                        <Link to="/">
                            <Menu.Item header>

                                <img src="/images/logo.svg" alt="Logo" width="15px" className="right7" />
                            TipsMyWeb

                            </Menu.Item>
                        </Link>
                        <Menu.Menu position="right">
                            {navItems.map(item => (
                            item.role === 'primary' && (
                            <Link to={item.path} key={item.path}>
                                <Menu.Item>
                                    {item.name}
                                </Menu.Item>
                            </Link>
                          )
                        ))}
                            <Divider fitted />
                            <Menu.Item>
                                <Input placeholder="Search..." size="small" />
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Grid>
                <Grid padded className="mobile only">
                    <Menu borderless inverted fluid fixed="top">
                        <Menu.Item header as="a">
                        TipsMyWeb
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Button
                                    basic
                                    inverted
                                    icon
                                    toggle
                                    onClick={this.handleToggleDropdownMenu}
                                >
                                    <Icon name="content" />
                                </Button>
                            </Menu.Item>
                        </Menu.Menu>
                        <Menu
                            borderless
                            fluid
                            inverted
                            vertical
                            style={this.state.dropdownMenuStyle}
                        >
                            {navItems.map(item => (
                                <Link to={item.path} key={item.path}>
                                    <Menu.Item>
                                        {item.name}
                                    </Menu.Item>
                                </Link>
                        ))}
                            <Divider fitted />
                        </Menu>
                    </Menu>
                </Grid>
                <Grid padded>
                    <Grid.Column
                        tablet={3}
                        computer={3}
                        only="tablet computer"
                        id="sidebar"
                    >
                        <Menu vertical borderless fluid text>
                            {navItems.map(item => (
                                <Link to={item.path} key={item.path}>
                                    <Menu.Item active={window.location.pathname === item.path}>
                                        {item.name}
                                    </Menu.Item>
                                </Link>
                        ))}
                        </Menu>
                    </Grid.Column>
                    <Grid.Column
                        mobile={16}
                        tablet={13}
                        computer={13}
                        floated="right"
                        id="content"
                    >
                        <Grid padded>
                            <main>
                                <Switch>
                                    <ProtectedRoute path={`${baseUrl}/`} exact component={DashboardComponent} />
                                    <ProtectedRoute path={`${baseUrl}/tags`} exact component={AdminTagComponent} />
                                    <ProtectedRoute path={`${baseUrl}/import`} exact component={AdminImportComponent} />
                                    <ProtectedRoute path={`${baseUrl}/suggestions`} exact component={AdminSuggestionComponent} />
                                    <ProtectedRoute path={`${baseUrl}/contacts`} exact component={AdminContactComponent} />
                                    <ProtectedRoute path={`${baseUrl}/resources`} exact component={AdminResourceComponent} />
                                    <Route component={Error404} />
                                </Switch>
                            </main>
                        </Grid>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default AdminScreen;
