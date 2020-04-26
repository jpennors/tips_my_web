import * as React from 'react';
import { useCookies } from 'react-cookie';
import { ResourcePricingPill } from 'tmw-main/components/ResourcePricingPill';
import {
    DEFAULT_RESOURCE_URL,
    RESOURCES_BASE_URL,
    VIEWPORT_BREAKPOINTS,
} from 'tmw-main/constants/app-constants';
import { useViewport } from 'tmw-common/components/ViewportProvider';

import { ajaxGet } from 'tmw-common/utils/ajax';
import { Resource } from 'tmw-main/constants/app-types';

import './resource-tile.less';
import { ArrowIcon } from 'tmw-main/icons/ArrowIcon';

interface ResourceTileProps {
    resource: Resource;
}

export const ResourceTile: React.FunctionComponent<ResourceTileProps> = ({ resource }) => {
    const { width } = useViewport();
    const isMobileViewport = width < VIEWPORT_BREAKPOINTS.MOBILE;

    const [cookies, setCookie] = useCookies([resource.id]);
    const isLiked = cookies[resource.id] === 'true';

    const likeResource = async (): Promise<void> => {
        if (isLiked) {
            setCookie(resource.id, 'false', { path: '/' });
            await ajaxGet(`resources/like/remove/${resource.id}`);
        } else {
            setCookie(resource.id, 'true', { path: '/' });
            await ajaxGet(`resources/like/add/${resource.id}`);
        }
    };

    const visitWebsite = async (resourceId: string): Promise<void> => {
        await ajaxGet(`resources/visit/${resourceId}`);
    };

    const iconUrl = resource.iconFilename ? RESOURCES_BASE_URL + resource.id : DEFAULT_RESOURCE_URL;

    return (
        <div className="resource-tile">
            <div className="resource-tile__container">
                {!isMobileViewport ? (
                    <div className="resource-tile__header">
                        <span className="resource-tile__header-dot resource-tile__header-dot--red" />
                        <span className="resource-tile__header-dot resource-tile__header-dot--yellow" />
                        <span className="resource-tile__header-dot resource-tile__header-dot--green" />
                    </div>
                ) : null}
                <img src={iconUrl} alt={resource.name} className="resource-tile__icon" />
                <div className="resource-tile__content">
                    <div className="resource-tile__title-float-right">
                        <ResourcePricingPill pricing={resource.pricing} />
                        <span className="resource-tile__like-resource-button">
                            <img
                                src={isLiked ? '/images/heart-full.svg' : '/images/heart.svg'}
                                alt={isLiked ? 'Unlike' : 'Like'}
                                height="15px"
                                onClick={likeResource}
                            />
                        </span>
                    </div>
                    <p className="resource-tile__title">{resource.name}</p>
                    <p className="resource-tile__description">{resource.description}</p>
                </div>
            </div>
            <a
                href={resource.url}
                onClick={(): Promise<void> => visitWebsite(resource.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-tile__visit-resource-button"
            >
                Open website
                <span className="resource-tile__visit-resource-button-icon">
                    <ArrowIcon fill="#434343" />
                </span>
            </a>
        </div>
    );
};
