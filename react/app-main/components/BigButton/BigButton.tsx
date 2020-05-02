import * as React from 'react';
import classNames from 'classnames';
import { ArrowIcon } from 'tmw-main/icons/ArrowIcon';

import './big-button.less';

interface BigButtonProps {
    content: string;
    isColored?: boolean;
    onClick?: () => void;
}

export const BigButton: React.FunctionComponent<BigButtonProps> = ({
    content,
    onClick,
    isColored = true,
}) => (
    <span
        className={classNames('big-button', { 'big-button--colored': isColored })}
        onClick={onClick}
    >
        {content}
        <span className="big-button__icon">
            <ArrowIcon fill="#F46D7B" />
        </span>
    </span>
);
