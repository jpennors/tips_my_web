import * as React from 'react';
import { Link } from 'react-router-dom';
import { ContactForm } from 'tmw-main/components/ContactForm';
import { HeaderModal } from 'tmw-main/components/HeaderModal';
import { SuggestionForm } from 'tmw-main/components/SuggestionForm';
import { MAIN_APP_ROUTES, VIEWPORT_BREAKPOINTS } from 'tmw-main/constants/app-constants';
import { useViewport } from 'tmw-common/components/ViewportProvider';
import { MagnifyingGlassIcon } from 'tmw-main/icons/MagnifyingGlassIcon';

import './layout-header.less';

export const LayoutHeader: React.FunctionComponent = () => {
    const { width } = useViewport();
    const isMobileViewport = width < VIEWPORT_BREAKPOINTS.MOBILE;

    const links = [
        {
            id: 'new-search',
            title: 'New search',
            icon: <MagnifyingGlassIcon />,
            link: MAIN_APP_ROUTES.SEARCH,
        },
        {
            id: 'share-website',
            title: 'Share a website',
            modalContent: !isMobileViewport ? SuggestionForm : null,
            link: isMobileViewport ? MAIN_APP_ROUTES.SUGGESTION : null,
        },
        {
            id: 'contact',
            title: 'Contact',
            modalContent: !isMobileViewport ? ContactForm : null,
            link: isMobileViewport ? MAIN_APP_ROUTES.CONTACT : null,
        },
    ];

    return (
        <div className="layout-header">
            {!isMobileViewport ? (
                <Link to={MAIN_APP_ROUTES.HOME}>
                    <img src="/images/logo.svg" alt="logo" className="layout-header__logo" />
                </Link>
            ) : (
                <p className="layout-header__logo-name">
                    <Link to={MAIN_APP_ROUTES.HOME}>
                        <img src="/images/logo.svg" alt="logo" className="layout-header__logo" />
                        TipsMyWeb
                    </Link>
                </p>
            )}
            <div className="layout-header__links">
                {links.map(({ title, modalContent: ModalContent, link, id, icon }) => {
                    const linkItem = (
                        <a className="layout-header__link">
                            {icon ? <span className="layout-header__link-icon">{icon}</span> : null}
                            <span className="layout-header__link--underline-effect">{title}</span>
                        </a>
                    );

                    if (ModalContent) {
                        return (
                            <HeaderModal key={id} target={linkItem}>
                                {(closeModalAction): React.ReactNode => (
                                    <ModalContent
                                        finishedAction={closeModalAction}
                                        finishedLabel="CLOSE"
                                    />
                                )}
                            </HeaderModal>
                        );
                    } else if (link) {
                        return linkItem;
                    }
                    return null;
                })}
            </div>
        </div>
    );
};
