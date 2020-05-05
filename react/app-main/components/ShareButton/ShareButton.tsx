import * as React from 'react';
import { BigButton } from 'tmw-main/components/BigButton';
import * as copyTextToClipboard from 'copy-text-to-clipboard';

import './share-button.less';

export const ShareButton: React.FunctionComponent = () => {
    const onButtonClick = (): void => {
        copyTextToClipboard(window.location.href);
    };

    return <BigButton content="Share" isColored={false} onClick={onButtonClick} />;
};
