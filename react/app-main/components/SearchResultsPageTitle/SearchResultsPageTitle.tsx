import * as React from 'react';
import { BasicTag } from 'tmw-main/constants/app-types';

import './search-results-page-title.less';
import { useHistory } from 'react-router-dom';
import { MAIN_APP_ROUTES } from 'tmw-main/constants/app-constants';

interface SearchResultsPageTitleProps {
    hasResults: boolean;
    isLoading: boolean;
    mainSearchTag: BasicTag | undefined;
    relatedSearchTags: BasicTag[];
}

export const SearchResultsPageTitle: React.FunctionComponent<SearchResultsPageTitleProps> = ({
    hasResults,
    isLoading,
    mainSearchTag,
    relatedSearchTags,
}) => {
    const history = useHistory();

    const loadSearchPage = (mainTagSlug: string, relatedTagSlug?: string): void => {
        const relatedTagParameter = relatedTagSlug ? `&related=${relatedTagSlug}` : ``;
        const searchRoute = `${MAIN_APP_ROUTES.SEARCH}?main=${mainTagSlug}${relatedTagParameter}`;
        history.push(searchRoute);
    };

    return (
        <div className="search-results-page-title">
            <div className="search-results-page-title__title">
                {isLoading || hasResults ? (
                    <>
                        Level-up your{' '}
                        <span className="search-results-page-title__title-emphasis">workflow!</span>
                    </>
                ) : (
                    <>{"We didn't find any resource for these tags..."}</>
                )}
            </div>
            <div className="search-results-page-title__subtitle">
                {isLoading ? (
                    'Looking for great resources...'
                ) : hasResults && mainSearchTag ? (
                    <>
                        <span className="search-results-page-title__primary-search-tag-separator">
                            /
                        </span>

                        <span
                            className="search-results-page-title__primary-search-tag"
                            onClick={(): void => loadSearchPage(mainSearchTag?.slug)}
                        >
                            {mainSearchTag.name}
                        </span>
                        {relatedSearchTags.map(tag => (
                            <React.Fragment key={tag.id}>
                                <span className="search-results-page-title__secondary-search-tag-separator">
                                    /
                                </span>
                                <span
                                    className="search-results-page-title__secondary-search-tag"
                                    onClick={(): void => loadSearchPage(mainSearchTag?.slug, tag.slug)}
                                >
                                    {tag.name}
                                </span>
                            </React.Fragment>
                        ))}
                    </>
                ) : (
                    'Please try to broaden the scope of your search'
                )}
            </div>
        </div>
    );
};
