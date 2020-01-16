import * as React from 'react';

import './layout-footer.css';

export const LayoutFooter: React.FunctionComponent = () => (
    <div className="layout-footer">
        <div className="layout-footer__left-side">
            <p>© 2019 TipsMyWeb</p>
            <p><a href="#">Terms</a></p>
        </div>
        <div className="layout-footer__right-side">
            <a href="#"><img src="/images/Twitter logo.svg" alt="Share on twitter" className="layout-footer__social-link-img" /></a>
            <a href="#"><img src="/images/Facebook logo.svg" alt="Share on facebook" className="layout-footer__social-link-img" /></a>
            <a href="#"><img src="/images/Share.svg" alt="Share" className="layout-footer__social-link-img" /></a>
        </div>
    </div>
);
