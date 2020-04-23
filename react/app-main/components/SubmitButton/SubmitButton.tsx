import * as React from 'react';
import classNames from 'classnames';

import './submit-button.less';
import { TickIcon } from 'tmw-main/icons/TickIcon';

interface SubmitButtonProps {
    onClick?: () => void;
    isValid?: boolean;
    isPending?: boolean;
}

export const SubmitButton: React.FunctionComponent<SubmitButtonProps> = ({
    onClick,
    isValid,
    isPending,
}) => (
    <div
        className={classNames('submit-button', {
            'submit-button--waiting': !isPending && !isValid,
            'submit-button--pending': isPending,
            'submit-button--valid': !isPending && isValid,
        })}
        onClick={onClick}
    >
        <span className="submit-button__text">{isValid ? <TickIcon width={16} /> : 'SUBMIT'}</span>
    </div>
);
