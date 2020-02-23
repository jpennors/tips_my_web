import * as React from 'react';
import { useParams } from 'react-router';
import { ResourceTile } from 'tmw-main/components/ResourceTile';
import { Resource } from 'tmw-main/constants/app-types';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { serializeResourcesFromAPI } from 'tmw-main/utils/api-serialize';

import './search-results-page.css';

/*
 * Search tags are encoded in url like this : tag1&tag2&tag3
 * This function parses the url and returns the array of tags.
 */
const parseSearchTags = (searchTagsString: string): string[] => {
    return searchTagsString.split('&');
};

export const SearchResultsPage: React.FunctionComponent = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [resultResources, setResultResources] = React.useState<Resource[]>([]);

    const { searchTags } = useParams();

    const fetchSearchResults = (selectedTags: string[]): Promise<void> => {
        setIsLoading(true);
        return ajaxPost('resources/search', { tags: selectedTags }).then(res => {
            const serializedResources =  serializeResourcesFromAPI(res.data || []);
            setResultResources(serializedResources);
        }).catch(() => {
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

    return (
        <div className="search-results-page">
            {isLoading ? (
                <div className="ui active inverted loader" />
            ) : (
                <div className="search-results-page__results">
                    <p className="search-results-page__results-title">Here are some websites to improve your workflow</p>
                    <div className="search-results-page__results-list">
                        {resultResources.map(resource => (
                            <ResourceTile
                                key={resource.id}
                                resource={resource}
                                knowResourceAction={(): void => knownResource(resource.id)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
