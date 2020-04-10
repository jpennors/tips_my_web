import * as React from 'react';
import { useViewport } from 'tmw-common/components/ViewportProvider';

import './tags-launch-bar.less';

const MAX_BAR_WIDTH = 600;
const MAX_BAR_HEIGHT = 45;

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
    const { width } = useViewport();

    const maxBarWidth = 0.88 * width < MAX_BAR_WIDTH ? 0.88 * width : MAX_BAR_WIDTH;
    const barHeight = width < 450 ? width / 10 : MAX_BAR_HEIGHT;

    let barWidth = (completionPercentage * maxBarWidth) / 100;
    let isMinWidth = false;

    if (barWidth > maxBarWidth) {
        barWidth = maxBarWidth;
    } else if (barWidth <= barHeight) {
        barWidth = barHeight;
        isMinWidth = true;
    }

    return (
        <div
            className="tags-launch-bar"
            style={{ width: `${barWidth}px`, height: `${barHeight}px` }}
        >
            <a role="button" title="Launch Search">
                {isMinWidth ? (
                    <img
                        src="/images/chevron-down.svg"
                        alt="Launch Search"
                        className="tags-launch-bar__launch-chevron-icon"
                        style={{ height: `${barHeight}px` }}
                    />
                ) : (
                    <img
                        src="/images/tick.svg"
                        alt="Launch Search"
                        className="tags-launch-bar__launch-tick-icon"
                        style={{ height: `${barHeight}px` }}
                        onClick={onClickCallback}
                    />
                )}
            </a>
        </div>
    );
};
