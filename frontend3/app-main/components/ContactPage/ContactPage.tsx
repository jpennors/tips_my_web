import { useRouter } from 'next/router';
import * as React from 'react';
import { ContactForm } from 'tmw-main/components/ContactForm';
import { DocumentHead } from 'tmw-main/components/DocumentHead';
import { MAIN_APP_ROUTES } from 'tmw-main/constants/app-constants';

import styles from './ContactPage.module.scss';

export const ContactPage: React.FunctionComponent = () => {
    const router = useRouter();
    return (
        <div>
            <DocumentHead title="Contact us" />
            <div className={styles.container}>
                <ContactForm
                    finishedLabel="BACK HOME"
                    finishedAction={(): void => router.push(MAIN_APP_ROUTES.HOME)}
                />
            </div>
        </div>
    );
};
