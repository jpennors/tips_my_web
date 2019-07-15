import React, { Component } from 'react';
import AdminResourceComponent from '../components/resources/AdminResourceComponent';
import AdminImportComponent from '../components/import/AdminImportComponent';
import AdminSuggestionComponent from '../components/admin/AdminSuggestionComponent';


import AdminTagComponent from '../components/tag/AdminTagComponent';
import DashboardComponent from '../components/admin/DashboardComponent';

import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Label,
  Loader,
  Menu,
  Table
} from "semantic-ui-react";

class AdminScreen extends React.Component {

    constructor(props) {
        super(props);

        let is_admin = false
        let token = sessionStorage.getItem('token')
        token? is_admin = true : window.location.pathname = "/login"

        this.state = {
            activeItem : "Overview",
            admin: is_admin,
            dropdownMenuStyle: {
            display: "none"
            }
        };

        this.handleToggleDropdownMenu = this.handleToggleDropdownMenu.bind(this)
        this.handleItemClick = this.handleItemClick.bind(this)
        this.getActiveComponent = this.getActiveComponent.bind(this)

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

    handleItemClick(e){
        this.setState({ activeItem: e.target.getAttribute("data-tag") })
    }

    getActiveComponent(){
        switch(this.state.activeItem){
            case 'Overview':
                return <DashboardComponent/>

            case 'Ressources':
                return <AdminResourceComponent/>

            case 'Tags':
                return <AdminTagComponent/>
            case 'Import':
                return <AdminImportComponent/>
            case 'Suggestions':
                return <AdminSuggestionComponent/>

        }
    }

    render() {

        const { activeItem, showErrorModal, admin } = this.state
        if(!admin){
            return (
                <Grid.Row>
                    <Divider hidden />
                    <Loader active inline='centered' />
                </Grid.Row>
            )
        }

        return (
        <div>

            <Grid padded className="tablet computer only">
                <Menu borderless inverted fluid fixed="top">
                    <Menu.Item header as="a">
                        <img src="/images/logo.svg" width="15px" className="right7"/>
                        TipsMyWeb
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item
                            data-tag="Overview"
                            onClick={this.handleItemClick}
                        >
                            Dashboard
                        </Menu.Item>
                        <Menu.Item
                            data-tag="Ressources"
                            onClick={this.handleItemClick}
                        >
                            Ressources
                        </Menu.Item>
                        <Menu.Item
                            data-tag="Tags"
                            onClick={this.handleItemClick}
                        >
                            Tags
                        </Menu.Item>
                        <Menu.Item
                            data-tag="Import"
                            onClick={this.handleItemClick}
                        >
                            Import
                        </Menu.Item>
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
                        <Menu.Item
                            data-tag="Overview"
                            onClick={this.handleItemClick}
                        >
                            Dashboard
                        </Menu.Item>
                        <Menu.Item
                            data-tag="Ressources"
                            onClick={this.handleItemClick}
                        >
                            Ressources
                        </Menu.Item>
                        <Menu.Item
                            data-tag="Tags"
                            onClick={this.handleItemClick}
                        >
                            Tags
                        </Menu.Item>
                        <Menu.Item
                            data-tag="Import"
                            onClick={this.handleItemClick}
                        >
                            Import
                        </Menu.Item>
                        <Menu.Item
                            data-tag="Suggestions"
                            onClick={this.handleItemClick}
                        >
                            Suggestions
                        </Menu.Item>
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
                        <Menu.Item
                            data-tag="Overview"
                            active={activeItem === "Overview"}
                            onClick={this.handleItemClick}
                            as="a"
                        >
                            Dashboard
                        </Menu.Item>
                        <Menu.Item
                            data-tag="Ressources"
                            active={activeItem === "Ressources"}
                            onClick={this.handleItemClick}
                            as="a"
                        >
                            Ressources
                        </Menu.Item>
                        <Menu.Item
                            data-tag="Tags"
                            active={activeItem === "Tags"}
                            onClick={this.handleItemClick}
                            as="a"
                        >
                            Tags
                        </Menu.Item>
                        <Menu.Item
                            data-tag="Import"
                            active={activeItem === "Import"}
                            onClick={this.handleItemClick}
                        >
                            Import
                        </Menu.Item>
                        <Menu.Item
                            data-tag="Suggestions"
                            active={activeItem === "Suggestions"}
                            onClick={this.handleItemClick}
                        >
                            Suggestions
                        </Menu.Item>
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
                        {
                            this.getActiveComponent()
                        }
                    </Grid>
                </Grid.Column>
            </Grid>
        </div>
        )
    }
}

export default AdminScreen;
