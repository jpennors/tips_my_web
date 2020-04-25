import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { ContactForm } from 'tmw-main/components/ContactForm';
import { MAIN_APP_ROUTES } from 'tmw-main/constants/app-constants';

import './contact-page.less';

export const ContactPage: React.FunctionComponent = () => {
    const history = useHistory();
    return (
        <div className="contact-page">
            <div className="contact-page__container">
                <ContactForm
                    finishedLabel="BACK HOME"
                    finishedAction={(): void => history.push(MAIN_APP_ROUTES.HOME)}
                />
            </div>
        </div>
    );
};
