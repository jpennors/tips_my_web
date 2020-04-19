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
    return (
        <>
            <div className="search-results-page-title__title">
                {isLoading || hasResults ? (
                    <>
                        Level-up your{' '}
                        <span className="search-results-page-title__title-emphasis">workflow!</span>
                    </>
                ) : (
                    <>We didn`&apost find any resource for these tags...</>
                )}
            </div>
            <div className="search-results-page-title__subtitle">
                {isLoading ? (
                    'Looking for great resources...'
                ) : primarySearchTag ? (
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
                    'Please refine your search'
                )}
            </div>
        </>
    );
};
