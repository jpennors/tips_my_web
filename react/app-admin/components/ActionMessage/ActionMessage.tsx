import * as React from 'react';
import { Message } from 'semantic-ui-react';

interface ErrorMessageProps {
    message: string;
    type: 'success' | 'error' | 'warning';
    messageHeader?: string;
}

export const ActionMessage: React.FunctionComponent<ErrorMessageProps> = ({
    message,
    type,
    messageHeader,
}) => {
    let iconName;
    let header;

    switch (type) {
        case 'success':
            iconName = 'check circle outline';
            header = 'Success!';
            break;
        case 'error':
            iconName = 'warning circle';
            header = 'Something wrong happened...';
            break;
        case 'warning':
            iconName = 'warning sign';
            header = 'Warning!';
            break;
        default:
            iconName = 'warning';
            header = 'Message';
            break;
    }

    if (message && message.length > 0) {
        return (
            <Message
                negative={type === 'error'}
                positive={type === 'success'}
                warning={type === 'warning'}
                icon={iconName}
                header={messageHeader || header}
                content={message}
            />
        );
    }

    return null;
};
