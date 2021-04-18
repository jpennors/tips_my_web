import * as React from 'react';
import * as classNames from 'classnames';

import styles from './ToastMessage.module.scss';

interface ToastMessageProps {
    message: string;
    isOpen: boolean;
}

export const ToastMessage: React.FunctionComponent<ToastMessageProps> = ({ message, isOpen }) => {
    return (
        <div className={classNames(styles.toastMessage, { [styles.open]: isOpen })}>{message}</div>
    );
};
