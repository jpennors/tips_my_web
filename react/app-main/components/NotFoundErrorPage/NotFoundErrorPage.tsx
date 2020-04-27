import * as React from 'react';

import './not-found-error-page.less';

export const NotFoundErrorPage: React.FunctionComponent = () => {
    return (
        <div className="not-found-error-page">
            <div className="not-found-error-page__content">
                <img
                    src="/images/not-found-image.svg"
                    alt="Not Found"
                    className="not-found-error-page__image"
                />
                <div className="not-found-error-page__text">Page not found</div>
            </div>
        </div>
    );
};
