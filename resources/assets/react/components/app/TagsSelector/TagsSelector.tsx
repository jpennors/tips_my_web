import * as React from 'react';
import { Icon, Loader } from 'semantic-ui-react';
import { TagsLaunchBar } from 'tmw/components/app/TagsLaunchBar';
import { SIZES } from 'tmw/constants/ui-constants';
import { serializeTagsFromAPI } from 'tmw/utils/api-serialize';
import { PrimaryTag, SecondaryTag, TagsMap } from 'tmw/constants/app-types';
import { ajaxGet } from 'tmw/utils/Ajax';
import { Tag } from 'tmw/components/app/Tag';

import './tags-selector.css';

interface TagsSelectorProps {
    onSearchStart: () => void;
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

    loadTags = (): void => {
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

    componentDidMount() {
        this.loadTags();
    }

    render() {
        const { tagsMap, primaryTag, secondaryTags, requestLoading } = this.state;

        return (
            <div className="tags-selector">
                <TagsLaunchBar onClickCallback={() => {}}/>
                {requestLoading ? (
                    <Loader />
                ) : (
                    <div className="tags-selector__container">
                        {primaryTag && (
                            <div className="tags-selector__selected-primary-tag">
                                <Icon name='arrow left' size="large" onClick={() => this.selectPrimaryTag(primaryTag)} />
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
