import * as React from 'react';
import classNames from 'classnames';

import './tag.css';

interface TagProps {
    content: string;
    isSelected: boolean;
    onClickCallback?: () => void;
}

export const Tag: React.FunctionComponent<TagProps> = ({
    content,
    isSelected,
    onClickCallback,
}) => (
    <div onClick={onClickCallback}>
        <button
            className={classNames('tag', 'noselect', {
                'tag--selected': isSelected,
            })}
        >
            {content}
        </button>
    </div>
);
