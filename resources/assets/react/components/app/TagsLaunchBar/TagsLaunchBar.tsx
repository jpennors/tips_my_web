import * as React from 'react';

import './tags-launch-bar.css';

const MAX_BAR_WIDTH = 600;

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
    const percentage =
        completionPercentage > 100 ? 100
            : completionPercentage < 0 ? 0
                : completionPercentage;
    const barWidth = percentage * MAX_BAR_WIDTH / 100;

    return (
        <div className="tags-launch-bar" style={{ width: `${barWidth}px` }}>
            <a title="Launch search">
                <img
                    src="/images/Arrow.svg"
                    alt="arrow"
                    className="tags-launch-bar__arrow"
                    onClick={onClickCallback}
                />
            </a>
        </div>
    );
};
