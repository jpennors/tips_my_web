import * as React from 'react';
import { Icon, Loader, Table } from 'semantic-ui-react';
import { ActionMessage } from 'tmw-admin/components/ActionMessage';
import { PageHeader } from 'tmw-admin/components/PageHeader';
import { Contact } from 'tmw-admin/constants/app-types';
import { serializeContactsFromAPI } from 'tmw-admin/utils/api-serialize';
import { ajaxGet, ajaxDelete } from 'tmw-common/utils/ajax';

export const ContactPage: React.FunctionComponent = () => {
    const [contacts, setContacts] = React.useState<Contact[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [successMessage, setSuccessMessage] = React.useState<string>('');
    const hasError = errorMessage.length > 0;
    const isEmpty = contacts.length == 0;

    const fetchContactMessages = async (): Promise<void> => {
        return ajaxGet('contacts').then(res => {
            const contacts = serializeContactsFromAPI(res.data);
            setContacts(contacts);
        }).catch(() => {
            setErrorMessage('Error while fetching contacts list from API.');
        });
    };

    const deleteContact = async (contactId: string): Promise<void> => {
        setSuccessMessage('');
        setErrorMessage('');
        setIsLoading(true);
        ajaxDelete(`contacts/${contactId}`).then(() => {
            setSuccessMessage('The message was successfully deleted.');
            return fetchContactMessages();
        }).catch(() => {
            setErrorMessage('Error while trying to delete contact message.');
        }).finally(() => {
            setIsLoading(false);
        });
    };

    React.useEffect(() => {
        fetchContactMessages().finally(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <div>
            <PageHeader
                iconName="comment"
                headerContent="Contact Messages"
                subHeaderContent='Messages sent through the "Contact" form'
            />
            <ActionMessage type='success' message={successMessage} />
            <ActionMessage type='error' message={errorMessage} />
            {isLoading ? <Loader active inline="centered" /> : hasError ? null : isEmpty ? (
                <ActionMessage
                    type='warning'
                    message='Be patient!'
                    messageHeader='No contact messages for now...'
                />
            ) : (
                <Table celled striped selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Message</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            contacts.map(contact => (
                                <Table.Row key={contact.id}>
                                    <Table.Cell>{contact.createdAt}</Table.Cell>
                                    <Table.Cell>{contact.email}</Table.Cell>
                                    <Table.Cell>{contact.message}</Table.Cell>
                                    <Table.Cell collapsing textAlign="center">
                                        <Icon name='trash alternate' color='red' link onClick={(): void => {deleteContact(contact.id);}}/>
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
