import * as React from 'react';
import { PrimaryTag } from 'tmw-main/constants/app-types';

import './search-results-page-title.less';

interface SearchResultsPageTitleProps {
    hasResults: boolean;
    isLoading: boolean;
    primarySearchTag: PrimaryTag | undefined;
}

export const SearchResultsPageTitle: React.FunctionComponent<SearchResultsPageTitleProps> = ({
    hasResults,
    isLoading,
    primarySearchTag,
}) => {
    let pageTitle: string;
    if (hasResults) {
        pageTitle = 'Here are some websites to improve your workflow';
    } else if (isLoading) {
        pageTitle = 'Looking for results...';
    } else {
        pageTitle = "We didn't find any result for this search...";
    }

    return (
        <>
            <p className="search-results-page-title__title">{pageTitle}</p>
            <div className="search-results-page-title__search-tags">
                {primarySearchTag ? (
                    <>
                        <span className="search-results-page-title__primary-search-tag-separator">
                            /
                        </span>
                        <span className="search-results-page-title__primary-search-tag">
                            {primarySearchTag.name}
                        </span>
                        {primarySearchTag.secondaryTags.map(tag => (
                            <>
                                <span className="search-results-page-title__secondary-search-tag-separator">
                                    /
                                </span>
                                <span className="search-results-page-title__secondary-search-tag">
                                    {tag.name}
                                </span>
                            </>
                        ))}
                    </>
                ) : (
                    '...'
                )}
            </div>
        </>
    );
};
