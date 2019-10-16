import React, { Component } from 'react';
import {ajaxGet, ajaxPost, ajaxDelete} from "../../utils/Ajax";

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

class AdminSuggestionComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            suggestions : [],
            loading : true,
            error : false,
        };

        this.deleteSuggestion = this.deleteSuggestion.bind(this)
    }

    componentDidMount() {
        this.loadSuggestions();
    }


    loadSuggestions() {
        ajaxGet('suggestions').then(res => {
            this.setState({
                suggestions: res.data || [],
                loading : false
            });
        })
        .catch(() => {
            this.setState({
                loading:false,
                error:true
            });
        });
    }

    deleteSuggestion(e){
        const index = e.target.getAttribute("data-tag")
        ajaxDelete('suggestions/' + this.state.suggestions[index].id).then(() => {
            this.loadSuggestions();
        })
        .catch(() => {

        })
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
                <Header dividing size="huge" as="h1">
                Suggestions
                </Header>
                <Grid.Row>
                    <Table singleLine striped selectable unstackable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                <Table.HeaderCell>URL</Table.HeaderCell>
                                <Table.HeaderCell>Description</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                this.state.suggestions.map((suggestion, index)=>{
                                    return <Table.Row key={index}>
                                            <Table.Cell>{index+1}</Table.Cell>
                                            <Table.Cell>{suggestion.url}</Table.Cell>
                                            <Table.Cell>{suggestion.description}</Table.Cell>
                                            <Table.Cell textAlign="center">
                                                {/* <i
                                                    className="plus blue link icon"
                                                    data-tag={index}
                                                    onClick={this.saveSuggestion}
                                                ></i> */}
                                                <i
                                                    className="trash alternate red link icon left7"
                                                    data-tag={index}
                                                    onClick={this.deleteSuggestion}
                                                ></i>
                                            </Table.Cell>
                                        </Table.Row>
                                })
                            }
                        </Table.Body>
                    </Table>
                </Grid.Row>
            </Grid.Row>
            )
    }
}

export default AdminSuggestionComponent;
