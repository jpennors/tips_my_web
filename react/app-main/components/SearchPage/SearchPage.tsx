import * as React from 'react';
import { TagsSelector } from 'tmw-main/components/TagsSelector';
import { useViewport } from 'tmw-common/components/ViewportProvider';

import './search-page.css';
import classNames from 'classnames';

export const SearchPage: React.FunctionComponent = () => {
    const { width } = useViewport();
    const isMobileViewport = width < 450;

    return (
        <div className="search-page">
            <p
                className={classNames('search-page__title', {
                    'search-page__title--mobile': isMobileViewport,
                })}
            >
                What are your centers of interest?
            </p>
            <p
                className={classNames('search-page__subtitle', {
                    'search-page__subtitle--mobile': isMobileViewport,
                })}
            >
                Let’s find your most useful websites
            </p>
            <TagsSelector />
        </div>
    );
};
