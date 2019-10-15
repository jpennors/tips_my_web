import React, { Component } from 'react';
import AdminResourceComponent from '../components/resources/AdminResourceComponent';
import AdminImportComponent from '../components/import/AdminImportComponent';
import AdminSuggestionComponent from '../components/admin/AdminSuggestionComponent';
import AdminContactComponent from '../components/admin/AdminContactComponent';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../utils/ProtectedRoute';
import Error404 from './Error404';
import AdminTagComponent from '../components/tag/AdminTagComponent';
import DashboardComponent from '../components/admin/DashboardComponent';

import {
  Button,
  Divider,
  Grid,
  Icon,
  Input,
  Menu,
} from "semantic-ui-react";

class AdminScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownMenuStyle: {
                display: "none"
            }
        };

        this.handleToggleDropdownMenu = this.handleToggleDropdownMenu.bind(this)
      }

      handleToggleDropdownMenu(){
        let newState = Object.assign({}, this.state);
        if (newState.dropdownMenuStyle.display === "none") {
          newState.dropdownMenuStyle = { display: "flex" };
        } else {
          newState.dropdownMenuStyle = { display: "none" };
        }
        this.setState(newState);
      };


    render() {

        const base_url = this.props.match.url;

        const nav_items = [
            {
                name : 'Overview',
                path: '/admin/',
                role: 'primary'
            },
            {
                name : 'Ressources',
                path: '/admin/resources',
                role: 'primary'
            },
            {
                name : 'Tags',
                path: '/admin/tags',
                role: 'primary'
            },
            {
                name : 'Import',
                path: '/admin/import',
                role: 'second'
            },
            {
                name : 'Suggestions',
                path: '/admin/suggestions',
                role: 'second'
            },
            {
                name : 'Contacts',
                path: '/admin/contacts',
                role: 'second'
            }
        ]
        

        return (
        <div>

            <Grid padded className="tablet computer only">
                <Menu borderless inverted fluid fixed="top">
                    <Menu.Item header as="a">
                        <img src="/images/logo.svg" width="15px" className="right7"/>
                        TipsMyWeb
                    </Menu.Item>
                    <Menu.Menu position="right">
                        {nav_items.map((item, index) => (
                            item.role == "primary" &&
                            <Menu.Item href={item.path} key={index}>
                                {item.name}
                            </Menu.Item>
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
                        {nav_items.map((item, index) => (
                            <Menu.Item href={item.path} key={index}>
                                {item.name}
                            </Menu.Item>
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
                        {nav_items.map((item, index) => (
                            <Menu.Item 
                                href={item.path} 
                                key={index}
                                active={window.location.pathname == item.path}
                            >
                                {item.name}
                            </Menu.Item>
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
                                <ProtectedRoute path={`${base_url}/`} exact component={DashboardComponent}/>
                                <ProtectedRoute path={`${base_url}/tags`} exact component={AdminTagComponent}/>
                                <ProtectedRoute path={`${base_url}/import`} exact component={AdminImportComponent}/>
                                <ProtectedRoute path={`${base_url}/suggestions`} exact component={AdminSuggestionComponent}/>
                                <ProtectedRoute path={`${base_url}/contacts`} exact component={AdminContactComponent}/>
                                <ProtectedRoute path={`${base_url}/resources`} exact component={AdminResourceComponent}/>
                                <Route component={Error404}/>
                            </Switch>
                        </main>
                    </Grid>
                </Grid.Column>
            </Grid>
        </div>
        )
    }
}

export default AdminScreen;
