import * as React from 'react';
import { Button, Header, Icon, Loader, Message, Table } from 'semantic-ui-react';
import { WebsiteSuggestion } from 'tmw-admin/constants/app-types';
import { serializeSuggestionsFromAPI } from 'tmw-admin/utils/api-serialize';
import { ajaxGet, ajaxDelete } from 'tmw-common/utils/ajax';

export const SuggestionsPage: React.FunctionComponent = () => {
    const [suggestions, setSuggestions] = React.useState<WebsiteSuggestion[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
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

    const deleteSuggestion = async (suggestionId: string): Promise<void> => {
        ajaxDelete(`suggestions/${suggestionId}`).then(() => {
            fetchWebsiteSuggestions();
        }).catch(() => {
            setErrorMessage('Error while deleting suggestion.');
        });
    };

    React.useEffect(() => {
        fetchWebsiteSuggestions();
    }, []);

    return (
        <div>
            <Header dividing size="huge" as="h1">
                Websites suggestions
            </Header>
            {isLoading ? <Loader active inline="centered" /> : hasError ? (
                <Message negative>
                    <Message.Header>Something wrong happened...</Message.Header>
                    <p>{errorMessage}</p>
                </Message>
            ) : isEmpty ? (
                <Message warning>
                    <Message.Header>No suggestions for now...</Message.Header>
                    <p>Be patient!</p>
                </Message>
            ) : (
                <Table celled striped selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>URL</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell collapsing textAlign="center">Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            suggestions.map(suggestion => (
                                <Table.Row key={suggestion.id}>
                                    <Table.Cell>{suggestion.url}</Table.Cell>
                                    <Table.Cell>{suggestion.description}</Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <Button icon color='red' onClick={(): void => {deleteSuggestion(suggestion.id);}}>
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
