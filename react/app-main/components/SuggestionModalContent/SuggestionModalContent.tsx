import * as React from 'react';
import { SubmitButton } from 'tmw-main/components/SubmitButton';
import { isValidUrl } from 'tmw-main/utils/form-validation';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { InputField } from 'tmw-main/components/InputField';

import './suggestion-modal-content.less';

export const SuggestionModalContent: React.FunctionComponent = () => {
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
        const payload = {
            url: addressInputValue,
            description: descriptionInputValue,
        };

        let isFormValid = true;

        // URL validation
        if (!addressInputValue) {
            setAddressValidationMessage("You need to provide the website's url here");
            isFormValid = false;
        } else if (!isValidUrl(addressInputValue)) {
            setAddressValidationMessage('The provided URL is not valid');
            isFormValid = false;
        } else {
            setAddressValidationMessage('');
        }

        // Description validation
        if (!descriptionInputValue) {
            setDescriptionValidationMessage('Please add a quick description');
            isFormValid = false;
        } else {
            setDescriptionValidationMessage('');
        }

        if (isFormValid) {
            setIsSubmitPending(true);
            ajaxPost('suggestions', payload)
                .then(() => {
                    setHasSubmitSuccess(true);
                })
                .catch(error => {
                    // Additional error messages from backend validation (shouldn't happen)
                    const errorMessages = error.response?.data?.errors;
                    setAddressValidationMessage(errorMessages?.url || '');
                    setDescriptionValidationMessage(errorMessages?.description || '');
                    setHasSubmitError(true);
                })
                .finally(() => {
                    setIsSubmitPending(false);
                });
        }
    };

    return (
        <div className="suggestion-modal-content">
            <div className="suggestion-modal-content__title">Share a website</div>
            <div className="suggestion-modal-content__subtitle">
                {!hasSubmitSuccess
                    ? 'Share your favorite resources with the community!'
                    : 'Your suggestion was successfully submitted!'}
            </div>
            <div className="suggestion-modal-content__body">
                <form className="suggestion-modal-content__form">
                    <InputField
                        className="suggestion-modal-content__address-input"
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
                        className="suggestion-modal-content__description-input"
                        placeholder="A short description"
                        name="description-input"
                        value={descriptionInputValue}
                        isRequired
                        onChange={handleDescriptionInputChange}
                        validationMessage={descriptionValidationMessage}
                        isInvalid={descriptionValidationMessage.length > 0}
                        isDisabled={isSubmitPending || hasSubmitSuccess}
                    />
                </form>
            </div>
            <div className="suggestion-modal-content__buttons">
                <SubmitButton
                    onClick={submitSuggestionForm}
                    isValid={hasSubmitSuccess}
                    isPending={isSubmitPending}
                />
            </div>
            {hasSubmitError ? (
                <div className="contact-modal-content__submit-error">
                    We&apos;re having trouble submitting your message, please try again!
                </div>
            ) : null}
        </div>
    );
};
