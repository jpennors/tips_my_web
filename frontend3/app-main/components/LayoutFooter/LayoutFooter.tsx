import * as React from 'react';
import Link from 'next/link';
import { MAIN_APP_ROUTES } from 'tmw-main/constants/app-constants';

import './layout-footer.less';

export const LayoutFooter: React.FunctionComponent = () => (
    <div className="layout-footer">
        <div className="layout-footer__left-side">
            <p>© 2020 TipsMyWeb</p>
            <p>
                <Link href={MAIN_APP_ROUTES.TERMS}>
                    <a>Terms</a>
                </Link>
            </p>
            <p>
                <Link href={MAIN_APP_ROUTES.ABOUT}>
                    <a>About</a>
                </Link>
            </p>
        </div>
        <div className="layout-footer__right-side">
            <a href="#">
                <img
                    src="/images/twitter-logo.svg"
                    alt="Share on twitter"
                    className="layout-footer__social-link-img"
                />
            </a>
            <a href="#">
                <img
                    src="/images/facebook-logo.svg"
                    alt="Share on facebook"
                    className="layout-footer__social-link-img"
                />
            </a>
            <a href="#">
                <img
                    src="/images/share-icon.svg"
                    alt="Share"
                    className="layout-footer__social-link-img"
                />
            </a>
        </div>
    </div>
);
