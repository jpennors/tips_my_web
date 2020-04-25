import * as React from 'react';
import classNames from 'classnames';

import './submit-button.less';
import { TickIcon } from 'tmw-main/icons/TickIcon';

interface SubmitButtonProps {
    onClick?: () => void;
    isValid?: boolean;
    isPending?: boolean;
    finishedLabel: string;
    finishedAction: () => void;
}

export const SubmitButton: React.FunctionComponent<SubmitButtonProps> = ({
    onClick,
    isValid,
    isPending,
    finishedLabel,
    finishedAction,
}) => {
    const [isFinished, setIsFinished] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (isValid) {
            setTimeout(() => {
                setIsFinished(true);
            }, 2000);
        }
    }, [isValid]);

    const buttonLabel = isFinished ? finishedLabel : isValid ? <TickIcon width={16} /> : 'SUBMIT';

    return (
        <div
            className={classNames('submit-button', {
                'submit-button--waiting': !isPending && !isValid,
                'submit-button--pending': isPending,
                'submit-button--valid': !isPending && isValid,
                'submit-button--finished': isFinished,
            })}
            onClick={isValid || isPending ? undefined : onClick}
        >
            <span className="submit-button__text" onClick={isFinished ? finishedAction : undefined}>
                {buttonLabel}
            </span>
        </div>
    );
};
