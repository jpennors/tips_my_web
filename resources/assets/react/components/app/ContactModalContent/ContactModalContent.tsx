import * as React from 'react';

import './contact-modal-content.css';

export const ContactModalContent: React.FunctionComponent = () => {
    const [inputEmailValue, setInputEmailValue] = React.useState<string>('');
    const [inputMessageValue, setInputMessageValue] = React.useState<string>('');

    const handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        // TODO: Add validation
        setInputEmailValue(value);
    };

    const handleMessageInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const { value } = event.target;
        // TODO: Add validation
        setInputMessageValue(value);
    };

    return (
        <div className="contact-modal-content">
            <div className="contact-modal-content__title">Contact</div>
            <div className="contact-modal-content__subtitle">Send us your comments!</div>
            <div className="contact-modal-content__body">
                <form className="contact-modal-content__form">
                    <input
                        className="contact-modal-content__email-input"
                        type="text"
                        placeholder="Your email"
                        name="email-input"
                        value={inputEmailValue}
                        required
                        onChange={handleEmailInputChange}
                    />
                    <textarea
                        className="contact-modal-content__message-input"
                        placeholder="Tell us what you think"
                        name="messageInput"
                        value={inputMessageValue}
                        required
                        onChange={handleMessageInputChange}
                    />
                </form>
            </div>
            <div className="contact-modal-content__buttons">
                <a className="contact-modal-content__submit-button">SUBMIT</a>
            </div>
        </div>
    );
};
