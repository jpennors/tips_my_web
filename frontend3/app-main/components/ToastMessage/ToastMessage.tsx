import * as React from 'react';
import * as classNames from 'classnames';

import './toast-message.less';

interface ToastMessageProps {
    message: string;
    isOpen: boolean;
}

export const ToastMessage: React.FunctionComponent<ToastMessageProps> = ({ message, isOpen }) => {
    return (
        <div className={classNames('toast-message', { ['toast-message--open']: isOpen })}>
            {message}
        </div>
    );
};
