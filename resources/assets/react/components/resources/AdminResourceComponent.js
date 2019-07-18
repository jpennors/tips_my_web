import React, { Component } from 'react';
import AdminResourceIndexComponent from './AdminResourceIndexComponent';
import AdminResourceFormComponent from './AdminResourceFormComponent';

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

class AdminResourceComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mode : "index",
            title : "Ressources",
            selected_resource : null
        }


        this.getComponentMode = this.getComponentMode.bind(this)
        this.handleModeChange = this.handleModeChange.bind(this)
    }

    handleModeChange(e){
        const mode = e.target.getAttribute("data-tag")
        let title = "";
        switch(mode){
            case "index" : title = "Ressources"; break;
            case "create" : title = "Ajouter une ressource"; break;
            case "edit" : title ="Editer une ressource"; break;
        }
        this.setState({mode : mode, title: title});
    }

    getComponentMode(resource = null){
        const mode = this.state.mode
        switch(mode){

            case "index":
                return <AdminResourceIndexComponent
                    onEdit={
                        (resource)=>{
                            resource.tags = []
                            resource.resource_tags.forEach(element => {
                                resource.tags.push({
                                    "tag_id": element.tag_id,
                                    "belonging" : element.belonging
                                })
                            });
                            this.setState({
                                mode : "edit",
                                title : "Editer une ressource",
                                selected_resource: resource
                            });
                        }
                    }
                />
            case "create":
                return <AdminResourceFormComponent
                    type="create"
                    onSave={
                        ()=>{
                            this.setState({
                                mode : "index",
                                title : "Resources",
                            });
                        }
                    }   
                />
            case "edit":
                return <AdminResourceFormComponent
                    resource = {resource}
                    type = "edit"
                    onSave={
                        ()=>{
                            this.setState({
                                mode : "index",
                                title : "Resources",
                            });
                        }
                    }
                />
        }
    }

    render() {
        const {mode, title, selected_resource} = this.state;

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
                    {this.getComponentMode(selected_resource)}
                </Grid.Column>
            )
    }
}

export default AdminResourceComponent;
