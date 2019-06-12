import React, { Component } from 'react';
import {ajaxGet} from "../../utils/Ajax";
import ErrorHandler from "../../utils/Modal";
import AdminResourceFormComponent from"./AdminResourceFormComponent";

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
    Table,
    Tab
  } from "semantic-ui-react";

class AdminResourceIndexComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            resources : [],
            loading : true,
            error : false,
            type : this.props.type
        };
        this.editResource = this.editResource.bind(this)
    }

    componentDidMount() {
        this.loadResources();
    }

    async loadResources() {
        ajaxGet('resources').then(result => {
            this.setState({
                resources: result || [],
                loading : false
            });
        })
        .catch((status, err) => {
            this.setState({
                loading:false,
                error:true
            });
        });
	}

    editResource(e) {
        const resource_id = e.target.getAttribute("data-tag")
        const index = this.state.resources.findIndex(function(elm){
            return elm.id == resource_id
        })
        if (index !== -1){
            this.props.onEdit(this.state.resources[index]);
        }
    }

    render() {

        const {loading, error} = this.state

        if(error){
            return(
                <ErrorHandler
                    open={error}
                />
            )
        }

        if(loading){
            return (
                <Grid.Row>
                    <Divider hidden />
                    <Loader active inline='centered' />
                </Grid.Row>
            )
        }

        return (
            <Grid.Row>
                <Table singleLine striped selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Nom</Table.HeaderCell>
                        <Table.HeaderCell>URL</Table.HeaderCell>
                        <Table.HeaderCell>Language</Table.HeaderCell>
                        <Table.HeaderCell>Score</Table.HeaderCell>
                        <Table.HeaderCell>Tags</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.state.resources.map((resource, index)=>{
                                return <Table.Row key={index}>
                                        <Table.Cell>{index}</Table.Cell>
                                        <Table.Cell>{resource.name}</Table.Cell>
                                        <Table.Cell>{resource.url}</Table.Cell>
                                        <Table.Cell>{resource.language}</Table.Cell>
                                        <Table.Cell>{resource.score}</Table.Cell>
                                        <Table.Cell>
                                            {
                                                resource.resource_tags.map((resource_tag, index)=>{
                                                    return <div className="ui label" key={index}>
                                                        {resource_tag.tag.name}
                                                    </div>
                                                })
                                            }
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <i className="edit blue link icon" data-tag={resource.id} onClick={this.editResource}></i>
                                            <i className="trash alternate red link icon left7"></i>
                                        </Table.Cell>
                                    </Table.Row>
                            })
                        }
                    </Table.Body>
                </Table>
            </Grid.Row>
        )
    }
}

export default AdminResourceIndexComponent;
