import * as React from 'react';
import { LoadingSpinner } from 'tmw-main/components/LoadingSpinner';
import { TagsLaunchBar } from 'tmw-main/components/TagsLaunchBar';
import { SIZES } from 'tmw-main/constants/ui-constants';
import { serializeTagsFromAPI } from 'tmw-main/utils/api-serialize';
import { PrimaryTag, SecondaryTag, TagsMap } from 'tmw-main/constants/app-types';
import { ajaxGet } from 'tmw-common/utils/ajax';
import { Tag } from 'tmw-main/components/Tag';
import { ArrowIcon } from 'tmw-main/icons/ArrowIcon';

import './tags-selector.css';

interface TagsSelectorProps {
    onSearchStart: (selectedTagIds: string[]) => void;
}

interface TagsSelectorState {
    tagsMap: TagsMap;
    primaryTag: PrimaryTag | null;
    secondaryTags: SecondaryTag[];
    requestLoading: boolean;
}

export class TagsSelector extends React.Component<
    TagsSelectorProps,
    TagsSelectorState
> {
    constructor(props: TagsSelectorProps) {
        super(props);

        this.state = {
            tagsMap: {},
            primaryTag: null,
            secondaryTags: [],
            requestLoading: true,
        };
    }

    fetchTags = (): void => {
        ajaxGet('tags')
            .then(res => {
                this.setState({
                    tagsMap: serializeTagsFromAPI(res.data || []),
                    requestLoading: false,
                });
            })
            .catch(() => {
                this.setState({
                    requestLoading: false,
                });
            });
    };

    addSecondaryTag = (selectedTag: SecondaryTag): void => {
        this.setState(previousState => ({
            secondaryTags: previousState.secondaryTags.concat([selectedTag]),
        }));
    };

    removeSecondaryTag = (selectedTag: SecondaryTag): void => {
        this.setState(previousState => ({
            secondaryTags: previousState.secondaryTags.filter(
                tag => tag.id !== selectedTag.id,
            ),
        }));
    };

    selectSecondaryTag = (selectedTag: SecondaryTag): void => {
        const index = this.state.secondaryTags
            .map(tag => tag.id)
            .indexOf(selectedTag.id);
        if (index === -1) {
            this.addSecondaryTag(selectedTag);
        } else {
            this.removeSecondaryTag(selectedTag);
        }
    };

    selectPrimaryTag = (selectedTag: PrimaryTag): void => {
        this.setState(previousState => ({
            primaryTag: previousState.primaryTag ? null : selectedTag,
            secondaryTags: previousState.primaryTag ? [] : previousState.secondaryTags,
        }));
    };

    launchSearch = (): void => {
        const { onSearchStart } = this.props;
        const { primaryTag, secondaryTags } = this.state;

        if (primaryTag) {
            const selectedTags = [primaryTag, ...secondaryTags];
            const selectedTagIds = selectedTags.map(tag => tag.id);
            onSearchStart(selectedTagIds);
        }
    };

    componentDidMount(): void {
        this.fetchTags();
    }

    render(): React.ReactNode {
        const { tagsMap, primaryTag, secondaryTags, requestLoading } = this.state;

        let barPercentage = 0;
        barPercentage += primaryTag ? 40 : 0;
        barPercentage += secondaryTags.length * 20;

        return (
            <div className="tags-selector">
                <TagsLaunchBar
                    onClickCallback={this.launchSearch}
                    completionPercentage={barPercentage}
                />
                {requestLoading ? (
                    <div className="tags-selector__loading-spinner">
                        <LoadingSpinner /><br/>
                        Loading Tags
                    </div>
                ) : (
                    <div className="tags-selector__container">
                        {primaryTag && (
                            <div className="tags-selector__selected-primary-tag">
                                <span
                                    className="tags-selector__selected-primary-tag-arrow"
                                    onClick={(): void => this.selectPrimaryTag(primaryTag)}
                                >
                                    <ArrowIcon
                                        width={20}
                                    />
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
                                        onClickCallback={(): void => this.selectSecondaryTag(tag)}
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
                                            onClickCallback={(): void => this.selectPrimaryTag(tag)}
                                            size={SIZES.MEDIUM}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
