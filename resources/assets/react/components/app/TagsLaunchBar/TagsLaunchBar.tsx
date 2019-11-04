import * as React from 'react';

import './tags-launch-bar.css';

interface TagsLaunchBarProps {
    onClickCallback?: () => void;
}

export const TagsLaunchBar: React.FunctionComponent<TagsLaunchBarProps> = ({
    onClickCallback,
}) => (
    <div className="tags-launch-bar">
        <a title="Launch search">
            <img src="/images/Arrow.svg" alt="arrow" className="tags-launch-bar__arrow" onClick={onClickCallback} />
        </a>
    </div>
);
