import * as React from 'react';

import { ResourceTile } from 'tmw/components/app/ResourceTile';
import { TagsSelector } from 'tmw/components/app/TagsSelector';
import { Resource } from 'tmw/constants/app-types';
import { ajaxPost } from 'tmw/utils/Ajax';
import { serializeResourcesFromAPI } from 'tmw/utils/api-serialize';

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
            <div>
                {loadingResults ? (
                    <div className="ui active inverted loader" />
                ) : hasResources ? (
                    <div className="research_content">
                        <h1 className="left">Here are some websites to improve your workflow</h1>
                        <div id="research_results">
                            {this.state.resources.map(resource => (
                                <ResourceTile
                                    key={resource.id}
                                    resource={resource}
                                    knowResourceAction={() => this.knownResource(resource.id)}
                                />),
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="landing_content">
                        <h1>What are your centers of interest?</h1>
                        <p>Let’s find your most useful websites</p>
                        <TagsSelector onSearchStart={this.searchResources} />
                    </div>
                )}
            </div>
        );
    }
}
