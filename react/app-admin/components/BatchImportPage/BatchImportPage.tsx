import * as React from 'react';
import { ActionMessage } from 'tmw-admin/components/ActionMessage';
import { FormFooter } from 'tmw-admin/components/FormFooter';
import { APIBasicTag, APIResource, APITag } from 'tmw-admin/constants/api-types';
import { InputSelectOption } from 'tmw-admin/utils/select-options';
import * as XLSX from 'xlsx';
import { PageHeader } from 'tmw-admin/components/PageHeader';
import { Form, Message } from 'semantic-ui-react';
import { ajaxPost } from 'tmw-common/utils/ajax';

const importTypeOptions: InputSelectOption[] = [
    { key: 'resources', value: 'resources', text: 'Resources' },
    { key: 'tags', value: 'tags', text: 'Tags' },
];

export const BatchImportPage: React.FunctionComponent = () => {
    const [importType, setImportType] = React.useState<string>('');
    const [importedFile, setImportedFile] = React.useState<File>();
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [successMessage, setSuccessMessage] = React.useState<string>('');
    const [validationErrors, setValidationErrors] = React.useState<string[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const isReadyToSubmit = importedFile !== undefined && importType.length > 0;

    const onImportTypeInputChange = (_: any, { value }: { value: string }): void => {
        setImportType(value);
    };

    const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files) {
            const file = event.target.files[0];
            if (
                file &&
                file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ) {
                setImportedFile(file);
            } else if (file) {
                setErrorMessage('File format should be .xlsx');
            }
        }
    };

    const resetForm = (): void => {
        setImportType('');
        setImportedFile(undefined);
    };

    const checkTagsValidity = (tags: Partial<APIBasicTag>[]): string[] => {
        const errors: string[] = [];
        tags.forEach((tag, index) => {
            if (!tag.name) {
                errors.push(`Tag #${index}: "name" was not provided.`);
            }
        });
        return errors;
    };

    const checkResourcesValidity = (resources: Partial<APIResource>[]): string[] => {
        const errors: string[] = [];
        resources.forEach((resource, index) => {
            if (!resource.name) {
                errors.push(`Resource #${index}: "name" was not provided.`);
            }
            if (!resource.url) {
                errors.push(`Resource #${index}: "url" was not provided.`);
            }
            if (!resource.score) {
                errors.push(`Resource #${index}: "score" was not provided.`);
            } else if (!Number.isInteger(resource.score)) {
                errors.push(`Resource #${index}: "name" should be an integer.`);
            }
            if (!resource.language) {
                errors.push(`Resource #${index}: "language" was not provided.`);
            }
        });
        return errors;
    };

    const submitBatchData = (data: any): void => {
        setIsLoading(true);
        ajaxPost(`import/${importType}`, { data })
            .then(() => {
                setSuccessMessage('The file was successfully imported!');
                resetForm();
            })
            .catch(() => {
                setErrorMessage(
                    'Error while posting the file to the API. The import probably failed.',
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleFile = (): void => {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e): void => {
            /* Parse data */
            const bstr = e.target ? e.target.result : null;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);
            /* Update state */

            let errors: string[] = [];
            if (importType === 'tags') {
                errors = checkTagsValidity(data as Partial<APITag>[]);
            } else if (importType === 'resources') {
                errors = checkResourcesValidity(data as Partial<APIResource>[]);
            }

            if (errors.length > 0) {
                setValidationErrors(errors);
            } else {
                submitBatchData(data);
            }
        };

        if (importedFile) {
            if (rABS) {
                reader.readAsBinaryString(importedFile);
            } else {
                reader.readAsArrayBuffer(importedFile);
            }
        } else {
            setErrorMessage('Error while trying to read batch file.');
        }
    };

    return (
        <div>
            <PageHeader
                iconName="plus circle"
                headerContent="Batch Import"
                subHeaderContent="Import resources and tags from a file"
            />
            <ActionMessage type="success" message={successMessage} />
            <ActionMessage type="error" message={errorMessage} />
            <Message
                attached
                header="Import a batch file"
                content="The resources/tags will be imported all at once"
            />
            <Form className="attached fluid segment" loading={isLoading}>
                <Form.Group widths="equal">
                    <Form.Input
                        fluid
                        label="File"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        type="file"
                        onChange={onFileInputChange}
                        required
                    />
                    <Form.Select
                        fluid
                        label="Type"
                        placeholder="Type"
                        options={importTypeOptions}
                        value={importType}
                        onChange={onImportTypeInputChange}
                        required
                    />
                </Form.Group>
                <FormFooter isSubmitDisabled={!isReadyToSubmit} onSubmitClick={handleFile} />
            </Form>
            {validationErrors.length > 0 ? (
                <Message error header="Errors found in batch file" list={validationErrors} />
            ) : null}
        </div>
    );
};
