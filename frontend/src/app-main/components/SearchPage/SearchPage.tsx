import * as React from 'react';
import { DocumentHead } from 'tmw-main/components/DocumentHead';
import { TagsSelector } from 'tmw-main/components/TagsSelector';

import './search-page.less';

export const SearchPage: React.FunctionComponent = () => {
    return (
        <div className="search-page">
            <DocumentHead title="Home" />
            <div className="search-page__top-spacing" />
            <p className="search-page__title">What are your centers of interest?</p>
            <p className="search-page__subtitle">Let’s find your most useful websites</p>
            <TagsSelector />
        </div>
    );
};
