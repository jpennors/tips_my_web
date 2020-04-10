import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ContactModalContent } from 'tmw-main/components/ContactModalContent';
import { HeaderModal } from 'tmw-main/components/HeaderModal';
import { SuggestionModalContent } from 'tmw-main/components/SuggestionModalContent';
import { MAIN_APP_ROUTES } from 'tmw-main/constants/app-constants';
import { useViewport } from 'tmw-common/components/ViewportProvider';
import { MagnifyingGlassIcon } from 'tmw-main/icons/MagnifyingGlassIcon';

import './layout-header.css';

export const LayoutHeader: React.FunctionComponent = () => {
    const { width } = useViewport();
    const isMobileViewport = width < 450;

    const links = [
        {
            id: 'new-search',
            title: (
                <>
                    <MagnifyingGlassIcon width={10} />
                    &nbsp; New search
                </>
            ),
            link: MAIN_APP_ROUTES.SEARCH,
        },
        {
            id: 'share-website',
            title: 'Share a website',
            modal: SuggestionModalContent,
        },
        {
            id: 'contact',
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
                {links.map(({ title, modal: Modal, link, id }) => {
                    if (Modal) {
                        return (
                            <HeaderModal
                                key={id}
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
                        );
                    } else if (link) {
                        return (
                            <Link
                                to={link}
                                className={classNames('layout-header__link', {
                                    'layout-header__link--centered': isMobileViewport,
                                })}
                            >
                                {title}
                            </Link>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};
