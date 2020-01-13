import * as React from 'react';
import { LayoutFooter } from 'tmw/components/app/LayoutFooter';
import { LayoutHeader } from 'tmw/components/app/LayoutHeader';
import { ResourceSearch } from 'tmw/components/app/ResourceSearch';

import './main-app.css';

export const MainApp: React.FunctionComponent = () => (
    <div className="main-app">
        <LayoutHeader/>
        <ResourceSearch/>
        <LayoutFooter/>
    </div>
);
