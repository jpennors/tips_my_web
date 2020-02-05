import * as React from 'react';
import { Button, Header, Icon, Label, Loader, Message, Table } from 'semantic-ui-react';
import { Tag } from 'tmw-admin/constants/app-types';
import { serializeTagsFromAPI } from 'tmw-admin/utils/api-serialize';
import { ajaxGet, ajaxDelete } from 'tmw-common/utils/ajax';

export const TagsPage: React.FunctionComponent = () => {
    const [tags, setTags] = React.useState<Tag[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const hasError = errorMessage.length > 0;
    const isEmpty = tags.length == 0;

    const fetchTags = async (): Promise<void> => {
        ajaxGet('tags').then(res => {
            const tags = serializeTagsFromAPI(res.data);
            setTags(tags);
            setIsLoading(false);
        }).catch(() => {
            setErrorMessage('Error while fetching tags list from API.');
            setIsLoading(false);
        });
    };

    const deleteTag = async (tagId: string): Promise<void> => {
        ajaxDelete(`tags/${tagId}`).then(() => {
            fetchTags();
        }).catch(() => {
            setErrorMessage('Error while deleting tag.');
        });
    };

    React.useEffect(() => {
        fetchTags();
    }, []);

    return (
        <div>
            <Header dividing as="h1">
                Tags
            </Header>
            <Button fluid icon>
                Add Tag
            </Button>
            {isLoading ? <Loader active inline="centered" /> : hasError ? (
                <Message negative>
                    <Message.Header>Something wrong happened...</Message.Header>
                    <p>{errorMessage}</p>
                </Message>
            ) : isEmpty ? (
                <Message warning>
                    <Message.Header>No tags for now...</Message.Header>
                    <p>Add some with the form below !</p>
                </Message>
            ) : (
                <Table celled striped selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Parent</Table.HeaderCell>
                            <Table.HeaderCell collapsing textAlign="center">Edit</Table.HeaderCell>
                            <Table.HeaderCell collapsing textAlign="center">Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            tags.map(tag => (
                                <Table.Row key={tag.id}>
                                    <Table.Cell>{tag.name}</Table.Cell>
                                    <Table.Cell>{tag.parentName && (<Label>{tag.parentName}</Label>)}</Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <Button icon color='blue' onClick={(): void => {alert('EDIT');}}>
                                            <Icon name='edit' />
                                        </Button>
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <Button icon color='red' onClick={(): void => {deleteTag(tag.id);}}>
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
