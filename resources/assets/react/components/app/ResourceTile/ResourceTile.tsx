import * as React from 'react';
import { Resource } from 'tmw/constants/app-types';

import './resource-tile.css';

interface ResourceTileProps {
    resource: Resource;
}

export const ResourceTile: React.FunctionComponent<ResourceTileProps> = ({
    resource,
}) => (
    <div className="resource-tile">
        <div className="resource-tile__header">
            <span className="resource-tile__header-dot resource-tile__header-dot--red" />
            <span className="resource-tile__header-dot resource-tile__header-dot--yellow" />
            <span className="resource-tile__header-dot resource-tile__header-dot--green" />
        </div>
        <a href={resource.url} target="_blank" rel="noopener noreferrer">
            <img
                src={resource.iconFilename ? `/resources/images/${resource.iconFilename}` : '/images/default.jpg'}
                alt={resource.name}
                className="resource-tile__icon"
            />
        </a>
        <div className="resource-tile__content">
            <h4 className="resource-tile__title">{resource.name}</h4>
            <p className="resource-tile__description">{resource.description}</p>
            <p className="resource-tile__actions">
                <span
                    className="resource-tile__know-resource-button"
                    onClick={() => {}}
                >
                    I know it
                </span>
                <img
                    src={'images/heart_full.svg'} //'images/heart.svg'
                    alt="Heart Icon"
                    height="15px"
                    className="cursor_pointer"
                    onClick={() => {}}
                />
                <button className="resource-tile__visit-resource-button" type="button">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="a_pointer_white">
                        Visit →
                    </a>
                </button>
            </p>
        </div>
    </div>
);
