import * as React from 'react';

import './tags-launch-bar.css';

const MAX_BAR_WIDTH = 600;
const SEARCH_BUTTON_WIDTH = 35;

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
    if (barWidth > MAX_BAR_WIDTH) {
        barWidth = MAX_BAR_WIDTH;
    } else if (barWidth < SEARCH_BUTTON_WIDTH) {
        barWidth = SEARCH_BUTTON_WIDTH;
    }

    return (
        <div className="tags-launch-bar" style={{ width: `${barWidth}px`, height: `${SEARCH_BUTTON_WIDTH}px` }}>
            <a role="button" title="Launch search">
                <img
                    src="/images/Arrow.svg"
                    alt="arrow"
                    className="tags-launch-bar__arrow"
                    style={{ height: `${SEARCH_BUTTON_WIDTH}px` }}
                    onClick={onClickCallback}
                />
            </a>
        </div>
    );
};
