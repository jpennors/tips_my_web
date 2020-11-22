import * as React from 'react';
import classNames from 'classnames';
import { Icon } from 'tmw-main/icons/icon-types';

import './button.less';

export enum ButtonVariant {
    COLORED = 'colored',
    WHITE_TEXT_COLORED = 'white-text-colored',
    WHITE_TEXT_BLACK = 'white-text-black',
}

interface ButtonProps {
    content: string;
    onClick?: () => void;
    icon?: Icon;
    variant?: ButtonVariant;
    className?: string;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
    content,
    onClick,
    icon: Icon,
    variant = ButtonVariant.WHITE_TEXT_COLORED,
    className,
}) => {
    let iconColor;
    switch (variant) {
        case ButtonVariant.COLORED:
            iconColor = '#FFFFFF';
            break;
        case ButtonVariant.WHITE_TEXT_BLACK:
            iconColor = '#474747';
            break;
        case ButtonVariant.WHITE_TEXT_COLORED:
        default:
            iconColor = '#F46D7B';
            break;
    }

    return (
        <span
            className={classNames(className, 'button', `button--variant-${variant}`)}
            onClick={onClick}
        >
            {content}
            {Icon ? (
                <span className="button__icon">
                    <Icon fill={iconColor} />
                </span>
            ) : null}
        </span>
    );
};
