import * as React from 'react';
import { ContactModalContent } from 'tmw-main/components/ContactModalContent';

import './contact-page.less';

export const ContactPage: React.FunctionComponent = () => {
    return (
        <div className="contact-page">
            <div className="contact-page__container">
                <ContactModalContent />
            </div>
        </div>
    );
};
