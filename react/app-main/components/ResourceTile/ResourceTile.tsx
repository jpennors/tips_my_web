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
import classNames from 'classnames';

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

    const iconUrl = resource.iconFilename ? RESOURCES_BASE_URL + resource.id : DEFAULT_RESOURCE_URL;

    return (
        <div
            className={classNames('resource-tile', {
                'resource-tile--mobile': isMobileViewport,
            })}
        >
            {!isMobileViewport ? (
                <div className="resource-tile__header">
                    <span className="resource-tile__header-dot resource-tile__header-dot--red" />
                    <span className="resource-tile__header-dot resource-tile__header-dot--yellow" />
                    <span className="resource-tile__header-dot resource-tile__header-dot--green" />
                </div>
            ) : null}
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <img src={iconUrl} alt={resource.name} className="resource-tile__icon" />
            </a>
            <div className="resource-tile__content">
                <div className="resource-tile__pricing">
                    <ResourcePricingPill pricing={resource.pricing} />
                </div>
                <p className="resource-tile__title">{resource.name}</p>
                <p className="resource-tile__description">{resource.description}</p>
            </div>
            <div className="resource-tile__actions">
                <a role="button" className="resource-tile__like-resource-button">
                    {isLiked ? (
                        <img
                            src={'/images/heart-full.svg'}
                            alt="Unlike"
                            height="15px"
                            onClick={likeResource}
                        />
                    ) : (
                        <img
                            src={'/images/heart.svg'}
                            alt="Like"
                            height="15px"
                            onClick={likeResource}
                        />
                    )}
                </a>
                <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-tile__visit-resource-button"
                >
                    Visit →
                </a>
            </div>
        </div>
    );
};
