import { faArrowRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import classNames from 'classnames';
import { useViewport } from 'tmw-common/components/ViewportProvider';

import './tags-launch-bar.less';

const MAX_BAR_WIDTH = 500;
const MIN_BAR_WIDTH = 200;
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

    const hasTagsSelected = completionPercentage > 0;
    let barWidth = hasTagsSelected
        ? MIN_BAR_WIDTH + (completionPercentage * (maxBarWidth - MIN_BAR_WIDTH)) / 100
        : barHeight;

    if (barWidth > maxBarWidth) {
        barWidth = maxBarWidth;
    }

    const [showButton, setShowButton] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (hasTagsSelected) {
            setTimeout(() => setShowButton(true), 150);
        } else {
            setShowButton(false);
        }
    }, [hasTagsSelected, setShowButton]);

    const resourcesCount = Math.round(3000 / barWidth); // TODO: Compute real count

    return (
        <div
            className={classNames('tags-launch-bar', {
                ['tags-launch-bar--button']: hasTagsSelected,
            })}
            style={{ width: `${barWidth}px`, height: `${barHeight}px` }}
            onClick={showButton ? onClickCallback : undefined}
        >
            {showButton ? (
                <div className="tags-launch-bar__text">
                    Find {resourcesCount} resources{' '}
                    <FontAwesomeIcon icon={faArrowRight} className="tags-launch-bar__arrow-icon" />
                </div>
            ) : (
                <FontAwesomeIcon icon={faChevronDown} />
            )}
        </div>
    );
};
