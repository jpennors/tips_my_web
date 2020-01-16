import * as React from 'react';
import { AboutModalContent } from 'tmw-main/components/AboutModalContent';
import { ContactModalContent } from 'tmw-main/components/ContactModalContent';
import { HeaderModal } from 'tmw-main/components/HeaderModal';
import { SuggestionModalContent } from 'tmw-main/components/SuggestionModalContent';

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
