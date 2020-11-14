import * as React from 'react';
import { DocumentHead } from 'tmw-main/components/DocumentHead';
import { TagsSelector } from 'tmw-main/components/TagsSelector';

import './search-page.less';

export const SearchPage: React.FunctionComponent = () => {
    return (
        <div className="search-page">
            <DocumentHead title="Home" />
            <div className="search-page__top-spacing" />
            <p className="search-page__title">
                Let&apos;s find the most <span className="search-page__title--bold">useful</span>{' '}
                websites for your <span className="search-page__title--bold">workflow</span>
            </p>
            <TagsSelector />
        </div>
    );
};
