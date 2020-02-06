import * as React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Button, Form, Header, Icon, Message, StrictDropdownItemProps } from 'semantic-ui-react';
import { ADMIN_APP_TAGS_URL } from 'tmw-admin/constants/app-constants';
import { Tag, TagsMap } from 'tmw-admin/constants/app-types';
import { serializeTagsFromAPI } from 'tmw-admin/utils/api-serialize';
import { ajaxGet, ajaxPut } from 'tmw-common/utils/ajax';

const getTagsMap = (tags: Tag[]): TagsMap => {
    const tagsMap: TagsMap = {};

    tags.forEach(tag => {
        if (tag.id in tagsMap) {
            console.error('Some tags have the same ID!');
        } else {
            tagsMap[tag.id] = tag;
        }
    });

    return tagsMap;
};

export const TagsEditPage: React.FunctionComponent = () => {
    const [tagName, setTagName] = React.useState<string>('');
    const [tagParentId, setTagParentId] = React.useState<string>('');
    const [tagOptions, setTagOptions] = React.useState<StrictDropdownItemProps[]>([]);
    const isTagOptionsEmpty = tagOptions.length == 0;
    const isReadyToSubmit = tagName.length > 0;

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

            const tagsMap = getTagsMap(tags);
            if (id && id in tagsMap) {
                setTagName(tagsMap[id].name);
                setTagParentId(tagsMap[id].parentId || '');
            } else {
                setErrorMessage('No matching tag was found for this ID.');
                setCanEdit(false);
            }

            setTagOptions(tags.map(tag => ({ key: tag.id, value: tag.id, text: tag.name })));
            setIsLoading(false);
        }).catch(() => {
            setErrorMessage('Error while trying to fetch tag data from the API.');
            setCanEdit(false);
            setIsLoading(false);
        });
    };

    const onTagNameInputChange = (event: React.ChangeEvent<HTMLInputElement>, { value }: { value: string}): void => {
        setTagName(value);
    };

    const onTagParentIdInputChange = (event: React.SyntheticEvent<HTMLElement>, { value }: { value: string}): void => {
        setTagParentId(value);
    };

    const saveTag = (): void => {
        setSuccessMessage('');
        setErrorMessage('');
        setIsLoading(true);
        const newTag = {
            name: tagName,
            // eslint-disable-next-line @typescript-eslint/camelcase
            parent_id: tagParentId,
        };

        ajaxPut(`tags/${id}`, newTag).then(() => {
            setSuccessMessage('Your tag "' + tagName + '" was successfully edited.');
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
            <Header dividing as="h1">
                Edit Tag
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
                                value={tagName}
                                onChange={onTagNameInputChange}
                                required
                            />
                            <Form.Select
                                fluid
                                label='Parent Tag'
                                placeholder="Parent Tag"
                                disabled={isTagOptionsEmpty}
                                options={tagOptions}
                                value={tagParentId}
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
