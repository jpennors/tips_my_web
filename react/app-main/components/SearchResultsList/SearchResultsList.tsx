import * as React from 'react';
import { ResourceTile } from 'tmw-main/components/ResourceTile';
import { Resource } from 'tmw-main/constants/app-types';
import { useViewport } from 'tmw-common/components/ViewportProvider';
import { VIEWPORT_BREAKPOINTS } from 'tmw-main/constants/app-constants';

import './search-results-list.less';

interface SearchResultsListProps {
    resultsList: Resource[];
}
export const SearchResultsList: React.FunctionComponent<SearchResultsListProps> = ({
    resultsList,
}) => {
    const { width } = useViewport();
    const isMobileViewport = width < VIEWPORT_BREAKPOINTS.MOBILE;

    const resultsListElement = React.useRef<HTMLDivElement>(null);
    const [scrollLeftPosition, setScrollLeftPosition] = React.useState(0);
    const [scrollRightPosition, setScrollRightPosition] = React.useState(0);

    const onResultsListScroll = (e: React.UIEvent<HTMLElement>): void => {
        const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
        setScrollLeftPosition(scrollLeft);
        setScrollRightPosition(scrollWidth - clientWidth - scrollLeft - 1);
    };

    const onRightArrowClick = (): void => {
        resultsListElement?.current?.scrollBy({ left: 360, behavior: 'smooth' });
    };

    const onLeftArrowClick = (): void => {
        resultsListElement?.current?.scrollBy({ left: -360, behavior: 'smooth' });
    };

    const showLeftArrow = scrollLeftPosition > 0;
    const showRightArrow = scrollRightPosition > 0;

    React.useEffect(() => {
        // Set initial value for scrollRightPosition
        const scrollWidth = resultsListElement?.current?.scrollWidth || 0;
        const clientWidth = resultsListElement?.current?.clientWidth || 0;
        setScrollRightPosition(scrollWidth - clientWidth);
    }, []);

    return (
        <div className="search-results-list">
            {!isMobileViewport ? (
                <>
                    {showLeftArrow ? (
                        <div className="search-results-list__scroll-arrow search-results-list__scroll-arrow-left ">
                            <img
                                src="/images/chevron-down.svg"
                                alt="Scroll left"
                                className="search-results-list__scroll-arrow-left-icon"
                                onClick={onLeftArrowClick}
                            />
                        </div>
                    ) : null}

                    {showRightArrow ? (
                        <div className="search-results-list__scroll-arrow search-results-list__scroll-arrow-right">
                            <img
                                src="/images/chevron-down.svg"
                                alt="Scroll right"
                                className="search-results-list__scroll-arrow-right-icon"
                                onClick={onRightArrowClick}
                            />
                        </div>
                    ) : null}
                </>
            ) : null}
            <div
                ref={resultsListElement}
                onScroll={onResultsListScroll}
                className="search-results-list__results-list"
            >
                {resultsList.map(resource => (
                    <ResourceTile key={resource.id} resource={resource} />
                ))}
            </div>
        </div>
    );
};
