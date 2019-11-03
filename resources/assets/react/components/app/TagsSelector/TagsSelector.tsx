import * as React from 'react';
import { Loader } from 'semantic-ui-react';
import { serializeTagsFromAPI } from '../../..//utils/api-serialize';
import { TagsMap } from '../../../constants/app-types';
import { ajaxGet } from '../../../utils/Ajax';

import { Tag } from '../Tag';

import './tags-selector.css';

interface TagsSelectorProps {
    onSearchStart: () => void;
}

interface TagsSelectorState {
    tagsMap: TagsMap;
    selectedTags: string[];
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
            selectedTags: [],
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

    addTag = (selectedTagId: string): void => {
        this.setState(previousState => ({
            selectedTags: previousState.selectedTags.concat([selectedTagId]),
        }));
    };

    removeTag = (selectedTagId: string): void => {
        this.setState(previousState => ({
            selectedTags: previousState.selectedTags.filter(
                tagId => tagId !== selectedTagId,
            ),
        }));
    };

    selectTag = (selectedTagId: string): void => {
        const index = this.state.selectedTags.indexOf(selectedTagId);
        if (index === -1) {
            this.addTag(selectedTagId);
        } else {
            this.removeTag(selectedTagId);
        }
    };

    componentDidMount() {
        this.loadTags();
    }

    render() {
        const { tagsMap, selectedTags, requestLoading } = this.state;

        return (
            <div className="tags-selector">
                {requestLoading ? (
                    <Loader />
                ) : (
                    <>
                        {Object.keys(tagsMap).map((tagId: string) => {
                            const tag = tagsMap[tagId];
                            return (
                                <Tag
                                    key={tag.id}
                                    content={tag.name}
                                    isSelected={selectedTags.includes(tag.id)}
                                    onClickCallback={() => this.selectTag(tag.id)}
                                />
                            );
                        })}
                    </>
                )}
            </div>
        );
    }
}
