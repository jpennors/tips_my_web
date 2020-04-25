import * as React from 'react';
import { SubmitButton } from 'tmw-main/components/SubmitButton';
import { VALIDATION } from 'tmw-main/constants/app-constants';
import { addHttpPrefix, isValidUrl } from 'tmw-main/utils/form-validation';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { InputField } from 'tmw-main/components/InputField';

import './suggestion-form.less';

const getSuggestionValidationMessages = (
    address: string,
    description: string,
): { address: string; description: string } => {
    const validationMessages = {
        address: '',
        description: '',
    };

    if (!address) {
        validationMessages.address = "You need to provide the website's url here";
    } else if (!isValidUrl(address)) {
        validationMessages.address = 'The provided URL is not valid';
    } else if (address.length > VALIDATION.URL_MAX_LENGTH) {
        validationMessages.address = `The URL can't be longer than ${VALIDATION.URL_MAX_LENGTH} characters`;
    }

    if (!description) {
        validationMessages.description = 'Please add a quick description';
    } else if (
        description.length > VALIDATION.DESCRIPTION_MAX_LENGTH ||
        description.length < VALIDATION.DESCRIPTION_MIN_LENGTH
    ) {
        validationMessages.description = `The description should be between ${VALIDATION.DESCRIPTION_MIN_LENGTH} and ${VALIDATION.DESCRIPTION_MAX_LENGTH} characters`;
    }

    return validationMessages;
};

interface SuggestionModalContentProps {
    finishedAction: () => void;
    finishedLabel: string;
}

export const SuggestionForm: React.FunctionComponent<SuggestionModalContentProps> = ({
    finishedAction,
    finishedLabel,
}) => {
    const [addressInputValue, setAddressInputValue] = React.useState<string>('');
    const [descriptionInputValue, setDescriptionInputValue] = React.useState<string>('');
    const [addressValidationMessage, setAddressValidationMessage] = React.useState<string>('');
    const [descriptionValidationMessage, setDescriptionValidationMessage] = React.useState<string>(
        '',
    );

    const [hasSubmitError, setHasSubmitError] = React.useState<boolean>(false);
    const [hasSubmitSuccess, setHasSubmitSuccess] = React.useState<boolean>(false);
    const [isSubmitPending, setIsSubmitPending] = React.useState<boolean>(false);

    const handleAddressInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setAddressInputValue(value);
    };

    const handleDescriptionInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const { value } = event.target;
        setDescriptionInputValue(value);
    };

    const submitSuggestionForm = async (): Promise<void> => {
        const validationMessages = getSuggestionValidationMessages(
            addressInputValue,
            descriptionInputValue,
        );
        const isFormValid = !validationMessages.address && !validationMessages.description;
        setAddressValidationMessage(validationMessages.address);
        setDescriptionValidationMessage(validationMessages.description);

        if (isFormValid) {
            const payload = {
                url: addHttpPrefix(addressInputValue),
                description: descriptionInputValue,
            };

            setIsSubmitPending(true);
            ajaxPost('suggestions', payload)
                .then(() => {
                    setHasSubmitSuccess(true);
                    setHasSubmitError(false);
                })
                .catch(error => {
                    // Additional error messages from backend validation (shouldn't happen)
                    const errorMessages = error.response?.data?.errors;
                    setAddressValidationMessage(errorMessages?.url || '');
                    setDescriptionValidationMessage(errorMessages?.description || '');
                    if (!errorMessages?.url && !errorMessages?.description) {
                        // Show error message when it's not a validation error
                        setHasSubmitError(true);
                    }
                })
                .finally(() => {
                    setIsSubmitPending(false);
                });
        }
    };

    return (
        <div className="suggestion-form">
            <div className="suggestion-form__title">Share a website</div>
            <div className="suggestion-form__subtitle">
                {!hasSubmitSuccess
                    ? 'Share your favorite resources with the community'
                    : 'Your suggestion was successfully submitted'}
            </div>
            <div className="suggestion-form__body">
                <form className="suggestion-form__form" autoComplete="off">
                    <InputField
                        className="suggestion-form__address-input"
                        type="text"
                        placeholder="The website's address"
                        name="address-input"
                        value={addressInputValue}
                        isRequired
                        onChange={handleAddressInputChange}
                        validationMessage={addressValidationMessage}
                        isInvalid={addressValidationMessage.length > 0}
                        isDisabled={isSubmitPending || hasSubmitSuccess}
                    />
                    <InputField
                        type="textarea"
                        className="suggestion-form__description-input"
                        placeholder="A short description"
                        name="description-input"
                        value={descriptionInputValue}
                        isRequired
                        onChange={handleDescriptionInputChange}
                        validationMessage={descriptionValidationMessage}
                        isInvalid={descriptionValidationMessage.length > 0}
                        isDisabled={isSubmitPending || hasSubmitSuccess}
                        charactersCounter={VALIDATION.DESCRIPTION_MAX_LENGTH}
                    />
                </form>
            </div>
            <div className="suggestion-form__buttons">
                <SubmitButton
                    onClick={submitSuggestionForm}
                    isValid={hasSubmitSuccess}
                    isPending={isSubmitPending}
                    finishedLabel={finishedLabel}
                    finishedAction={finishedAction}
                />
            </div>
            {hasSubmitError ? (
                <div className="contact-modal-content__submit-error">
                    We&apos;re having trouble submitting your suggestion, please try again!
                </div>
            ) : null}
        </div>
    );
};
