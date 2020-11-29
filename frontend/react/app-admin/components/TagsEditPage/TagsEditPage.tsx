import * as React from 'react';
import { useParams } from 'react-router';
import { Form, Message, StrictDropdownItemProps } from 'semantic-ui-react';
import { ActionMessage } from 'tmw-admin/components/ActionMessage';
import { FormFooter } from 'tmw-admin/components/FormFooter';
import { PageHeader } from 'tmw-admin/components/PageHeader';
import { ADMIN_APP_ROUTES } from 'tmw-admin/constants/app-constants';
import { Tag } from 'tmw-admin/constants/app-types';
import { serializeTagsFromAPI, serializeTagToAPI } from 'tmw-admin/utils/api-serialize';
import { convertToSelectOptions } from 'tmw-admin/utils/select-options';
import { ajaxGet, ajaxPost, ajaxPut } from 'tmw-common/utils/ajax';

export const TagsEditPage: React.FunctionComponent = () => {
    const [tag, setTag] = React.useState<Partial<Tag>>({});
    const [tagOptions, setTagOptions] = React.useState<StrictDropdownItemProps[]>([]);
    const isTagOptionsEmpty = tagOptions.length == 0;
    const isReadyToSubmit = tag.name && tag.name.length > 0;

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [canEdit, setCanEdit] = React.useState<boolean>(true);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [successMessage, setSuccessMessage] = React.useState<string>('');

    const { id: editedTagId } = useParams();

    const fetchTagOptions = async (): Promise<void> => {
        return ajaxGet('tags')
            .then(res => {
                const tags = serializeTagsFromAPI(res.data);

                if (editedTagId) {
                    const editedTag = tags.find(tag => tag.id === editedTagId);
                    if (editedTag) {
                        setTag(editedTag);
                    } else {
                        setErrorMessage('No matching tag was found for this ID.');
                        setCanEdit(false);
                    }
                }
            })
            .catch(() => {
                setErrorMessage('Error while trying to fetch tag data from the API.');
                setCanEdit(false);
            });
    };

    const onTagNameInputChange = (_: any, { value }: { value: string }): void => {
        setTag({ ...tag, name: value });
    };

    const resetForm = (): void => {
        setTag({});
    };

    const saveTag = (): void => {
        setSuccessMessage('');
        setErrorMessage('');
        setIsLoading(true);
        const newTag = serializeTagToAPI(tag);
        newTag.id = editedTagId;

        if (editedTagId) {
            ajaxPut(`tags/${editedTagId}`, newTag)
                .then(() => {
                    setSuccessMessage('Your tag "' + tag.name + '" was successfully edited.');
                })
                .catch(() => {
                    setErrorMessage(
                        'Error while updating the tag. Your modifications were probably not saved.',
                    );
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            ajaxPost('tags', newTag)
                .then(() => {
                    setSuccessMessage('Your new tag "' + tag.name + '" was successfully saved.');
                    resetForm();
                })
                .catch(() => {
                    setErrorMessage(
                        'Error while posting new tag to API. The new tag was probably not saved.',
                    );
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    React.useEffect(() => {
        fetchTagOptions().finally(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <div>
            <PageHeader
                iconName="tags"
                headerContent={editedTagId ? 'Edit Tag' : 'Add Tag'}
                subHeaderContent={
                    editedTagId
                        ? 'Edit an existing tag'
                        : 'Add a tag to be used to search for resources'
                }
            />
            <ActionMessage type="success" message={successMessage} />
            <ActionMessage type="error" message={errorMessage} />
            {canEdit && (
                <>
                    <Message
                        attached
                        header={
                            editedTagId ? 'Edit an existing tag' : 'Add a tag to filter resources'
                        }
                        content="A tag can also be attached to a parent tag"
                    />
                    <Form className="attached fluid segment" loading={isLoading}>
                        <Form.Group widths="equal">
                            <Form.Input
                                fluid
                                label="Tag Name"
                                placeholder="Tag Name"
                                value={tag.name || ''}
                                onChange={onTagNameInputChange}
                                required
                            />
                        </Form.Group>
                        <FormFooter
                            isSubmitDisabled={!isReadyToSubmit}
                            onSubmitClick={saveTag}
                            backButtonURL={ADMIN_APP_ROUTES.TAGS}
                        />
                    </Form>
                </>
            )}
        </div>
    );
};
