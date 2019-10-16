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

class AdminContactComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contacts : [],
            loading : true,
            error : false,
        };

        this.deleteContact = this.deleteContact.bind(this)
    }

    componentDidMount() {
        this.loadContacts();
    }


    async loadContacts() {
        ajaxGet('contacts').then(res => {
            this.setState({
                contacts: res.data || [],
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

    async deleteContact(e){
        const index = e.target.getAttribute("data-tag")
        ajaxDelete('contacts/' + this.state.contacts[index].id).then(()=> {
            this.loadContacts();
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
                Contacts
                </Header>
                <Grid.Row>
                    <Table singleLine striped selectable unstackable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Message</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                this.state.contacts.map((contact, index)=>{
                                    return <Table.Row key={index}>
                                            <Table.Cell>{index+1}</Table.Cell>
                                            <Table.Cell>{contact.email}</Table.Cell>
                                            <Table.Cell>{contact.message}</Table.Cell>
                                            <Table.Cell textAlign="center">
                                                {/* <i
                                                    className="plus blue link icon"
                                                    data-tag={index}
                                                    onClick={this.saveSuggestion}
                                                ></i> */}
                                                <i
                                                    className="trash alternate red link icon left7"
                                                    data-tag={index}
                                                    onClick={this.deleteContact}
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

export default AdminContactComponent;
