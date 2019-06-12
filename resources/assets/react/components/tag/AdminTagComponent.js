import React, { Component } from 'react';

import {
    Button,
    Grid,
    Header,
    Icon,
  } from "semantic-ui-react";
import AdminTagIndexComponent from './AdminTagIndexComponent';
import AdminTagFormComponent from './AdminTagFormComponent';

class AdminTagComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode : "index",
            title : "Tags",
            selected_tag : null
        }
        this.getComponentMode = this.getComponentMode.bind(this)
        this.handleModeChange = this.handleModeChange.bind(this)
    }

    handleModeChange(e){
        const mode = e.target.getAttribute("data-tag")
        let title = "";
        switch(mode){
            case "index" : title = "Tags"; break;
            case "create" : title = "Ajouter un tag"; break;
            case "edit" : title ="Editer un tag"; break;
        }
        this.setState({mode : mode, title: title});
    }

    getComponentMode(tag = null){
        const mode = this.state.mode
        switch(mode){

            case "index":
                return <AdminTagIndexComponent
                    onEdit={
                        (tag)=>{
                            this.setState({
                                mode : "edit",
                                title : "Editer un tag",
                                selected_tag: tag
                            });
                        }
                    }
                />
            case "create":
                return <AdminTagFormComponent/>
            case "edit":
                return <AdminTagFormComponent
                    tag = {tag}
                    type = "edit"
                />
        }
    }

    render() {
        const {title, mode, selected_tag} = this.state

        return (
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <Grid.Row>
                    <Header dividing size="huge" as="h2">
                        {title}
                        {
                            (mode == "index") ? (
                                <Button floated='right' data-tag="create" onClick={this.handleModeChange}>
                                    Ajouter
                                    <Icon name="plus" className="left7"></Icon>
                                </Button>
                            ):(
                                <Button floated='left' data-tag="index" onClick={this.handleModeChange}>
                                    <Icon name="arrow left" className="right7"></Icon>
                                    Retour
                                </Button>
                            )
                        }
                    </Header>
                </Grid.Row>
                {this.getComponentMode(selected_tag)}
            </Grid.Column>
        )
    }
}

export default AdminTagComponent;
