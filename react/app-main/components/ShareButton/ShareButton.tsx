import * as React from 'react';
import * as copyTextToClipboard from 'copy-text-to-clipboard';
import { Button, ButtonVariant } from 'tmw-main/components/Button';
import { useToastMessageContext } from 'tmw-main/components/ToastMessage';

export const ShareButton: React.FunctionComponent = () => {
    const { openToastMessage } = useToastMessageContext();

    const onButtonClick = (): void => {
        copyTextToClipboard(window.location.href);
        openToastMessage('URL was successfully copied in clipboard !');
    };

    return (
        <Button content="Share" variant={ButtonVariant.WHITE_TEXT_BLACK} onClick={onButtonClick} />
    );
};
