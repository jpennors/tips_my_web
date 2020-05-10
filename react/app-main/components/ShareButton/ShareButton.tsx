import * as React from 'react';
import * as copyTextToClipboard from 'copy-text-to-clipboard';
import { BigButton } from 'tmw-main/components/BigButton';
import { useToastMessageContext } from 'tmw-main/components/ToastMessage';

import './share-button.less';

export const ShareButton: React.FunctionComponent = () => {
    const { openToastMessage } = useToastMessageContext();

    const onButtonClick = (): void => {
        copyTextToClipboard(window.location.href);
        openToastMessage('URL was successfully copied in clipboard !');
    };

    return <BigButton content="Share" isColored={false} onClick={onButtonClick} />;
};
