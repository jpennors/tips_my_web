import * as React from 'react';

import './resource-pricing-pill.css';

interface ResourcePricingPillProps {
    pricing: string;
}

export const ResourcePricingPill: React.FunctionComponent<ResourcePricingPillProps> = ({
    pricing,
}) => <div className="resource-pricing-pill">{pricing}</div>;
