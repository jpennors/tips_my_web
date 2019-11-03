import classNames from 'classnames';
import * as React from 'react';
import { SIZES } from 'tmw/constants/ui-constants';

import './tag.css';

interface TagProps {
    content: string;
    isSelected: boolean;
    onClickCallback?: () => void;
    size?: SIZES.MEDIUM | SIZES.LARGE;
}

export const Tag: React.FunctionComponent<TagProps> = ({
    content,
    isSelected,
    onClickCallback,
    size = SIZES.MEDIUM,
}) => (
    <div onClick={onClickCallback}>
        <button
            className={classNames('tag', {
                'tag--selected': isSelected,
                'tag--medium': size === SIZES.MEDIUM,
                'tag--large': size === SIZES.LARGE,
            })}
        >
            {content}
        </button>
    </div>
);
