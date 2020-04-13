import * as React from 'react';
import { useParams } from 'react-router';
import { LoadingSpinner } from 'tmw-main/components/LoadingSpinner';
import { ResourceTile } from 'tmw-main/components/ResourceTile';
import { Resource } from 'tmw-main/constants/app-types';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { serializeResourcesFromAPI } from 'tmw-main/utils/api-serialize';
import { parseSearchTags } from 'tmw-main/utils/tags-search-url';
import { useViewport } from 'tmw-common/components/ViewportProvider';
import { VIEWPORT_BREAKPOINTS } from 'tmw-main/constants/app-constants';

import './search-results-page.less';

export const SearchResultsPage: React.FunctionComponent = () => {
    const { width } = useViewport();
    const isMobileViewport = width < VIEWPORT_BREAKPOINTS.MOBILE;

    const resultsListElement = React.useRef<HTMLDivElement>(null);
    const [scrollLeftPosition, setScrollLeftPosition] = React.useState(0);
    const [scrollRightPosition, setScrollRightPosition] = React.useState(width * 0.88);

    const onResultsListScroll = (e: React.UIEvent<HTMLElement>): void => {
        const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
        setScrollLeftPosition(scrollLeft);
        setScrollRightPosition(scrollWidth - clientWidth - scrollLeft);
    };

    const onRightArrowClick = (): void => {
        resultsListElement?.current?.scrollBy({ left: 360, behavior: 'smooth' });
    };

    const onLeftArrowClick = (): void => {
        resultsListElement?.current?.scrollBy({ left: -360, behavior: 'smooth' });
    };

    const showLeftArrow = scrollLeftPosition > 0;
    const showRightArrow = scrollRightPosition > 0;

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
                    {!isMobileViewport ? (
                        <div className="search-results-page__top-spacing" />
                    ) : null}
                    <p className="search-results-page__title">{pageTitle}</p>
                    {!isMobileViewport ? (
                        <>
                            {showLeftArrow ? (
                                <div className="search-results-page__scroll-arrow search-results-page__scroll-arrow-left ">
                                    <img
                                        src="/images/chevron-down.svg"
                                        alt="Scroll left"
                                        className="search-results-page__scroll-arrow-left-icon"
                                        onClick={onLeftArrowClick}
                                    />
                                </div>
                            ) : null}

                            {showRightArrow ? (
                                <div className="search-results-page__scroll-arrow search-results-page__scroll-arrow-right">
                                    <img
                                        src="/images/chevron-down.svg"
                                        alt="Scroll right"
                                        className="search-results-page__scroll-arrow-right-icon"
                                        onClick={onRightArrowClick}
                                    />
                                </div>
                            ) : null}
                        </>
                    ) : null}
                    <div
                        ref={resultsListElement}
                        onScroll={onResultsListScroll}
                        className="search-results-page__results-list"
                    >
                        {resultResources.map(resource => (
                            <ResourceTile key={resource.id} resource={resource} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
