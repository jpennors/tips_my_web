import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { SuggestionModalContent } from 'tmw-main/components/SuggestionModalContent';
import { MAIN_APP_ROUTES } from 'tmw-main/constants/app-constants';

import './suggestion-page.less';

export const SuggestionPage: React.FunctionComponent = () => {
    const history = useHistory();
    return (
        <div className="suggestion-page">
            <div className="suggestion-page__container">
                <SuggestionModalContent
                    finishedLabel="BACK HOME"
                    finishedAction={(): void => history.push(MAIN_APP_ROUTES.HOME)}
                />
            </div>
        </div>
    );
};
