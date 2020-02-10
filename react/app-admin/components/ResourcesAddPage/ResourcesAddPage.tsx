import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Form,
    Header,
    Icon,
    Message,
    Segment,
    TextArea,
    Grid,
    Image,
    Label,
    Container,
} from 'semantic-ui-react';
import { ADMIN_APP_RESOURCES_URL, LOCALES, LOCALES_NAMES } from 'tmw-admin/constants/app-constants';
import { Resource, TagsMap } from 'tmw-admin/constants/app-types';
import {
    serializePricesFromAPI,
    serializeResourceToAPI,
    serializeResourceTypesFromAPI,
    serializeTagsFromAPI,
} from 'tmw-admin/utils/api-serialize';
import { convertToSelectOptions, InputSelectOption } from 'tmw-admin/utils/select-options';
import { buildTagsMap } from 'tmw-admin/utils/tags';
import { ajaxGet, ajaxPost, ajaxPostImage } from 'tmw-common/utils/ajax';

const localNameOptions: InputSelectOption[] = Object.values(LOCALES).map(locale => ({ key: locale, value: locale, text: LOCALES_NAMES[locale] }));

export const ResourcesAddPage: React.FunctionComponent = () => {
    const [resource, setResource] = React.useState<Partial<Resource>>({});
    const [resourceImageTempURL, setResourceImageTempURL] = React.useState<string>('');
    const [resourceImageFile, setResourceImageFile] = React.useState<File>();

    const [pricesOptions, setPricesOptions] = React.useState<InputSelectOption[]>([]);
    const [typesOptions, setTypesOptions] = React.useState<InputSelectOption[]>([]);
    const [tagOptions, setTagOptions] = React.useState<InputSelectOption[]>([]);
    const [tagsMap, setTagsMap] = React.useState<TagsMap>({});

    const isReadyToSubmit = resource.name
        && resource.url
        && resource.description
        && resource.typeId
        && resource.priceId
        && resource.score
        && resource.interfaceScore
        && resource.locale;

    const [canEdit, setCanEdit] = React.useState<boolean>(true);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [successMessage, setSuccessMessage] = React.useState<string>('');
    const hasError = errorMessage.length > 0;
    const hasSuccess = successMessage.length > 0;

    const resetForm = (): void => {
        setResource({});
        setResourceImageFile(undefined);
        setResourceImageTempURL('');
    };

    const fetchPricesOptions = async (): Promise<void> => {
        ajaxGet('prices').then(res => {
            const prices = serializePricesFromAPI(res.data);
            setPricesOptions(convertToSelectOptions(prices, 'id', 'name'));
            setIsLoading(false);
        }).catch(() => {
            setErrorMessage('Error while fetching pricing options from API.');
            setCanEdit(false);
            setIsLoading(false);
        });
    };

    const fetchTypesOptions = async (): Promise<void> => {
        ajaxGet('types').then(res => {
            const types = serializeResourceTypesFromAPI(res.data);
            setTypesOptions(convertToSelectOptions(types, 'id', 'name'));
            setIsLoading(false);
        }).catch(() => {
            setErrorMessage('Error while fetching types options from API.');
            setCanEdit(false);
            setIsLoading(false);
        });
    };

    const fetchTagOptions = async (): Promise<void> => {
        ajaxGet('tags').then(res => {
            const tags = serializeTagsFromAPI(res.data);
            setTagOptions(convertToSelectOptions(tags, 'id', 'name'));
            setTagsMap(buildTagsMap(tags));
            setIsLoading(false);
        }).catch(() => {
            setErrorMessage('Error while fetching tag options from API.');
            setCanEdit(false);
            setIsLoading(false);
        });
    };

    const onResourceNameInputChange = (event: React.ChangeEvent<HTMLInputElement>, { value }: { value: string}): void => {
        setResource({ ...resource, name: value });
    };

    const onResourceURLInputChange = (event: React.ChangeEvent<HTMLInputElement>, { value }: { value: string}): void => {
        setResource({ ...resource, url: value });
    };

    const onResourceImageInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files) {
            const file = event.target.files[0];
            setResourceImageTempURL(URL.createObjectURL(file));
            setResourceImageFile(file);
        }
    };

    const onResourceTypeIdInputChange = (event: React.SyntheticEvent<HTMLElement>, { value }: { value: string}): void => {
        setResource({ ...resource, typeId: value });
    };

    const onResourceLanguageInputChange = (event: React.SyntheticEvent<HTMLElement>, { value }: { value: string}): void => {
        setResource({ ...resource, locale: value });
    };

    const onResourcePriceIdInputChange = (event: React.SyntheticEvent<HTMLElement>, { value }: { value: string}): void => {
        setResource({ ...resource, priceId: value });
    };

    const onResourceDescriptionInputChange = (event: React.FormEvent<HTMLTextAreaElement>, { value }: { value: string}): void => {
        setResource({ ...resource, description: value });
    };

    const onResourceScoreInputChange = (event: React.ChangeEvent<HTMLInputElement>, { value }: { value: string}): void => {
        setResource({ ...resource, score: parseInt(value) });
    };

    const onResourceInterfaceScoreInputChange = (event: React.ChangeEvent<HTMLInputElement>, { value }: { value: string}): void => {
        setResource({ ...resource, interfaceScore: parseInt(value) });
    };

    const addSelectedTag = (tagId: string): void => {
        const newTag = {
            tagId,
            belonging: 5,
            tag: tagsMap[tagId],
        };
        const newTags = resource.tags ? resource.tags.concat([newTag]) : [newTag];
        setResource({ ...resource, tags: newTags });
    };

    const removeSelectedTag = (tagId: string): void => {
        if (resource.tags) {
            const newTags = resource.tags.filter(tag => tag.tagId !== tagId);
            setResource({ ...resource, tags: newTags });
        }
    };

    const incrementSelectedTag = (tagId: string): void => {
        if (resource.tags) {
            const newTags = resource.tags.map(tag => {
                if(tag.tagId === tagId && tag.belonging < 10) {
                    return {
                        ...tag,
                        belonging: tag.belonging + 1,
                    };
                }
                return tag;
            });
            setResource({ ...resource, tags: newTags });
        }
    };

    const decrementSelectedTag = (tagId: string): void => {
        if (resource.tags) {
            const newTags = resource.tags.map(tag => {
                if(tag.tagId === tagId && tag.belonging > 1) {
                    return {
                        ...tag,
                        belonging: tag.belonging - 1,
                    };
                }
                return tag;
            });
            setResource({ ...resource, tags: newTags });
        }
    };

    const fileUpload = async (file: File, resourceId: string): Promise<void> => {
        const fd = new FormData();
        fd.append('file', file);
        ajaxPostImage(`resources/image/${resourceId}`, fd).catch(() => {
            setErrorMessage('Error while posting resource image API. The image was probably not saved.');
            setIsLoading(false);
        });
    };

    const saveResource = (): void => {
        setIsLoading(true);
        const newResource = serializeResourceToAPI(resource);
        ajaxPost('resources', newResource).then(res => {
            if (resourceImageFile) {
                fileUpload(resourceImageFile, res.data.id);
            }
            setSuccessMessage('Your resource "' + resource.name + '" was successfully saved.');
            resetForm();
            setIsLoading(false);
        }).catch(() => {
            setErrorMessage('Error while posting new resource to API. The new resource was probably not saved.');
            setIsLoading(false);
        });
    };

    React.useEffect(() => {
        fetchPricesOptions();
        fetchTypesOptions();
        fetchTagOptions();
    }, []);

    const displayedTagOptions = tagOptions.filter(tag =>
        !resource.tags ||
        !resource.tags.map(resourceTag => resourceTag.tagId).includes(tag.key),
    );

    return (
        <div>
            <Header dividing as="h3">
                <Icon name='world' />
                <Header.Content>
                    Add Resource
                    <Header.Subheader>Add a resource to be displayed on search results</Header.Subheader>
                </Header.Content>
            </Header>
            {hasSuccess ? (
                <Message positive icon>
                    <Icon name='check circle outline'/>
                    <Message.Content>
                        <Message.Header>Success!</Message.Header>
                        {successMessage}
                    </Message.Content>
                </Message>
            ) : null}
            {hasError ? (
                <Message negative icon>
                    <Icon name='warning circle'/>
                    <Message.Content>
                        <Message.Header>Something wrong happened...</Message.Header>
                        {errorMessage}
                    </Message.Content>
                </Message>
            ) : null}
            {canEdit ? (
                <>
                    <Message
                        attached
                        header='Add a resource with tags'
                        content='The resource will be available as a search result with the tags you set'
                    />
                    <Form className="attached fluid segment" loading={isLoading}>
                        <Form.Group widths="equal">
                            <Form.Input
                                fluid
                                label='Resource Name'
                                placeholder='Resource Name'
                                value={resource.name || ''}
                                onChange={onResourceNameInputChange}
                                required
                            />
                            <Form.Input
                                fluid
                                label='URL'
                                placeholder='URL'
                                value={resource.url || ''}
                                onChange={onResourceURLInputChange}
                                required
                            />
                        </Form.Group>
                        <Grid style={{ marginBottom: '5px' }}>
                            <Grid.Row stretched>
                                <Grid.Column width={6}>
                                    {resourceImageTempURL.length ? (
                                        <Segment>
                                            <Image src={resourceImageTempURL} size='small' rounded centered piled="false"/>
                                        </Segment>
                                    ) : (
                                        <Segment placeholder style={{ minHeight: '10rem' }}>
                                            <Header as='h4' icon>
                                                <Icon name='file alternate outline' />
                                                No Image
                                            </Header>
                                        </Segment>
                                    )}
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Form.Input
                                        fluid
                                        accept="image/*"
                                        placeholder='Image'
                                        type="file"
                                        onChange={onResourceImageInputChange}
                                    />
                                    <TextArea
                                        placeholder='Resource description'
                                        value={resource.description || ''}
                                        onChange={onResourceDescriptionInputChange}
                                        required
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Form.Group widths="equal">
                            <Form.Select
                                fluid
                                label='Type'
                                placeholder="Type"
                                options={typesOptions}
                                value={resource.typeId || ''}
                                onChange={onResourceTypeIdInputChange}
                                required
                            />
                            <Form.Select
                                fluid
                                label='Language'
                                placeholder="Language"
                                options={localNameOptions}
                                value={resource.locale || ''}
                                onChange={onResourceLanguageInputChange}
                                required
                            />
                            <Form.Select
                                fluid
                                label='Pricing'
                                placeholder="Pricing"
                                options={pricesOptions}
                                value={resource.priceId || ''}
                                onChange={onResourcePriceIdInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input
                                fluid
                                label='Score'
                                placeholder='Score'
                                type="number"
                                value={resource.score || ''}
                                onChange={onResourceScoreInputChange}
                                required
                            />
                            <Form.Input
                                fluid
                                label='Interface'
                                placeholder='Interface'
                                type="number"
                                value={resource.interfaceScore || ''}
                                onChange={onResourceInterfaceScoreInputChange}
                                required
                            />
                        </Form.Group>
                        <Container fluid style={{ marginBottom: '10px' }}>
                            <Header as="h5" attached='top'>
                                Associated Tags
                            </Header>
                            <Segment attached>
                                {resource.tags && resource.tags.length > 0 ? (
                                    <Label.Group style={{ marginBottom: '-0.5em' }}>
                                        {resource.tags.map(tag => (
                                            <Label key={tag.tagId} color='teal' image style={{ marginBottom: '0.5em' }}>
                                                <Icon name='trash alternate' link onClick={(): void => removeSelectedTag(tag.tagId)} />
                                                {tag.tag.name}
                                                <Label.Detail>
                                                    <Icon name='minus' size='small' link onClick={(): void => decrementSelectedTag(tag.tagId)} />
                                                        &nbsp;{tag.belonging}&nbsp;
                                                    <Icon name='plus' size='small' link onClick={(): void => incrementSelectedTag(tag.tagId)} />
                                                </Label.Detail>
                                            </Label>
                                        ))}
                                    </Label.Group>
                                ) : (
                                    <>No tags selected!</>
                                )}
                            </Segment>
                            <Segment attached secondary>
                                {displayedTagOptions.length ? (
                                    <Label.Group style={{ marginBottom: '-0.5em' }}>
                                        {displayedTagOptions.map(tag => (
                                            <Label key={tag.key} as='a' onClick={(): void => addSelectedTag(tag.key)}>
                                                <Icon name='plus'/>
                                                {tag.text}
                                            </Label>
                                        ))}
                                    </Label.Group>
                                ) : (
                                    <>No tags available!</>
                                )}
                            </Segment>
                        </Container>
                        <Link to={ADMIN_APP_RESOURCES_URL}>
                            <Button icon labelPosition='left'>
                                <Icon name='arrow left' />
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            icon
                            labelPosition='right'
                            color="blue"
                            onClick={saveResource}
                            disabled={!isReadyToSubmit}
                            floated="right"
                        >
                            Submit
                            <Icon name='upload' />
                        </Button>
                    </Form>
                </>
            ) : null}
        </div>
    );
};
