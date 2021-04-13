import * as React from 'react';
import { useRouter } from 'next/router';
import { DocumentHead } from 'tmw-main/components/DocumentHead';
import { SuggestionForm } from 'tmw-main/components/SuggestionForm';
import { MAIN_APP_ROUTES } from 'tmw-main/constants/app-constants';

import './suggestion-page.less';

export const SuggestionPage: React.FunctionComponent = () => {
    const router = useRouter();
    return (
        <div className="suggestion-page">
            <DocumentHead title="Share a website" />
            <div className="suggestion-page__container">
                <SuggestionForm
                    finishedLabel="BACK HOME"
                    finishedAction={() => router.push(MAIN_APP_ROUTES.HOME)}
                />
            </div>
        </div>
    );
};
