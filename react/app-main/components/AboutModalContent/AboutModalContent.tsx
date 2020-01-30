import * as React from 'react';
import { ModalSubmitButton } from 'tmw-main/components/ModalSubmitButton';

import './about-modal-content.css';

export const AboutModalContent: React.FunctionComponent = () => {

    return (
        <div className="about-modal-content">
            <div className="about-modal-content__title">TipsMyWeb</div>
            <div className="about-modal-content__subtitle">Resources to improve your workflow</div>
            <div className="about-modal-content__text">
                <p>
                    TipsMyWeb is giving you the best resources in a specific field. These websites that you
                    normally discover after 2 years in a specific domain.
                </p>
                <p>
                    This project has been created by two students after seeing that too many people
                    are struggling in their daily workflow, and they don’t imagine how much developer
                    have created awesome websites to help them.
                </p>
                <p>
                    Created by Josselin Pennors & Hugo Jouffre
                </p>
            </div>
            <div className="about-modal-content__buttons">
                <ModalSubmitButton content="SUPPORT US"/>
            </div>
        </div>
    );
};
