import React, { Component } from 'react';

import {
    Button,
    Divider,
    Grid,
    Header,
    Icon,
    Input,
    Image,
    Label,
    Menu,
    Table,
    Tab
} from "semantic-ui-react";

class DashboardComponent extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Grid.Row>
                <Header dividing size="huge" as="h1">
                Dashboard
                </Header>
            </Grid.Row>
            )
    }
}

export default DashboardComponent;
