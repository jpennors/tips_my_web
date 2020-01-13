import * as React from 'react';
import { AboutModalContent } from 'tmw/components/app/AboutModalContent';
import { ContactModalContent } from 'tmw/components/app/ContactModalContent';
import { HeaderModal } from 'tmw/components/app/HeaderModal';
import { SuggestionModalContent } from 'tmw/components/app/SuggestionModalContent';

import './layout-header.css';

export const LayoutHeader: React.FunctionComponent = () => (
    <div className="layout-header">
        <img src="/images/logo.svg" alt="logo" className="layout-header__logo" />
        <div className="layout-header__links">
            <HeaderModal content={<SuggestionModalContent/>} target={<a className="layout-header__link">Share a website</a>}/>
            <HeaderModal content={<AboutModalContent/>} target={<a className="layout-header__link">About</a>}/>
            <HeaderModal content={<ContactModalContent/>} target={<a className="layout-header__link">Contact</a>}/>
        </div>
    </div>
);
