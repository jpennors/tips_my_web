import * as React from 'react';

import './tags-launch-bar.css';

const MAX_BAR_WIDTH = 600;
const SEARCH_BUTTON_WIDTH = 45;

interface TagsLaunchBarProps {
    /* Bar width in % */
    completionPercentage: number;
    /* Action to call on search button click */
    onClickCallback?: () => void;
}

export const TagsLaunchBar: React.FunctionComponent<TagsLaunchBarProps> = ({
    completionPercentage,
    onClickCallback,
}) => {
    let barWidth = completionPercentage * MAX_BAR_WIDTH / 100;
    let isMinWidth = false;

    if (barWidth > MAX_BAR_WIDTH) {
        barWidth = MAX_BAR_WIDTH;
    } else if (barWidth <= SEARCH_BUTTON_WIDTH) {
        barWidth = SEARCH_BUTTON_WIDTH;
        isMinWidth = true;
    }

    return (
        <div className="tags-launch-bar" style={{ width: `${barWidth}px`, height: `${SEARCH_BUTTON_WIDTH}px` }}>
            <a role="button" title="Launch Search">
                {isMinWidth ? (
                    <img
                        src="/images/chevron-down.svg"
                        alt="Launch Search"
                        className="tags-launch-bar__launch-chevron-icon"
                        style={{ height: `${SEARCH_BUTTON_WIDTH}px` }}
                    />
                ) : (
                    <img
                        src="/images/tick.svg"
                        alt="Launch Search"
                        className="tags-launch-bar__launch-tick-icon"
                        style={{ height: `${SEARCH_BUTTON_WIDTH}px` }}
                        onClick={onClickCallback}
                    />
                )}

            </a>
        </div>
    );
};
