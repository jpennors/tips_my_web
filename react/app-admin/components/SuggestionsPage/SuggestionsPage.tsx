import * as React from 'react';
import { Icon, Loader, Table } from 'semantic-ui-react';
import { ActionMessage } from 'tmw-admin/components/ActionMessage';
import { PageHeader } from 'tmw-admin/components/PageHeader';
import { WebsiteSuggestion } from 'tmw-admin/constants/app-types';
import { serializeSuggestionsFromAPI } from 'tmw-admin/utils/api-serialize';
import { ajaxGet, ajaxDelete } from 'tmw-common/utils/ajax';

export const SuggestionsPage: React.FunctionComponent = () => {
    const [suggestions, setSuggestions] = React.useState<WebsiteSuggestion[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [successMessage, setSuccessMessage] = React.useState<string>('');
    const hasError = errorMessage.length > 0;
    const isEmpty = suggestions.length == 0;

    const fetchWebsiteSuggestions = async (): Promise<void> => {
        ajaxGet('suggestions').then(res => {
            const suggestions = serializeSuggestionsFromAPI(res.data);
            setSuggestions(suggestions);
            setIsLoading(false);
        }).catch(() => {
            setErrorMessage('Error while fetching suggestions list from API.');
            setIsLoading(false);
        });
    };

    const deleteSuggestion = async (suggestionId: string, suggestionName: string): Promise<void> => {
        setSuccessMessage('');
        setErrorMessage('');
        ajaxDelete(`suggestions/${suggestionId}`).then(() => {
            setSuccessMessage('The suggestion for "' + suggestionName + '" was successfully deleted.');
            fetchWebsiteSuggestions();
        }).catch(() => {
            setErrorMessage('Error while trying to delete suggestion.');
        });
    };

    React.useEffect(() => {
        fetchWebsiteSuggestions();
    }, []);

    return (
        <div>
            <PageHeader
                iconName="lightbulb"
                headerContent="Resources Suggestions"
                subHeaderContent='Websites suggestions sent through the "Share a website" form'
            />
            <ActionMessage type='success' message={successMessage} />
            <ActionMessage type='error' message={errorMessage} />
            {isLoading ? <Loader active inline="centered" /> : hasError ? null : isEmpty ? (
                <ActionMessage
                    type='warning'
                    message='Be patient!'
                    messageHeader='No suggestions for now...'
                />
            ) : (
                <Table celled striped selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>URL</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell collapsing textAlign="center">Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            suggestions.map(suggestion => (
                                <Table.Row key={suggestion.id}>
                                    <Table.Cell>{suggestion.createdAt}</Table.Cell>
                                    <Table.Cell>{suggestion.url}</Table.Cell>
                                    <Table.Cell>{suggestion.description}</Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <Icon name='trash alternate' color='red' link onClick={(): void => {deleteSuggestion(suggestion.id, suggestion.url);}} />
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
