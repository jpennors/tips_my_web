import * as React from 'react';
import classNames from 'classnames';
import { SIZES } from 'tmw-main/constants/app-constants';
import { Icon } from 'tmw-main/icons/icon-types';

import './button.less';

export enum ButtonVariant {
    COLORED = 'colored',
    WHITE_TEXT_COLORED = 'white-text-colored',
    WHITE_TEXT_BLACK = 'white-text-black',
}

export interface ButtonProps {
    content: string;
    onClick?: () => void;
    icon?: Icon;
    variant?: ButtonVariant;
    className?: string;
    size?: SIZES.SMALL | SIZES.MEDIUM;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
    content,
    onClick,
    icon: Icon,
    variant = ButtonVariant.WHITE_TEXT_COLORED,
    className,
    size = SIZES.MEDIUM,
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
            className={classNames(
                className,
                'button',
                `button--variant-${variant}`,
                `button--size-${size}`,
            )}
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
