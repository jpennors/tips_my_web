import * as React from 'react';
import classNames from 'classnames';

import './tag.css';

interface TagProps {
    content: string;
    isSelected: boolean;
    onClickCallback?: () => void;
}

const Tag: React.FunctionComponent<TagProps> = ({
    content,
    isSelected,
    onClickCallback,
}) => (
    <div onClick={onClickCallback}>
        <a
            className={classNames('tag', 'noselect', {
                'tag--selected': isSelected,
                'a_pointer_white': !isSelected,
            })}
        >
            {content}
        </a>
    </div>
);

export default Tag;
