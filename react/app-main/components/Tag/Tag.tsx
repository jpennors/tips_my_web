import classNames from 'classnames';
import * as React from 'react';
import { SIZES } from 'tmw-main/constants/app-constants';

import './tag.less';

interface TagProps {
    content: string;
    isSelected: boolean;
    onClickCallback?: () => void;
    size?: SIZES.MEDIUM | SIZES.LARGE;
    clickable?: boolean;
}

export const Tag: React.FunctionComponent<TagProps> = ({
    content,
    isSelected,
    onClickCallback,
    size = SIZES.MEDIUM,
    clickable = true,
}) => (
    <div onClick={onClickCallback}>
        <button
            className={classNames('tag', {
                'tag--selected': isSelected,
                'tag--medium': size === SIZES.MEDIUM,
                'tag--large': size === SIZES.LARGE,
                'tag--clickable': clickable,
            })}
        >
            {content}
        </button>
    </div>
);
