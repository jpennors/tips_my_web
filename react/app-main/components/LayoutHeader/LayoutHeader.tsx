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

    const newSearchLink = `${MAIN_APP_ROUTES.HOME}?new=1`;

    const links = [
        {
            id: 'new-search',
            title: 'New search',
            icon: <MagnifyingGlassIcon />,
            link: newSearchLink,
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
                <Link to={newSearchLink}>
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
                        <>
                            {icon ? <span className="layout-header__link-icon">{icon}</span> : null}
                            <span className="layout-header__link--underline-effect">{title}</span>
                        </>
                    );

                    if (ModalContent) {
                        return (
                            <HeaderModal
                                key={id}
                                target={<a className="layout-header__link">{linkItem}</a>}
                            >
                                {(closeModalAction): React.ReactNode => (
                                    <ModalContent
                                        finishedAction={closeModalAction}
                                        finishedLabel="CLOSE"
                                    />
                                )}
                            </HeaderModal>
                        );
                    } else if (link) {
                        return (
                            <Link key={id} to={link} className="layout-header__link">
                                {linkItem}
                            </Link>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};
