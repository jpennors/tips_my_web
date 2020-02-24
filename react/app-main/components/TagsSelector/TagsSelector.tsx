import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { LoadingSpinner } from 'tmw-main/components/LoadingSpinner';
import { TagsLaunchBar } from 'tmw-main/components/TagsLaunchBar';
import { MAIN_APP_ROUTES, SIZES } from 'tmw-main/constants/app-constants';
import { serializeTagsFromAPI } from 'tmw-main/utils/api-serialize';
import { PrimaryTag, SecondaryTag, TagsMap } from 'tmw-main/constants/app-types';
import { ajaxGet } from 'tmw-common/utils/ajax';
import { Tag } from 'tmw-main/components/Tag';
import { ArrowIcon } from 'tmw-main/icons/ArrowIcon';
import { encodeSearchTags } from 'tmw-main/utils/tags-search-url';

import './tags-selector.css';

export const TagsSelector: React.FunctionComponent = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [primaryTag, setPrimaryTag] = React.useState<PrimaryTag>();
    const [secondaryTags, setSecondaryTags] = React.useState<SecondaryTag[]>([]);
    const [tagsMap, setTagsMap] = React.useState<TagsMap>({});

    const history = useHistory();

    const fetchTagOptions = (): Promise<void> => {
        return ajaxGet('tags')
            .then(res => {
                const newTagsMap = serializeTagsFromAPI(res.data || []);
                setTagsMap(newTagsMap);
            })
            .catch(() => {
                // TODO: Handle errors / no tags
            });
    };

    const addSecondaryTag = (selectedTag: SecondaryTag): void => {
        setSecondaryTags(secondaryTags.concat([selectedTag]));
    };

    const removeSecondaryTag = (selectedTag: SecondaryTag): void => {
        setSecondaryTags(secondaryTags.filter(tag => tag.id !== selectedTag.id));
    };

    const onSecondaryTagClick = (selectedTag: SecondaryTag): void => {
        const index = secondaryTags.map(tag => tag.id).indexOf(selectedTag.id);
        if (index === -1) {
            addSecondaryTag(selectedTag);
        } else {
            removeSecondaryTag(selectedTag);
        }
    };

    const onPrimaryTagClick = (selectedTag: PrimaryTag): void => {
        if (primaryTag) {
            setPrimaryTag(undefined);
            setSecondaryTags([]);
        } else {
            setPrimaryTag(selectedTag);
        }
    };

    const launchSearch = (): void => {
        if (primaryTag) {
            const selectedTags = [primaryTag, ...secondaryTags];
            const selectedTagSlugs = selectedTags.map(tag => tag.slug);
            const searchRoute = MAIN_APP_ROUTES.RESULTS.replace(
                ':searchTags',
                encodeSearchTags(selectedTagSlugs),
            );
            history.push(searchRoute);
        }
    };

    React.useEffect(() => {
        fetchTagOptions().finally(() => {
            setIsLoading(false);
        });
    }, []);

    let barPercentage = 0;
    barPercentage += primaryTag ? 40 : 0;
    barPercentage += secondaryTags.length * 20;

    return (
        <div className="tags-selector">
            <TagsLaunchBar onClickCallback={launchSearch} completionPercentage={barPercentage} />
            {isLoading ? (
                <div className="tags-selector__loading-spinner">
                    <LoadingSpinner />
                    <br />
                    Loading Tags
                </div>
            ) : (
                <div className="tags-selector__container">
                    {primaryTag && (
                        <div className="tags-selector__selected-primary-tag">
                            <span
                                className="tags-selector__selected-primary-tag-arrow"
                                onClick={(): void => onPrimaryTagClick(primaryTag)}
                            >
                                <ArrowIcon width={20} />
                            </span>
                            <Tag
                                content={primaryTag.name}
                                isSelected={false}
                                size={SIZES.LARGE}
                                clickable={false}
                            />
                        </div>
                    )}
                    <div className="tags-selector__tag-options">
                        {primaryTag
                            ? primaryTag.secondaryTags.map((tag: SecondaryTag) => (
                                <Tag
                                    key={tag.id}
                                    content={tag.name}
                                    isSelected={secondaryTags.map(tag => tag.id).includes(tag.id)}
                                    onClickCallback={(): void => onSecondaryTagClick(tag)}
                                    size={SIZES.MEDIUM}
                                />
                            ))
                            : Object.keys(tagsMap).map((tagId: string) => {
                                const tag = tagsMap[tagId];
                                return (
                                    <Tag
                                        key={tag.id}
                                        content={tag.name}
                                        isSelected={false}
                                        onClickCallback={(): void => onPrimaryTagClick(tag)}
                                        size={SIZES.MEDIUM}
                                    />
                                );
                            })}
                    </div>
                </div>
            )}
        </div>
    );
};
