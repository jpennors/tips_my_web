import * as React from 'react';

import './loading-spinner.less';

export const LoadingSpinner: React.FunctionComponent = () => (
    <div className="loading-spinner">
        <div className="loading-spinner__point-1"></div>
        <div className="loading-spinner__point-2"></div>
        <div className="loading-spinner__point-3"></div>
        <div className="loading-spinner__point-4"></div>
    </div>
);
