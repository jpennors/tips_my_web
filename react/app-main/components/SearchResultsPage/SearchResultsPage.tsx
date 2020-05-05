import * as React from 'react';
import { useParams } from 'react-router';
import { APIBasicTag } from 'tmw-admin/constants/api-types';
import { DocumentHead } from 'tmw-main/components/DocumentHead';
import { SearchResultsPageTitle } from 'tmw-main/components/SearchResultsPageTitle';
import { APIResource } from 'tmw-main/constants/api-types';
import { BasicTag, Resource } from 'tmw-main/constants/app-types';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { serializeResourcesFromAPI, serializeBasicTagsFromAPI } from 'tmw-main/utils/api-serialize';
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
    const [mainSearchTag, setMainSearchTag] = React.useState<BasicTag>();
    const [relatedSearchTags, setRelatedSearchTags] = React.useState<BasicTag[]>([]);

    const { searchTags } = useParams();

    const fetchSearchResults = (selectedTags: string[]): Promise<void> => {
        setIsLoading(true);
        return ajaxPost('resources/search', { tags: selectedTags })
            .then((response: { data: { resources: APIResource[]; tags: APIBasicTag[] } }) => {
                const serializedResources = serializeResourcesFromAPI(
                    response.data.resources || [],
                );
                setResultResources(serializedResources);
                const tags = serializeBasicTagsFromAPI(response.data.tags || []);
                if (tags.length > 0) {
                    setMainSearchTag(tags[0]);
                    setRelatedSearchTags(tags.slice(1));
                }
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

    return (
        <div className="search-results-page">
            <DocumentHead title={mainSearchTag?.name || 'Search'} />
            {!isMobileViewport ? <div className="search-results-page__top-spacing" /> : null}
            <SearchResultsPageTitle
                hasResults={hasResults}
                isLoading={isLoading}
                mainSearchTag={mainSearchTag}
                relatedSearchTags={relatedSearchTags}
            />
            {isLoading || hasResults ? (
                <SearchResultsList resultsList={resultResources} isLoading={isLoading} />
            ) : (
                <div className="search-results-page__no-results">
                    <img
                        src="/images/no-results-error.svg"
                        alt="Not Found"
                        className="search-results-page__no-results-image"
                    />
                </div>
            )}
        </div>
    );
};
