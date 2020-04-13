import * as React from 'react';
import { useParams } from 'react-router';
import { LoadingSpinner } from 'tmw-main/components/LoadingSpinner';
import { Resource } from 'tmw-main/constants/app-types';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { serializeResourcesFromAPI } from 'tmw-main/utils/api-serialize';
import { parseSearchTags } from 'tmw-main/utils/tags-search-url';
import { useViewport } from 'tmw-common/components/ViewportProvider';
import { VIEWPORT_BREAKPOINTS } from 'tmw-main/constants/app-constants';
import { SearchResultsList } from 'tmw-main/components/SearchResultsList';

import './search-results-page.less';

export const SearchResultsPage: React.FunctionComponent = () => {
    const { width } = useViewport();
    const isMobileViewport = width < VIEWPORT_BREAKPOINTS.MOBILE;

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [resultResources, setResultResources] = React.useState<Resource[]>([]);

    const { searchTags } = useParams();

    const fetchSearchResults = (selectedTags: string[]): Promise<void> => {
        setIsLoading(true);
        return ajaxPost('resources/search', { tags: selectedTags })
            .then(res => {
                const serializedResources = serializeResourcesFromAPI(res.data || []);
                setResultResources(serializedResources);
            })
            .catch(() => {
                // TODO: Add errors and no-results handling
            });
    };

    React.useEffect(() => {
        const parsedSearchTags = searchTags ? parseSearchTags(searchTags) : [];
        fetchSearchResults(parsedSearchTags).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const hasResults = resultResources.length > 0;
    const pageTitle = hasResults
        ? 'Here are some websites to improve your workflow'
        : "We didn't find any result for this search...";

    return (
        <div className="search-results-page">
            {isLoading ? (
                <div className="search-results-page__loading-spinner">
                    <LoadingSpinner />
                    <br />
                    Loading results
                </div>
            ) : (
                <>
                    {!isMobileViewport ? (
                        <div className="search-results-page__top-spacing" />
                    ) : null}
                    <p className="search-results-page__title">{pageTitle}</p>
                    {hasResults ? <SearchResultsList resultsList={resultResources} /> : null}
                </>
            )}
        </div>
    );
};
