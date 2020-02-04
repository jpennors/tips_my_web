import * as React from 'react';
import { Button, Header, Icon, Loader, Message, Table } from 'semantic-ui-react';
import { Contact } from 'tmw-admin/constants/app-types';
import { serializeContactsFromAPI } from 'tmw-admin/utils/api-serialize';
import { ajaxGet, ajaxDelete } from 'tmw-common/utils/ajax';

export const ContactPage: React.FunctionComponent = () => {
    const [contacts, setContacts] = React.useState<Contact[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const hasError = errorMessage.length > 0;
    const isEmpty = contacts.length == 0;

    const fetchContactMessages = async (): Promise<void> => {
        ajaxGet('contacts').then(res => {
            const contacts = serializeContactsFromAPI(res.data);
            setContacts(contacts);
            setIsLoading(false);
        }).catch(() => {
            setErrorMessage('Error while fetching contacts list from API.');
            setIsLoading(false);
        });
    };

    const deleteContact = async (contactId: string): Promise<void> => {
        ajaxDelete(`contacts/${contactId}`).then(() => {
            fetchContactMessages();
        }).catch(() => {
            setErrorMessage('Error while deleting contact.');
        });
    };

    React.useEffect(() => {
        fetchContactMessages();
    }, []);

    return (
        <div>
            <Header dividing size="huge" as="h1">
                Contacts messages
            </Header>
            {isLoading ? <Loader active inline="centered" /> : hasError ? (
                <Message negative>
                    <Message.Header>Something wrong happened...</Message.Header>
                    <p>{errorMessage}</p>
                </Message>
            ) : isEmpty ? (
                <Message warning>
                    <Message.Header>No contact messages for now...</Message.Header>
                    <p>Be patient!</p>
                </Message>
            ) : (
                <Table celled striped selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Message</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            contacts.map(contact => (
                                <Table.Row key={contact.id}>
                                    <Table.Cell>{contact.email}</Table.Cell>
                                    <Table.Cell>{contact.message}</Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <Button icon color='red' onClick={(): void => {deleteContact(contact.id);}}>
                                            <Icon name='trash alternate' />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
            )}
        </div>
    );
};
