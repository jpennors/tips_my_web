import * as React from 'react';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { BigButton } from 'tmw-main/components/BigButton';
import { InputField } from 'tmw-main/components/InputField';

import './contact-modal-content.less';

export const ContactModalContent: React.FunctionComponent = () => {
    const [emailInputValue, setEmailInputValue] = React.useState<string>('');
    const [messageInputValue, setMessageInputValue] = React.useState<string>('');

    const handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        // TODO: Add validation
        setEmailInputValue(value);
    };

    const handleMessageInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const { value } = event.target;
        // TODO: Add validation
        setMessageInputValue(value);
    };

    const submitContactForm = async (): Promise<void> => {
        // TODO: Add validation
        const payload = {
            email: emailInputValue,
            message: messageInputValue,
        };

        ajaxPost('contacts', payload).then(() => {
            setEmailInputValue('');
            setMessageInputValue('');
        });

        // TODO: Handle ajax errors
    };

    return (
        <div className="contact-modal-content">
            <div className="contact-modal-content__title">Contact</div>
            <div className="contact-modal-content__subtitle">Send us your comments!</div>
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
                    />
                    <InputField
                        type="textarea"
                        className="contact-modal-content__message-input"
                        placeholder="Tell us what you think"
                        name="messageInput"
                        value={messageInputValue}
                        isRequired
                        onChange={handleMessageInputChange}
                    />
                </form>
            </div>
            <div className="contact-modal-content__buttons">
                <BigButton content="SUBMIT" onClick={submitContactForm} />
            </div>
        </div>
    );
};
