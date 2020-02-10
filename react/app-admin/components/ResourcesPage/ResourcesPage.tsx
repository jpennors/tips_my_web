import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Label, Loader, Message, Table } from 'semantic-ui-react';
import { ADMIN_APP_RESOURCES_ADD_URL, ADMIN_APP_RESOURCES_EDIT_URL } from 'tmw-admin/constants/app-constants';
import { Resource } from 'tmw-admin/constants/app-types';
import { serializeResourcesFromAPI } from 'tmw-admin/utils/api-serialize';
import { ajaxGet, ajaxDelete } from 'tmw-common/utils/ajax';

export const ResourcesPage: React.FunctionComponent = () => {
    const [resources, setResources] = React.useState<Resource[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [successMessage, setSuccessMessage] = React.useState<string>('');
    const hasError = errorMessage.length > 0;
    const hasSuccess = successMessage.length > 0;
    const isEmpty = resources.length == 0;

    const fetchResources = async (): Promise<void> => {
        ajaxGet('resources').then(res => {
            const resources = serializeResourcesFromAPI(res.data);
            setResources(resources);
            setIsLoading(false);
        }).catch(() => {
            setErrorMessage('Error while fetching resources list from API.');
            setIsLoading(false);
        });
    };

    const deleteResource = async (resourceId: string, resourceName: string): Promise<void> => {
        setSuccessMessage('');
        setErrorMessage('');
        ajaxDelete(`resources/${resourceId}`).then(() => {
            setSuccessMessage('The resource "' + resourceName + '" was successfully deleted.');
            fetchResources();
        }).catch(() => {
            setErrorMessage('Error while trying to delete the resource "' + resourceName + '".');
        });
    };

    React.useEffect(() => {
        fetchResources();
    }, []);

    return (
        <div>
            <Header dividing as="h3">
                <Icon name='world' />
                <Header.Content>
                    Resources
                    <Header.Subheader>Resources that can be searched through TipsMyWeb</Header.Subheader>
                </Header.Content>
            </Header>
            <Link to={ADMIN_APP_RESOURCES_ADD_URL}>
                <Button fluid icon>
                    Add Resource
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
                    <Message.Header>No resources for now...</Message.Header>
                    <p>Click on the &quot;Add Resource&quot; button to add your first tag!</p>
                </Message>
            ) : (
                <Table celled striped selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>URL</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Likes</Table.HeaderCell>
                            <Table.HeaderCell>Tags</Table.HeaderCell>
                            <Table.HeaderCell collapsing textAlign="center">Edit</Table.HeaderCell>
                            <Table.HeaderCell collapsing textAlign="center">Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            resources.map(resource => (
                                <Table.Row key={resource.id}>
                                    <Table.Cell>{resource.name}</Table.Cell>
                                    <Table.Cell>{resource.url}</Table.Cell>
                                    <Table.Cell>{resource.priceName}</Table.Cell>
                                    <Table.Cell>{resource.likes}</Table.Cell>
                                    <Table.Cell>
                                        <Label.Group style={{ marginBottom: '-0.5em' }}>
                                            {resource.tags.map(tag => (
                                                <Label key={tag.tagId} size="small">{tag.tag.name}</Label>
                                            ))}
                                        </Label.Group>
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <Link to={ADMIN_APP_RESOURCES_EDIT_URL.replace(':id', resource.id)}>
                                            <Icon name='edit' color='blue' link />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <Icon name='trash alternate' color='red' link onClick={(): void => {deleteResource(resource.id, resource.name);}} />
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
