import React, { Component } from 'react';
import { ajaxGet, ajaxPost } from '../utils/Ajax';
import ErrorHandler from '../utils/Modal';

export default class SearchScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            selectedTags: [],
            likedResources: [],
            active: true,
            resources: [],
            research: false,
            loading: true,
            error: false
        };
    }

    componentDidMount() {
        this.loadTags();
    }

    loadTags = () => {
        ajaxGet('tags').then(res => {
            this.setState({
                tags: res.data || [],
                loading: false
            });
        }).catch(() => {
            this.setState({
                loading: false,
                error: true
            });
        });
    };

    searchResources = () => {
        this.setState({ loading: true });
        ajaxPost('resources/search', { tags: this.state.selectedTags }).then(res => {
            this.setState({
                resources: res.data || [],
                research: true,
                loading: false
            });
        }).catch(() => {
            this.setState({
                loading: false,
                research: true
            });
        });
    };

    selectTag = event => {
        const tagId = event.target.getAttribute('data-tag');

        const index = this.state.selectedTags.indexOf(tagId);
        if (index !== -1) {
            this.setState(previousState => ({ selectedTags: previousState.selectedTags.filter((_, t) => t !== index) }));
        } else {
            this.setState(previousState => ({ selectedTags: previousState.selectedTags.push(tagId) }));
        }
    };

    likeResource = async event => {
        // Add resource to likedResources, send Like to API and save user preference in cookies

        // Add resource or retrieve to likedResources
        const resourceId = event.target.getAttribute('data-tag');
        const index = this.state.likedResources.indexOf(resourceId);
        if (index !== -1) {
            // Retrieve resource from likedResources
            this.setState(previousState => ({ likedResources: previousState.likedResources.filter((_, r) => r !== index) }));
            // API call
            ajaxGet(`resources/like/remove/${resourceId}`);
            // Retrieve from cookies
        } else {
            // Add resource in likedResources
            this.setState(previousState => ({ likedResources: previousState.likedResources.push(resourceId) }));
            // API call
            ajaxGet(`resources/like/add/${resourceId}`);
            // Add in cookies
        }
    };

    knownResource = event => {
        // Retrieve resource from list and insert it at the end
        const resourceId = event.target.getAttribute('data-tag');
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
                        // Research resutlts part

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
                                                            (this.state.likedResources.length > 0 && this.state.likedResources.indexOf(String(resource.id)) !== -1)
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

                    )
                    : (
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
                                                <a title="Launch search"><img src="/images/Arrow.svg" alt="arrow" className="arrow" onClick={this.state.selectedTags.length ? this.searchResources : null} /></a>
                                            </div>
                                            <ul id="categories" key>
                                                {/* Display every tags available */}
                                                {
                                                this.state.tags.map(tag => (
                                                    <li key={tag.id} onClick={this.selectTag}>
                                                        <a
                                                            data-tag={tag.id}
                                                            className={`btnOne noselect ${(this.state.selectedTags.length > 0
                                                                                    && this.state.selectedTags.indexOf(String(tag.id)) !== -1) ? 'btnOneSelected' : 'a_pointer_white'}`}
                                                        >
                                                            {tag.name}
                                                        </a>
                                                    </li>
))
                                            }
                                            </ul>
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
