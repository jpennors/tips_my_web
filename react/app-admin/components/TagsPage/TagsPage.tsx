import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Label, Loader, Message, Table } from 'semantic-ui-react';
import { ADMIN_APP_TAGS_ADD_URL, ADMIN_APP_TAGS_EDIT_URL } from 'tmw-admin/constants/app-constants';
import { Tag } from 'tmw-admin/constants/app-types';
import { serializeTagsFromAPI } from 'tmw-admin/utils/api-serialize';
import { ajaxGet, ajaxDelete } from 'tmw-common/utils/ajax';

export const TagsPage: React.FunctionComponent = () => {
    const [tags, setTags] = React.useState<Tag[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [successMessage, setSuccessMessage] = React.useState<string>('');
    const hasError = errorMessage.length > 0;
    const hasSuccess = successMessage.length > 0;
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

    const deleteTag = async (tagId: string, tagName: string): Promise<void> => {
        setSuccessMessage('');
        setErrorMessage('');
        ajaxDelete(`tags/${tagId}`).then(() => {
            setSuccessMessage('The tag "' + tagName + '" was successfully deleted.');
            fetchTags();
        }).catch(() => {
            setErrorMessage('Error while trying to delete the tag "' + tagName + '".');
        });
    };

    React.useEffect(() => {
        fetchTags();
    }, []);

    return (
        <div>
            <Header dividing as="h3">
                <Icon name='tags' />
                <Header.Content>
                    Tags
                    <Header.Subheader>Tags proposed to search for a type of resources</Header.Subheader>
                </Header.Content>
            </Header>
            <Link to={ADMIN_APP_TAGS_ADD_URL}>
                <Button fluid icon>
                    Add Tag
                </Button>
            </Link>
            {hasSuccess ? (
                <Message positive icon>
                    <Icon name='check circle outline'/>
                    <Message.Content>
                        <Message.Header>Success!</Message.Header>
                        {successMessage}
                    </Message.Content>
                </Message>
            ) : null}
            {isLoading ? <Loader active inline="centered" /> : hasError ? (
                <Message negative icon>
                    <Icon name='warning circle'/>
                    <Message.Content>
                        <Message.Header>Something wrong happened...</Message.Header>
                        {errorMessage}
                    </Message.Content>
                </Message>
            ) : isEmpty ? (
                <Message warning>
                    <Message.Header>No tags for now...</Message.Header>
                    <p>Click on the &quot;Add Tag&quot; button to add your first tag!</p>
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
                                    <Table.Cell>{tag.parentName && (<Label size="small">{tag.parentName}</Label>)}</Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <Link to={ADMIN_APP_TAGS_EDIT_URL.replace(':id', tag.id)}>
                                            <Icon name='edit' color='blue' link />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <Icon name='trash alternate' color='red' link onClick={(): void => {deleteTag(tag.id, tag.name);}} />
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
