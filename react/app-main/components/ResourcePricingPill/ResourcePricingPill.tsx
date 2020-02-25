import classNames from 'classnames';
import * as React from 'react';
import { PRICING_OPTIONS } from 'tmw-main/constants/app-constants';

import './resource-pricing-pill.css';

interface ResourcePricingPillProps {
    pricing: PRICING_OPTIONS;
}

export const ResourcePricingPill: React.FunctionComponent<ResourcePricingPillProps> = ({
    pricing,
}) => (
    <div
        className={classNames('resource-pricing-pill', {
            'resource-pricing-pill--green': pricing === PRICING_OPTIONS.FREE,
            'resource-pricing-pill--yellow': pricing === PRICING_OPTIONS.FREEMIUM,
            'resource-pricing-pill--red': pricing === PRICING_OPTIONS.PAID,
        })}
    >
        {pricing}
    </div>
);
