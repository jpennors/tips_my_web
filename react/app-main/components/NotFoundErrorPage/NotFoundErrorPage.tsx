import * as React from 'react';
import { Link } from 'react-router-dom';
import { BigButton } from 'tmw-main/components/BigButton';
import { DocumentHead } from 'tmw-main/components/DocumentHead';
import { MAIN_APP_ROUTES } from 'tmw-main/constants/app-constants';

import './not-found-error-page.less';

export const NotFoundErrorPage: React.FunctionComponent = () => {
    return (
        <div className="not-found-error-page">
            <DocumentHead title="Page not found" />
            <div className="not-found-error-page__content">
                <img
                    src="/images/not-found-error.svg"
                    alt="Not Found"
                    className="not-found-error-page__image"
                />
                <div className="not-found-error-page__title">Page not found</div>
                <div className="not-found-error-page__subtitle">We sincerely apologize</div>
            </div>
            <div className="not-found-error-page__back-button">
                <Link to={MAIN_APP_ROUTES.HOME}>
                    <BigButton content="Back to Home Page" isColored={false} />
                </Link>
            </div>
        </div>
    );
};
