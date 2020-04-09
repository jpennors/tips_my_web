import * as React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router';
import { LoadingSpinner } from 'tmw-main/components/LoadingSpinner';
import { ResourceTile } from 'tmw-main/components/ResourceTile';
import { Resource } from 'tmw-main/constants/app-types';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { serializeResourcesFromAPI } from 'tmw-main/utils/api-serialize';
import { parseSearchTags } from 'tmw-main/utils/tags-search-url';
import { useViewport } from 'tmw-common/components/ViewportProvider';
import { VIEWPORT_BREAKPOINTS } from 'tmw-main/constants/app-constants';

import './search-results-page.css';

export const SearchResultsPage: React.FunctionComponent = () => {
    const { width } = useViewport();
    const isMobileViewport = width < VIEWPORT_BREAKPOINTS.MOBILE;

    const [scrollLeftPosition, setScrollLeftPosition] = React.useState(0);
    const [scrollRightPosition, setScrollRightPosition] = React.useState(width * 0.88);

    const onResultsListScroll = (e: React.UIEvent<HTMLElement>): void => {
        const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
        setScrollLeftPosition(scrollLeft);
        setScrollRightPosition(scrollWidth - clientWidth - scrollLeft);
    };

    const showLeftArrow = scrollLeftPosition > 200;
    const showRightArrow = scrollRightPosition > 200;

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
                    <div className="search-results-page__top-spacing" />
                    <p
                        className={classNames('search-results-page__title', {
                            'search-results-page__title--mobile': isMobileViewport,
                        })}
                    >
                        {pageTitle}
                    </p>
                    <div
                        onScroll={onResultsListScroll}
                        className={classNames('search-results-page__results-list', {
                            'search-results-page__results-list--mobile': isMobileViewport,
                        })}
                    >
                        {!isMobileViewport ? (
                            <>
                                {showLeftArrow ? (
                                    <div className="search-results-page__scroll-arrow search-results-page__scroll-arrow-left ">
                                        <img
                                            src="/images/chevron-down.svg"
                                            alt="Scroll left"
                                            className="search-results-page__scroll-arrow-left-icon"
                                        />
                                    </div>
                                ) : null}

                                {showRightArrow ? (
                                    <div className="search-results-page__scroll-arrow search-results-page__scroll-arrow-right">
                                        <img
                                            src="/images/chevron-down.svg"
                                            alt="Scroll right"
                                            className="search-results-page__scroll-arrow-right-icon"
                                        />
                                    </div>
                                ) : null}
                            </>
                        ) : null}
                        {resultResources.map(resource => (
                            <ResourceTile key={resource.id} resource={resource} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
