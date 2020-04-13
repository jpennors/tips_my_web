import * as React from 'react';
import { Link } from 'react-router-dom';
import { ContactModalContent } from 'tmw-main/components/ContactModalContent';
import { HeaderModal } from 'tmw-main/components/HeaderModal';
import { SuggestionModalContent } from 'tmw-main/components/SuggestionModalContent';
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
                <img src="/images/logo.svg" alt="logo" className="layout-header__logo" />
            ) : (
                <p className="layout-header__logo-name">
                    <img src="/images/logo.svg" alt="logo" className="layout-header__logo" />
                    TipsMyWeb
                </p>
            )}
            <div className="layout-header__links">
                {links.map(({ title, modal: Modal, link, id }) => {
                    if (Modal) {
                        return (
                            <HeaderModal
                                key={id}
                                content={<Modal />}
                                target={<a className="layout-header__link">{title}</a>}
                            />
                        );
                    } else if (link) {
                        return (
                            <Link key={id} to={link} className="layout-header__link">
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
