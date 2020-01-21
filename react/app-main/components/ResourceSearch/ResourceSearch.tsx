import * as React from 'react';
import { ResourceTile } from 'tmw-main/components/ResourceTile';
import { TagsSelector } from 'tmw-main/components/TagsSelector';
import { Resource } from 'tmw-main/constants/app-types';
import { ajaxPost } from 'tmw-common/utils/Ajax';
import { serializeResourcesFromAPI } from 'tmw-common/utils/api-serialize';

import './resource-search.css';


interface ResourceSearchState {
    resources: Resource[];
    loadingResults: boolean;
}

export class ResourceSearch extends React.Component<
    {},
    ResourceSearchState
> {
    constructor() {
        super({});

        this.state = {
            resources: [],
            loadingResults: false,
        };
    }

    searchResources = (selectedTags: string[]): void => {
        this.setState({ loadingResults: true });
        ajaxPost('resources/search', { tags: selectedTags }).then(res => {
            this.setState({
                resources: serializeResourcesFromAPI(res.data || []),
                loadingResults: false,
            });
        }).catch(() => {
            this.setState({
                loadingResults: false,
                // TODO: Add back errors handling
            });
        });
    };

    knownResource = (resourceId: string): void => {
        this.setState(previousState => {
            let array = previousState.resources;
            const resource = array.filter(r => r.id === resourceId);
            array = array.filter(r => r.id !== resourceId);
            array.push(resource[0]);
            return { resources: array };
        });
    };

    render() {
        const { resources, loadingResults } = this.state;
        const hasResources = resources.length > 0;

        return (
            <div className="resource-search">
                {loadingResults ? (
                    <div className="ui active inverted loader" />
                ) : hasResources ? (
                    <div className="resource-search__results">
                        <p className="resource-search__results-title">Here are some websites to improve your workflow</p>
                        <div className="resource-search__results-list">
                            {this.state.resources.map(resource => (
                                <ResourceTile
                                    key={resource.id}
                                    resource={resource}
                                    knowResourceAction={() => this.knownResource(resource.id)}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="resource-search__landing">
                        <p className="resource-search__landing-title">What are your centers of interest?</p>
                        <p className="resource-search__landing-subtitle">Let’s find your most useful websites</p>
                        <TagsSelector onSearchStart={this.searchResources} />
                    </div>
                )}
            </div>
        );
    }
}
