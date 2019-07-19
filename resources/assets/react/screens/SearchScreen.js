import React, { Component } from 'react';
import {ajaxGet, ajaxPost} from "../utils/Ajax";
import ErrorHandler from "../utils/Modal";
import { API_URL } from '../utils/config';

export default class SearchScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            selected_tags: [],
            liked_resources: [],
            active: true,
            resources : [],
            research: false,
            loading : true,
            error : false
        };

        this.selectTag = this.selectTag.bind(this)
        this.searchResources = this.searchResources.bind(this)
        this.likeResource = this.likeResource.bind(this)
        this.konwnResource = this.konwnResource.bind(this)
    }

    async componentDidMount() {
        await this.loadTags();
    }

    async loadTags() {
		try {
            const res = await ajaxGet('tags');
			this.setState({
                tags: res || [],
                loading : false
			});
		} catch (error) {
            this.setState({
                loading:false,
                error:true
            })
        }
	}


    async searchResources(){
        this.setState({loading:true});
        try {
            const res = await ajaxPost('resources/search', {'tags' : this.state.selected_tags});
			this.setState({
                resources: res || [],
                research : true,
                loading : false
			});
		} catch (error) {
            this.setState({loading:false})
			this.setState({error:true})
		}
    }

    selectTag(event) {

        const tag_id = event.target.getAttribute("data-tag");

        let index = this.state.selected_tags.indexOf(tag_id)
        if (index !== -1) {
            this.setState({selected_tags: this.state.selected_tags.filter((_, t) => t !== index)});
        } else {
            let array =  this.state.selected_tags
            array.push(tag_id)
            this.setState({selected_tags: array});
        }
    }

    async likeResource(event){
        // Add resource to liked_resources, send Like to API and save user preference in cookies

        // Add resource or retrieve to liked_resources
        const resource_id = event.target.getAttribute("data-tag");
        const index = this.state.liked_resources.indexOf(resource_id);
        if (index !== -1) {
            // Retrieve resource from liked_resources 
            this.setState({liked_resources: this.state.liked_resources.filter((_, r) => r !== index)})
            // API call
            ajaxGet("resources/like/remove/" + resource_id).then(res => {});
            // Retrieve from cookies

        } else {
            // Add resource in liked_resources
            let array = this.state.liked_resources;
            array.push(resource_id);
            this.setState({liked_resources: array});
            // API call
            ajaxGet("resources/like/add/" + resource_id).then(res => {});
            // Add in cookies

        }
    }

    konwnResource(event){
        // Retrieve resource from list and insert it at the end
        const resource_id = event.target.getAttribute("data-tag");
        let array = this.state.resources;
        let resource =  array.filter((r) => r.id == resource_id);
        array = array.filter((r) => r.id != resource_id);
        array.push(resource[0])
        this.setState({resources: array})
    }


    render() {

        const {error} = this.state
        return (
            <div>
                <ErrorHandler
                    open={error}
                />
                { this.state.research?
                    (
                        <div className="research_content">
                            <h1 className="left">Here are some website to improve your workflow
                                {/* <img src="/images/shuffle.svg" /> */}
                            </h1>

                            <ul id="research_results" key>
                                {
                                    this.state.resources.map((resource, index) => {
                                        return <div className="research_resource" key={index}>
                                            <div className="resource_header">
                                                <span className="dot red_dot"></span>
                                                <span className="dot yellow_dot"></span>
                                                <span className="dot green_dot"></span>
                                            </div>
                                            <a href={resource.url} target="_blank" >
                                                <img 
                                                    src={resource.image ? API_URL + "/resources/image/" + resource.id : '/images/default.jpg'} 
                                                    alt={resource.name} 
                                                    className="resource_img" 
                                                />
                                            </a>
                                            <div className="resource_content">
                                                <h4 className="resource_title">{resource.name}</h4>
                                                <p className="resource_description">{resource.description}</p>
                                                {/* <p className="research_results_btn">
                                                    <a>Already know</a>
                                                    <img src="images/heart.svg" width="15px"/>
                                                    <a>Try it !</a>
                                                </p> */}
                                                <p className="resource_btn">
                                                    <span 
                                                        className="knowing_resource cusror_pointer" 
                                                        data-tag = {resource.id}
                                                        onClick={this.konwnResource}
                                                    >
                                                        I know it
                                                    </span>
                                                    <img 
                                                        src={
                                                            (this.state.liked_resources.length > 0 && this.state.liked_resources.indexOf(String(resource.id)) !== -1)? 
                                                            "images/heart_full.svg" : "images/heart.svg"} 
                                                        height="15px;" 
                                                        className="cusror_pointer"
                                                        data-tag = {resource.id}
                                                        onClick={this.likeResource} 
                                                    />
                                                    <button className="visit_resource_btn">
                                                        <a href={resource.url} target="_blank" className="a_pointer_white">
                                                            Visit → 
                                                        </a>
                                                    </button>
                                                </p>
                                            </div>
                                            
                                        </div>
                                    })
                                }
                            </ul>
                        </div>

                    ) :
                    (
                        <div className="landing_content">
                            <h1>What are your centers of interest?</h1>
                            <p>Let’s find your most useful websites</p>


                                {
                                    this.state.loading ? (
                                        <div className="ui active inverted loader"></div>
                                    ) : (
                                        <div className="table">
                                            <div className="bar">
                                                <a title="Launch search"><img src="/images/Arrow.svg" alt="arrow" className="arrow" onClick={this.state.selected_tags.length ? this.searchResources : null} /></a>
                                            </div>
                                            <ul id="categories" key>
                                            {
                                                this.state.tags.map((tag, index) => {
                                                    return <li key={index} onClick={this.selectTag}>
                                                        <a data-tag={tag.id} className={`btnOne noselect ${(this.state.selected_tags.length >0
                                                                                    && this.state.selected_tags.indexOf(String(tag.id)) !== -1)? 'btnOneSelected' : 'a_pointer_white'}`}>
                                                            {tag.name}
                                                        </a>
                                                    </li>
                                                })
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
