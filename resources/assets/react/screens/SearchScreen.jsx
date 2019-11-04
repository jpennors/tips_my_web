import React, { Component } from 'react';
import { ResourceTile } from 'tmw/components/app/ResourceTile';
import { serializeResourcesFromAPI } from 'tmw/utils/api-serialize';
import { ajaxGet, ajaxPost } from '../utils/Ajax';
import ErrorHandler from '../utils/Modal';
import { TagsSelector } from '../components/app/TagsSelector';

export default class SearchScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            selected_tags: [],
            liked_resources: [],
            active: true,
            resources: [],
            research: false,
            loading: false,
            error: false,
        };
    }

    searchResources = selectedTags => {
        this.setState({ loading: true });
        ajaxPost('resources/search', { tags: selectedTags }).then(res => {
            this.setState({
                resources: serializeResourcesFromAPI(res.data || []),
                research: true,
                loading: false,
            });
        }).catch(() => {
            this.setState({
                loading: false,
                research: true,
            });
        });
    };

    likeResource = async event => {
        // Add resource to liked_resources, send Like to API and save user preference in cookies

        // Add resource or retrieve to liked_resources
        const resource_id = event.target.getAttribute('data-tag');
        const index = this.state.liked_resources.indexOf(resource_id);
        if (index !== -1) {
            // Retrieve resource from liked_resources
            this.setState(previousState => ({ liked_resources: previousState.liked_resources.filter((_, r) => r !== index) }));
            // API call
            ajaxGet(`resources/like/remove/${resource_id}`);
            // Retrieve from cookies
        } else {
            // Add resource in liked_resources
            this.setState(previousState => ({ liked_resources: previousState.liked_resources.concat([resource_id]) }));
            // API call
            ajaxGet(`resources/like/add/${resource_id}`);
            // Add in cookies
        }
    };

    knownResource = event => {
        // Retrieve resource from list and insert it at the end
        const resource_id = event.target.getAttribute('data-tag');
        this.setState(previousState => {
            let array = previousState.resources;
            const resource = array.filter(r => r.id === resource_id);
            array = array.filter(r => r.id !== resource_id);
            array.push(resource[0]);
            return { resources: array };
        });
    };


    render() {
        const { error } = this.state;
        return (
            <div>
                <ErrorHandler
                    open={error}
                />
                {
                    this.state.research
                    ? (
                        // Research results part
                        <div className="research_content">
                            <h1 className="left">
                                Here are some website to improve your workflow
                                {/* <img src="/images/shuffle.svg" /> */}
                            </h1>

                            <ul id="research_results" key>
                                {/* Display every resources for the research */}
                                {
                                    Object.keys(this.state.resources).map(resourceId => {
                                        const resource = this.state.resources[resourceId];
                                        return (
                                            <ResourceTile key={resource.id} resource={resource} />
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    ) : (
                        // Research part
                        <div className="landing_content">
                            <h1>What are your centers of interest?</h1>
                            <p>Let’s find your most useful websites</p>
                            {
                                this.state.loading ? (
                                    <div className="ui active inverted loader" />
                                ) : (
                                    <TagsSelector onSearchStart={this.searchResources}/>
                                )
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}
