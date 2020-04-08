import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AboutModalContent } from 'tmw-main/components/AboutModalContent';
import { ContactModalContent } from 'tmw-main/components/ContactModalContent';
import { HeaderModal } from 'tmw-main/components/HeaderModal';
import { SuggestionModalContent } from 'tmw-main/components/SuggestionModalContent';
import { MAIN_APP_ROUTES } from 'tmw-main/constants/app-constants';
import { useViewport } from 'tmw-common/components/ViewportProvider';

import './layout-header.css';

export const LayoutHeader: React.FunctionComponent = () => {
    const { width } = useViewport();
    const isMobileViewport = width < 450;

    const links = [
        {
            title: 'Share a website',
            modal: SuggestionModalContent,
        },
        {
            title: 'About',
            modal: AboutModalContent,
        },
        {
            title: 'Contact',
            modal: ContactModalContent,
        },
    ];

    return (
        <div className="layout-header">
            {!isMobileViewport ? (
                <Link to={MAIN_APP_ROUTES.HOME}>
                    <img src="/images/logo.svg" alt="logo" className="layout-header__logo" />
                </Link>
            ) : null}
            <div
                className={classNames('layout-header__links', {
                    'layout-header__links--centered': isMobileViewport,
                })}
            >
                {links.map(({ title, modal: Modal }) => (
                    <HeaderModal
                        key={title}
                        content={<Modal />}
                        target={
                            <a
                                className={classNames('layout-header__link', {
                                    'layout-header__link--centered': isMobileViewport,
                                })}
                            >
                                {title}
                            </a>
                        }
                    />
                ))}
            </div>
        </div>
    );
};
