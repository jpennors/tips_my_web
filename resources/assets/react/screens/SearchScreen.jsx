import React, { Component } from 'react';
import { ResourceTile } from 'tmw/components/app/ResourceTile';
import { serializeResourcesFromAPI } from 'tmw/utils/api-serialize';
import { ajaxPost } from '../utils/Ajax';
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

    knownResource = resourceId => {
        this.setState(previousState => {
            let array = previousState.resources;
            const resource = array.filter(r => r.id === resourceId);
            array = array.filter(r => r.id !== resourceId);
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
                                    this.state.resources.map(resource => (
                                        <ResourceTile
                                            key={resource.id}
                                            resource={resource}
                                            knowResourceAction={() => this.knownResource(resource.id)}
                                        />),
                                    )
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
