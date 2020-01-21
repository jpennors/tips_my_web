import React, { Component } from 'react';
import {
    Divider,
    Grid,
    Header,
    Loader,
    Table
} from 'semantic-ui-react';
import ErrorHandler from 'tmw-admin/utils/Modal';
import { ajaxGet, ajaxDelete } from 'tmw-common/utils/Ajax';


class AdminContactComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            loading: true,
            error: false
        };
    }

    componentDidMount() {
        this.loadContacts();
    }


    loadContacts = async () => {
        ajaxGet('contacts').then(res => {
            this.setState({
                contacts: res.data || [],
                loading: false
            });
        })
        .catch(() => {
            this.setState({
                loading: false,
                error: true
            });
        });
    };

    deleteContact = async e => {
        const index = e.target.getAttribute('data-tag');
        ajaxDelete(`contacts/${this.state.contacts[index].id}`).then(() => {
            this.loadContacts();
        })
        .catch(() => {
        });
    };


    render() {
        const { loading, error } = this.state;

        if (error) {
            return (
                <ErrorHandler
                    open={error}
                />
            );
        }

        if (loading) {
            return (
                <Grid.Row>
                    <Divider hidden />
                    <Loader active inline="centered" />
                </Grid.Row>
            );
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
                                this.state.contacts.map((contact, index) => (
                                    <Table.Row key={contact.email}>
                                        <Table.Cell>{index + 1}</Table.Cell>
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
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>
                </Grid.Row>
            </Grid.Row>
        );
    }
}

export default AdminContactComponent;
