import * as React from 'react';
import { Icon, Loader } from 'semantic-ui-react';
import { TagsLaunchBar } from 'tmw-main/components/TagsLaunchBar';
import { SIZES } from 'tmw-main/constants/ui-constants';
import { serializeTagsFromAPI } from 'tmw-common/utils/api-serialize';
import { PrimaryTag, SecondaryTag, TagsMap } from 'tmw-main/constants/app-types';
import { ajaxGet } from 'tmw-common/utils/Ajax';
import { Tag } from 'tmw-main/components/Tag';

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

    componentDidMount() {
        this.fetchTags();
    }

    render() {
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
                    <Loader />
                ) : (
                    <div className="tags-selector__container">
                        {primaryTag && (
                            <div className="tags-selector__selected-primary-tag">
                                <Icon
                                    name='arrow left'
                                    size="large"
                                    className="tags-selector__selected-primary-tag-arrow"
                                    onClick={() => this.selectPrimaryTag(primaryTag)}
                                />
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
                                        onClickCallback={() => this.selectSecondaryTag(tag)}
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
                                            onClickCallback={() => this.selectPrimaryTag(tag)}
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
