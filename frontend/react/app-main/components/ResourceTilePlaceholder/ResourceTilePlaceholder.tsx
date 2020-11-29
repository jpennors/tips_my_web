import * as React from 'react';
import { VIEWPORT_BREAKPOINTS } from 'tmw-main/constants/app-constants';
import { useViewport } from 'tmw-common/components/ViewportProvider';

import './resource-tile-placeholder.less';

export const ResourceTilePlaceholder: React.FunctionComponent = () => {
    const { width } = useViewport();
    const isMobileViewport = width < VIEWPORT_BREAKPOINTS.MOBILE;

    return (
        <div className="resource-tile-placeholder">
            {!isMobileViewport ? (
                <div className="resource-tile-placeholder__header">
                    <span className="resource-tile-placeholder__header-dot" />
                    <span className="resource-tile-placeholder__header-dot" />
                    <span className="resource-tile-placeholder__header-dot" />
                </div>
            ) : null}
            <div className="resource-tile-placeholder__icon resource-tile-placeholder__loading" />
            <div className="resource-tile-placeholder__content">
                <div className="resource-tile-placeholder__title resource-tile-placeholder__loading" />
                <div className="resource-tile-placeholder__description-1 resource-tile-placeholder__loading" />
                <div className="resource-tile-placeholder__description-2 resource-tile-placeholder__loading" />
                <div className="resource-tile-placeholder__description-3 resource-tile-placeholder__loading" />
            </div>
        </div>
    );
};
