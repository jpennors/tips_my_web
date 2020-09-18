import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { LoadingSpinner } from 'tmw-main/components/LoadingSpinner';
import { TagsLaunchBar } from 'tmw-main/components/TagsLaunchBar';
import { MAIN_APP_ROUTES, SIZES } from 'tmw-main/constants/app-constants';
import { ArrowLeftIcon } from 'tmw-main/icons/ArrowLeftIcon';
import { serializeMainTagsFromAPI } from 'tmw-main/utils/api-serialize';
import { MainTag, RelatedTag } from 'tmw-main/constants/app-types';
import { ajaxGet } from 'tmw-common/utils/ajax';
import { Tag } from 'tmw-main/components/Tag';
import { encodeSearchTags } from 'tmw-main/utils/tags-search-url';

import './tags-selector.less';

export const TagsSelector: React.FunctionComponent = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [tags, setTags] = React.useState<MainTag[]>([]);
    const [selectedRelatedTags, setSelectedRelatedTags] = React.useState<RelatedTag[]>([]);
    const [selectedMainTag, setSelectedMainTag] = React.useState<MainTag>();

    const history = useHistory();

    const fetchTagOptions = (): Promise<void> => {
        return ajaxGet('main/tags')
            .then(res => {
                const newTags = serializeMainTagsFromAPI(res.data || []);
                setTags(newTags);
            })
            .catch(() => {
                // TODO: Handle errors / no tags
            });
    };

    const addRelatedTag = (selectedTag: RelatedTag): void => {
        setSelectedRelatedTags(selectedRelatedTags.concat([selectedTag]));
    };

    const removeRelatedTag = (selectedTag: RelatedTag): void => {
        setSelectedRelatedTags(selectedRelatedTags.filter(tag => tag.id !== selectedTag.id));
    };

    const onRelatedTagClick = (selectedTag: RelatedTag): void => {
        const index = selectedRelatedTags.map(tag => tag.id).indexOf(selectedTag.id);
        if (index === -1) {
            addRelatedTag(selectedTag);
        } else {
            removeRelatedTag(selectedTag);
        }
    };

    const onMainTagClick = (selectedTag: MainTag): void => {
        if (selectedMainTag) {
            setSelectedMainTag(undefined);
            setSelectedRelatedTags([]);
        } else {
            setSelectedMainTag(selectedTag);
        }
    };

    const launchSearch = (): void => {
        if (selectedMainTag) {
            const selectedTags = [selectedMainTag, ...selectedRelatedTags];
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
    barPercentage += selectedMainTag ? 40 : 0;
    barPercentage += selectedRelatedTags.length * 20;

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
                    {selectedMainTag && (
                        <div className="tags-selector__selected-primary-tag">
                            <span
                                className="tags-selector__selected-primary-tag-arrow"
                                onClick={(): void => onMainTagClick(selectedMainTag)}
                            >
                                <ArrowLeftIcon width={20} />
                            </span>
                            <Tag
                                content={selectedMainTag.name}
                                isSelected={false}
                                size={SIZES.LARGE}
                                clickable={false}
                            />
                        </div>
                    )}
                    <div className="tags-selector__tag-options">
                        {selectedMainTag
                            ? selectedMainTag.relatedTags.map((tag: RelatedTag) => (
                                <Tag
                                    key={tag.id}
                                    content={tag.name}
                                    isSelected={selectedRelatedTags
                                        .map(tag => tag.id)
                                        .includes(tag.id)}
                                    onClickCallback={(): void => onRelatedTagClick(tag)}
                                    size={SIZES.MEDIUM}
                                />
                            ))
                            : tags
                                .filter(tag => tag.primary)
                                .map(tag => {
                                    return (
                                        <Tag
                                            key={tag.id}
                                            content={tag.name}
                                            isSelected={false}
                                            onClickCallback={(): void => onMainTagClick(tag)}
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
