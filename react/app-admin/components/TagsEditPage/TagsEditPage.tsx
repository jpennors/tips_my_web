import * as React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Button, Form, Header, Icon, Message, StrictDropdownItemProps } from 'semantic-ui-react';
import { ADMIN_APP_TAGS_URL } from 'tmw-admin/constants/app-constants';
import { Tag } from 'tmw-admin/constants/app-types';
import { serializeTagsFromAPI, serializeTagToAPI } from 'tmw-admin/utils/api-serialize';
import { buildTagsMap } from 'tmw-admin/utils/tags';
import { ajaxGet, ajaxPut } from 'tmw-common/utils/ajax';

export const TagsEditPage: React.FunctionComponent = () => {
    const [tag, setTag] = React.useState<Partial<Tag>>({});
    const [tagOptions, setTagOptions] = React.useState<StrictDropdownItemProps[]>([]);
    const isTagOptionsEmpty = tagOptions.length == 0;
    const isReadyToSubmit = tag.name && tag.name.length > 0;

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [canEdit, setCanEdit] = React.useState<boolean>(true);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [successMessage, setSuccessMessage] = React.useState<string>('');
    const hasError = errorMessage.length > 0;
    const hasSuccess = successMessage.length > 0;

    const { id } = useParams();

    const fetchTagOptions = async (): Promise<void> => {
        ajaxGet('tags').then(res => {
            const tags = serializeTagsFromAPI(res.data);

            const tagsMap = buildTagsMap(tags);
            if (id && id in tagsMap) {
                setTag(tagsMap[id]);
            } else {
                setErrorMessage('No matching tag was found for this ID.');
                setCanEdit(false);
            }

            setTagOptions(tags.filter(tag => tag.id != id).map(tag => ({ key: tag.id, value: tag.id, text: tag.name })));
            setIsLoading(false);
        }).catch(() => {
            setErrorMessage('Error while trying to fetch tag data from the API.');
            setCanEdit(false);
            setIsLoading(false);
        });
    };

    const onTagNameInputChange = (event: React.ChangeEvent<HTMLInputElement>, { value }: { value: string}): void => {
        setTag({ ...tag, name: value });
    };

    const onTagParentIdInputChange = (event: React.SyntheticEvent<HTMLElement>, { value }: { value: string}): void => {
        setTag({ ...tag, parentId: value });
    };

    const saveTag = (): void => {
        setSuccessMessage('');
        setErrorMessage('');
        setIsLoading(true);
        const newTag = serializeTagToAPI(tag);

        ajaxPut(`tags/${id}`, newTag).then(() => {
            setSuccessMessage('Your tag "' + tag.name + '" was successfully edited.');
            setIsLoading(false);
        }).catch(() => {
            setErrorMessage('Error while updating the tag. Your modifications were probably not saved.');
            setIsLoading(false);
        });

    };

    React.useEffect(() => {
        fetchTagOptions();
    }, []);

    return (
        <div>
            <Header dividing as="h3">
                <Icon name='tags' />
                <Header.Content>
                    Edit Tag
                    <Header.Subheader>Edit an existing tag</Header.Subheader>
                </Header.Content>
            </Header>
            {hasError ? (
                <Message negative>
                    <Message.Header>Something wrong happened...</Message.Header>
                    <p>{errorMessage}</p>
                </Message>
            ) : null}
            {hasSuccess ? (
                <Message positive>
                    <Message.Header>Success!</Message.Header>
                    <p>{successMessage}</p>
                </Message>
            ) : null}
            {canEdit && (
                <>
                    <Message
                        attached
                        header='Edit an existing tag'
                        content='A tag can also be attached to a parent tag'
                    />
                    <Form className="attached fluid segment" loading={isLoading}>
                        <Form.Group widths="equal">
                            <Form.Input
                                fluid
                                label='Tag Name'
                                placeholder='Tag Name'
                                value={tag.name}
                                onChange={onTagNameInputChange}
                                required
                            />
                            <Form.Select
                                fluid
                                label='Parent Tag'
                                placeholder="Parent Tag"
                                disabled={isTagOptionsEmpty}
                                options={tagOptions}
                                value={tag.parentId || undefined}
                                onChange={onTagParentIdInputChange}
                            />
                        </Form.Group>
                        <Link to={ADMIN_APP_TAGS_URL}>
                            <Button icon labelPosition='left'>
                                <Icon name='arrow left' />
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            icon
                            labelPosition='right'
                            color="blue"
                            onClick={saveTag}
                            disabled={!isReadyToSubmit}
                            floated="right"
                        >
                            Submit
                            <Icon name='upload' />
                        </Button>
                    </Form>
                </>
            )}
        </div>
    );
};
