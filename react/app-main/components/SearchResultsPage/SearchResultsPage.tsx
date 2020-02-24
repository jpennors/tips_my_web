import * as React from 'react';
import { useParams } from 'react-router';
import { LoadingSpinner } from 'tmw-main/components/LoadingSpinner';
import { ResourceTile } from 'tmw-main/components/ResourceTile';
import { Resource } from 'tmw-main/constants/app-types';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { serializeResourcesFromAPI } from 'tmw-main/utils/api-serialize';
import { parseSearchTags } from 'tmw-main/utils/tags-search-url';

import './search-results-page.css';

export const SearchResultsPage: React.FunctionComponent = () => {
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

    const knownResource = (resourceId: string): void => {
        setResultResources(resultResources.filter(resource => resource.id !== resourceId));
    };

    React.useEffect(() => {
        const parsedSearchTags = searchTags ? parseSearchTags(searchTags) : [];
        fetchSearchResults(parsedSearchTags).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const pageTitle =
        resultResources.length > 0
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
                    <p className="search-results-page__title">{pageTitle}</p>
                    <div className="search-results-page__results-list">
                        {resultResources.map(resource => (
                            <ResourceTile
                                key={resource.id}
                                resource={resource}
                                knowResourceAction={(): void => knownResource(resource.id)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
