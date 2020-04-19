import * as React from 'react';

import { BigButton } from 'tmw-main/components/BigButton';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { InputField } from 'tmw-main/components/InputField';

import './suggestion-modal-content.less';

export const SuggestionModalContent: React.FunctionComponent = () => {
    const [addressInputValue, setAddressInputValue] = React.useState<string>('');
    const [descriptionInputValue, setDescriptionInputValue] = React.useState<string>('');

    const handleAddressInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        // TODO: Add validation
        setAddressInputValue(value);
    };

    const handleDescriptionInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const { value } = event.target;
        // TODO: Add validation
        setDescriptionInputValue(value);
    };

    const submitSuggestionForm = async (): Promise<void> => {
        // TODO: Add validation
        const payload = {
            url: addressInputValue,
            description: descriptionInputValue,
        };

        ajaxPost('suggestions', payload).then(() => {
            setAddressInputValue('');
            setDescriptionInputValue('');
        });

        // TODO: Handle ajax errors
    };

    return (
        <div className="suggestion-modal-content">
            <div className="suggestion-modal-content__title">Share a website</div>
            <div className="suggestion-modal-content__subtitle">
                Share your favorite resources with the community
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
                    />
                    <InputField
                        type="textarea"
                        className="suggestion-modal-content__description-input"
                        placeholder="A short description"
                        name="description-input"
                        value={descriptionInputValue}
                        isRequired
                        onChange={handleDescriptionInputChange}
                    />
                </form>
            </div>
            <div className="suggestion-modal-content__buttons">
                <BigButton content="SUBMIT" onClick={submitSuggestionForm} />
            </div>
        </div>
    );
};
