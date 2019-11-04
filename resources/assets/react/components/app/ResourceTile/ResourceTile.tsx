import * as React from 'react';
import { ajaxGet } from 'tmw/utils/Ajax';
import { Resource } from 'tmw/constants/app-types';

import './resource-tile.css';

interface ResourceTileProps {
    resource: Resource;
}

export const ResourceTile: React.FunctionComponent<ResourceTileProps> = ({
    resource,
}) => {
    // TODO: store this in cookies !
    const [isLiked, setIsLiked] = React.useState<boolean>(false);

    const likeResource = async (): Promise<void> => {
        if (isLiked) {
            setIsLiked(false);
            await ajaxGet(`resources/like/remove/${resource.id}`);
        } else {
            setIsLiked(true);
            await ajaxGet(`resources/like/add/${resource.id}`);
        }
    };

    return (
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
                    <a role="button" className="resource-tile__like-resource-button">
                        {isLiked ? (
                            <img
                                src={'images/heart_full.svg'}
                                alt="Unlike"
                                height="15px"
                                onClick={likeResource}
                            />
                        ) : (
                            <img
                                src={'images/heart.svg'}
                                alt="Like"
                                height="15px"
                                onClick={likeResource}
                            />
                        )}

                    </a>
                    <button className="resource-tile__visit-resource-button" type="button">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="a_pointer_white">
                            Visit →
                        </a>
                    </button>
                </p>
            </div>
        </div>
    );
};
