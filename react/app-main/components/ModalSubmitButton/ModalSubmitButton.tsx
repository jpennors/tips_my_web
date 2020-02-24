import * as React from 'react';

import './modal-submit-button.css';

interface ModalSubmitButtonProps {
    content: string;
    onClick?: () => void;
}

export const ModalSubmitButton: React.FunctionComponent<ModalSubmitButtonProps> = ({
    content,
    onClick,
}) => (
    <a className="modal-submit-button" onClick={onClick}>
        {content}
    </a>
);
