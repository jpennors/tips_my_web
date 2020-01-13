import * as React from 'react';

import './suggestion-modal-content.css';

export const SuggestionModalContent: React.FunctionComponent = () => {
    const [inputAddressValue, setInputAddressValue] = React.useState<string>('');
    const [inputDescriptionValue, setInputDescriptionValue] = React.useState<string>('');

    const handleAddressInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        // TODO: Add validation
        setInputAddressValue(value);
    };

    const handleDescriptionInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const { value } = event.target;
        // TODO: Add validation
        setInputDescriptionValue(value);
    };

    return (
        <div className="suggestion-modal-content">
            <div className="suggestion-modal-content__title">Share a website</div>
            <div className="suggestion-modal-content__subtitle">Share your favorite resources with the community</div>
            <div className="suggestion-modal-content__body">
                <form className="suggestion-modal-content__form">
                    <input
                        className="suggestion-modal-content__address-input"
                        type="text"
                        placeholder="The website's address"
                        name="address-input"
                        value={inputAddressValue}
                        required
                        onChange={handleAddressInputChange}
                    />
                    <textarea
                        className="suggestion-modal-content__description-input"
                        placeholder="A short description"
                        name="description-input"
                        value={inputDescriptionValue}
                        required
                        onChange={handleDescriptionInputChange}
                    />
                </form>
            </div>
            <div className="suggestion-modal-content__buttons">
                <a className="suggestion-modal-content__submit-button">SUBMIT</a>
            </div>
        </div>
    );
};
