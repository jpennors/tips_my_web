import * as React from 'react';

import './about-page.css';

export const AboutPage: React.FunctionComponent = () => {
    return (
        <div className="about-page">
            <div className="about-page__header">About us</div>
            <div className="about-page__content">
                <p>
                    TipsMyWeb is giving you the best resources in a specific field. These websites
                    that you normally discover after 2 years in a specific domain.
                </p>
                <p>
                    This project has been created by two students after seeing that too many people
                    are struggling in their daily workflow, and they don’t imagine how much
                    developer have created awesome websites to help them.
                </p>
                <p>Created by Josselin Pennors, Lancelot Imberton & Hugo Jouffre</p>
            </div>
        </div>
    );
};
