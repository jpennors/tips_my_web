import * as React from 'react';
import { SuggestionModalContent } from 'tmw-main/components/SuggestionModalContent';

import './suggestion-page.less';

export const SuggestionPage: React.FunctionComponent = () => {
    return (
        <div className="suggestion-page">
            <div className="suggestion-page__container">
                <SuggestionModalContent />
            </div>
        </div>
    );
};
