import * as React from 'react';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { InputField } from 'tmw-main/components/InputField';
import { SubmitButton } from 'tmw-main/components/SubmitButton';
import { isValidEmail } from 'tmw-main/utils/form-validation';

import './contact-modal-content.less';

export const ContactModalContent: React.FunctionComponent = () => {
    const [emailInputValue, setEmailInputValue] = React.useState<string>('');
    const [messageInputValue, setMessageInputValue] = React.useState<string>('');
    const [emailValidationMessage, setEmailValidationMessage] = React.useState<string>('');
    const [messageValidationMessage, setMessageValidationMessage] = React.useState<string>('');

    const [hasSubmitError, setHasSubmitError] = React.useState<boolean>(false);
    const [hasSubmitSuccess, setHasSubmitSuccess] = React.useState<boolean>(false);
    const [isSubmitPending, setIsSubmitPending] = React.useState<boolean>(false);

    const handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setEmailInputValue(value);
    };

    const handleMessageInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const { value } = event.target;
        setMessageInputValue(value);
    };

    const submitContactForm = async (): Promise<void> => {
        let isFormValid = true;

        // Email validation
        if (!emailInputValue) {
            setEmailValidationMessage('You need to provide an email address here');
            isFormValid = false;
        } else if (!isValidEmail(emailInputValue)) {
            setEmailValidationMessage('The provided email address is not valid');
            isFormValid = false;
        } else {
            setEmailValidationMessage('');
        }

        // Message validation
        if (!messageInputValue) {
            setMessageValidationMessage('Your message is empty!');
            isFormValid = false;
        } else if (messageInputValue.length > 500) {
            setMessageValidationMessage("Your message can't be longer than 500 characters");
            isFormValid = false;
        } else {
            setMessageValidationMessage('');
        }

        if (isFormValid) {
            const payload = {
                email: emailInputValue,
                message: messageInputValue,
            };

            setIsSubmitPending(true);
            ajaxPost('contacts', payload)
                .then(() => {
                    setHasSubmitSuccess(true);
                    setHasSubmitError(false);
                })
                .catch(error => {
                    // Additional error messages from backend validation (shouldn't happen)
                    const errorMessages = error.response?.data?.errors;
                    setEmailValidationMessage(errorMessages?.email || '');
                    setMessageValidationMessage(errorMessages?.message || '');
                    if (!errorMessages?.email && !errorMessages?.message) {
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
        <div className="contact-modal-content">
            <div className="contact-modal-content__title">Contact</div>
            <div className="contact-modal-content__subtitle">
                {!hasSubmitSuccess
                    ? 'Send us your comments!'
                    : 'Your message was successfully submitted!'}
            </div>
            <div className="contact-modal-content__body">
                <form className="contact-modal-content__form">
                    <InputField
                        className="contact-modal-content__email-input"
                        type="text"
                        placeholder="Your email"
                        name="email-input"
                        value={emailInputValue}
                        isRequired
                        onChange={handleEmailInputChange}
                        validationMessage={emailValidationMessage}
                        isInvalid={emailValidationMessage.length > 0}
                        isDisabled={isSubmitPending || hasSubmitSuccess}
                    />
                    <InputField
                        type="textarea"
                        className="contact-modal-content__message-input"
                        placeholder="Tell us what you think"
                        name="messageInput"
                        value={messageInputValue}
                        isRequired
                        onChange={handleMessageInputChange}
                        validationMessage={messageValidationMessage}
                        isInvalid={messageValidationMessage.length > 0}
                        isDisabled={isSubmitPending || hasSubmitSuccess}
                        charactersCounter={500}
                    />
                </form>
            </div>
            <div className="contact-modal-content__buttons">
                <SubmitButton
                    onClick={submitContactForm}
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
