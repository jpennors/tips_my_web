import * as React from 'react';
import { Link } from 'react-router-dom';
import { MAIN_APP_ROUTES } from 'tmw-main/constants/app-constants';

import './layout-footer.css';

export const LayoutFooter: React.FunctionComponent = () => (
    <div className="layout-footer">
        <div className="layout-footer__left-side">
            <p>© 2019 TipsMyWeb</p>
            <p>
                <Link to={MAIN_APP_ROUTES.TERMS}>Terms</Link>
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
