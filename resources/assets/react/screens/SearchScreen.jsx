import React, { Component } from 'react';
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

    searchResources = () => {
        this.setState({ loading: true });
        ajaxPost('resources/search', { tags: this.state.selected_tags }).then(res => {
            this.setState({
                resources: res.data || [],
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
                                    this.state.resources.map(resource => (
                                        <div className="research_resource" key={resource.id}>
                                            {/* Header of the resource with red, yellow and green circle */}
                                            <div className="resource_header">
                                                <span className="dot red_dot" />
                                                <span className="dot yellow_dot" />
                                                <span className="dot green_dot" />
                                            </div>
                                            {/* Resource image */}
                                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={resource.image ? `/resources/image/${resource.id}` : '/images/default.jpg'}
                                                    alt={resource.name}
                                                    className="resource_img"
                                                />
                                            </a>
                                            {/* Resource content */}
                                            <div className="resource_content">
                                                {/* Title */}
                                                <h4 className="resource_title">{resource.name}</h4>
                                                {/* Description */}
                                                <p className="resource_description">{resource.description}</p>
                                                {/* Button I know it, like and visit */}
                                                <p className="resource_btn">
                                                    <span
                                                        className="knowing_resource cursor_pointer"
                                                        data-tag={resource.id}
                                                        onClick={this.knownResource}
                                                    >
                                                        I know it
                                                    </span>
                                                    <img
                                                        src={
                                                            (this.state.liked_resources.length > 0 && this.state.liked_resources.indexOf(String(resource.id)) !== -1)
                                                            ? 'images/heart_full.svg' : 'images/heart.svg'
                                                        }
                                                        alt="Heart Icon"
                                                        height="15px"
                                                        className="cursor_pointer"
                                                        data-tag={resource.id}
                                                        onClick={this.likeResource}
                                                    />
                                                    <button className="visit_resource_btn" type="button">
                                                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="a_pointer_white">
                                                            Visit →
                                                        </a>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    ))
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
                                    <div className="table">
                                        {/* Search bar */}
                                        <div className="bar">
                                            <a title="Launch search"><img src="/images/Arrow.svg" alt="arrow" className="arrow" onClick={this.state.selected_tags.length ? this.searchResources : null} /></a>
                                        </div>
                                        <TagsSelector onSearchStart={this.searchResources}/>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}
